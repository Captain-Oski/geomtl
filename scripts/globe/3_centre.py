import numpy as np
from scipy.optimize import least_squares
from chemins import D

dots = np.load(D + "dots.npy")
bg = np.load(D + "bg.npy").astype(np.float32)
H, W, _ = bg.shape
CREAM = np.array([244, 243, 238], np.float32) / 255

def fit_circle(pts):
    x, y = pts[:, 0], pts[:, 1]
    A = np.c_[2 * x, 2 * y, np.ones(len(x))]
    c, *_ = np.linalg.lstsq(A, x * x + y * y, rcond=None)
    return c[0], c[1], np.sqrt(c[2] + c[0] ** 2 + c[1] ** 2)

# 1) Envelope of the dots (outermost dot per angle) -> dotted "atmosphere" circle
cx, cy = 2480.0, 2410.0
for _ in range(5):
    ang = np.degrees(np.arctan2(dots[:, 1] - cy, dots[:, 0] - cx))
    dist = np.hypot(dots[:, 0] - cx, dots[:, 1] - cy)
    env = []
    for a0 in np.arange(-180, 0, 2.0):
        m = (ang >= a0) & (ang < a0 + 2) & (dots[:, 2] > 1.5)
        if m.sum():
            k = np.argmax(np.where(m, dist, -1))
            env.append(dots[k, :2])
    env = np.array(env)
    # keep envelope points that are not on the image border
    env = env[(env[:, 0] > 5) & (env[:, 0] < W - 5) & (env[:, 1] < H - 5)]
    cx, cy, R_dots = fit_circle(env)
dev = np.hypot(env[:, 0] - cx, env[:, 1] - cy) - R_dots
print("dot envelope circle: centre (%.1f, %.1f) R %.1f  (n=%d, |dev| median %.1f, p90 %.1f)" % (cx, cy, R_dots, len(env), np.median(np.abs(dev)), np.percentile(np.abs(dev), 90)))

# 2) Colour limb: where the background leaves the cream
yy, xx = np.mgrid[0:H:3, 0:W:3]
b = bg[::3, ::3]
far = np.linalg.norm(b - CREAM, axis=2)
edge = []
for level in (0.05, 0.15, 0.3):
    ang = np.arctan2(yy - cy, xx - cx)
    rad = np.hypot(xx - cx, yy - cy)
    pts = []
    for a0 in np.radians(np.arange(-178, -2, 2.0)):
        m = (np.abs(ang - a0) < np.radians(0.7)) & (far > level)
        if m.sum() > 3:
            k = np.argmax(np.where(m, rad, -1))
            pts.append((xx.flat[k] if False else xx[m][np.argmax(rad[m])], yy[m][np.argmax(rad[m])]))
    pts = np.array(pts, float)
    pts = pts[(pts[:, 0] > 5) & (pts[:, 0] < W - 5) & (pts[:, 1] > 5) & (pts[:, 1] < H - 5)]
    ex, ey, er = fit_circle(pts)
    print("colour limb at |bg-cream|>%.2f : centre (%.1f, %.1f) R %.1f  n=%d" % (level, ex, ey, er, len(pts)))
    edge.append((ex, ey, er))

# 3) Best concentric centre for the colour field: minimise across-angle variance of radial profile
sub = bg[::6, ::6]
ys, xs = np.mgrid[0:H:6, 0:W:6]
inside = np.linalg.norm(sub - CREAM, axis=2) > 0.02
def cost(c):
    rad = np.hypot(xs - c[0], ys - c[1])
    bins = (rad / 40).astype(int)
    res = []
    for ch in range(3):
        v = sub[..., ch]
        s = np.bincount(bins[inside], v[inside])
        n = np.bincount(bins[inside])
        mean = s / np.maximum(n, 1)
        res.append((v[inside] - mean[bins[inside]]))
    return np.concatenate(res)
sol = least_squares(cost, x0=[cx, cy], diff_step=1e-3)
fx, fy = sol.x
rms = np.sqrt(np.mean(sol.fun ** 2)) * 255
print("best radial centre for colours: (%.1f, %.1f)  residual rms %.1f /255" % (fx, fy, rms))
print("rms at dot-envelope centre: %.1f /255" % (np.sqrt(np.mean(cost([cx, cy]) ** 2)) * 255))
np.save(D + "globe.npy", np.array([cx, cy, R_dots, fx, fy]))
