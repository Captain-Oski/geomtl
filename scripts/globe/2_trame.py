import numpy as np
from scipy import ndimage as ndi
from chemins import D

dots = np.load(D + "dots.npy")
alpha = np.load(D + "alpha.npy").astype(np.float32)
bg = np.load(D + "bg.npy").astype(np.float32)
H, W = alpha.shape

# ── Lattice fit: 45° screen, pitch p, offset (ox, oy) ─────────────
th = np.radians(45.0)
R = np.array([[np.cos(th), np.sin(th)], [-np.sin(th), np.cos(th)]])  # world -> lattice axes
strong = dots[dots[:, 2] > 3]
p = 23.28
for _ in range(4):
    q = strong[:, :2] @ R.T / p
    frac = q - np.round(q)
    off = np.angle(np.exp(2j * np.pi * frac).mean(0)) / (2 * np.pi)  # circular mean per axis
    ij = np.round(q - off)
    # least squares: world = p * R^T (ij + off)  -> solve for p, angle-free (keep 45°) and offset
    A = np.c_[ij @ R, np.ones(len(ij)), np.zeros(len(ij))]  # placeholder not used
    pred_dir = (ij + off) @ R  # lattice -> world directions (unit pitch)
    p = float((pred_dir * strong[:, :2]).sum() / (pred_dir * pred_dir).sum())
q = dots[:, :2] @ R.T / p
ij = np.round(q - off)
pred = (ij + off) @ R * p
res = np.linalg.norm(dots[:, :2] - pred, axis=1)
print("pitch %.4f  offset %s" % (p, np.round(off, 4)))
print("residual px: median %.2f  p95 %.2f" % (np.median(res), np.percentile(res, 95)))
off_lat = res > 4.0
print("off-lattice dots", int(off_lat.sum()), "on-lattice", int((~off_lat).sum()))

# ── Circle fit on off-lattice dots (atmosphere ring) ─────────────
ring = dots[off_lat]
def fit_circle(pts):
    x, y = pts[:, 0], pts[:, 1]
    A = np.c_[2 * x, 2 * y, np.ones(len(x))]
    b = x * x + y * y
    c, *_ = np.linalg.lstsq(A, b, rcond=None)
    cx, cy = c[0], c[1]
    return cx, cy, np.sqrt(c[2] + cx * cx + cy * cy)
cx, cy, rr = fit_circle(ring)
for _ in range(3):
    d = np.abs(np.hypot(ring[:, 0] - cx, ring[:, 1] - cy) - rr)
    inl = d < 40
    cx, cy, rr = fit_circle(ring[inl])
d = np.hypot(ring[:, 0] - cx, ring[:, 1] - cy) - rr
print("ring circle centre (%.1f, %.1f) radius %.1f ; inliers %d/%d ; |dev| median %.1f max %.1f"
      % (cx, cy, rr, (np.abs(d) < 40).sum(), len(ring), np.median(np.abs(d[np.abs(d) < 40])), np.abs(d[np.abs(d) < 40]).max()))
print("ring dot radius min/median/max", np.round([ring[:, 2].min(), np.median(ring[:, 2]), ring[:, 2].max()], 2))
far = ring[np.abs(d) >= 40]
print("off-lattice NOT on ring:", len(far), np.round(far[:10], 1).tolist())

# ── Radial colour profile of the background around that centre ───
yy, xx = np.mgrid[0:H:4, 0:W:4]
rad = np.hypot(xx - cx, yy - cy)
angd = np.degrees(np.arctan2(yy - cy, xx - cx))
b = bg[::4, ::4]
print("\nradial profile (distance from centre -> mean rgb, std across angle sectors)")
for r0 in range(0, int(rr) + 400, 100):
    m = (rad >= r0) & (rad < r0 + 100)
    if m.sum() < 50:
        continue
    secs = []
    for a0 in range(-180, 0, 20):
        s = m & (angd >= a0) & (angd < a0 + 20)
        if s.sum() > 30:
            secs.append(b[s].mean(0))
    secs = np.array(secs)
    print(" r %4d-%4d  rgb %s  sector-std %s  sectors %d" % (r0, r0 + 100, np.round(b[m].mean(0) * 255), np.round(secs.std(0) * 255, 1), len(secs)))
np.save(D + "lattice.npy", np.array([p, off[0], off[1], cx, cy, rr]))
np.save(D + "offlat.npy", off_lat)
