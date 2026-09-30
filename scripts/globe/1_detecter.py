import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from scipy.spatial import cKDTree
from chemins import D, SOURCE as SRC

img = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32) / 255.0
H, W, _ = img.shape
OLIVE = np.array([106, 140, 58], np.float32) / 255.0

# 1. Background colour field: normalized convolution over pixels far from olive.
dist_olive = np.linalg.norm(img - OLIVE, axis=2)
core = dist_olive < 0.16
near_dot = ndi.binary_dilation(core, iterations=4)
w = (~near_dot).astype(np.float32)
sig = 10
den = ndi.gaussian_filter(w, sig)
bg = np.stack([ndi.gaussian_filter(img[..., c] * w, sig) for c in range(3)], -1) / np.maximum(den, 1e-4)[..., None]
# fill any hole where no background was visible nearby
hole = den < 0.02
if hole.any():
    sig2 = 30
    den2 = ndi.gaussian_filter(w, sig2)
    bg2 = np.stack([ndi.gaussian_filter(img[..., c] * w, sig2) for c in range(3)], -1) / np.maximum(den2, 1e-4)[..., None]
    bg[hole] = bg2[hole]
print("bg holes", int(hole.sum()))

# 2. Per-pixel coverage: pixel = a*olive + (1-a)*bg
v = OLIVE - bg
alpha = np.clip(((img - bg) * v).sum(2) / np.maximum((v * v).sum(2), 1e-4), 0, 1)
alpha[(v * v).sum(2) < 0.01] = 0  # background too close to olive to tell apart

# 3. Are dots opaque olive everywhere? core colours by background hue
for name, sel in {
    "on cream": (bg.sum(2) > 2.7),
    "on cyan": (bg[..., 2] > 0.85) & (bg[..., 0] < 0.4),
    "on teal/green": (bg[..., 1] > 0.7) & (bg[..., 2] > 0.3) & (bg[..., 2] < 0.75) & (bg[..., 0] < 0.3),
    "on lime": (bg[..., 0] > 0.6) & (bg[..., 2] < 0.2),
}.items():
    s = sel & (alpha > 0.9)
    print("%-14s n=%7d core rgb %s" % (name, s.sum(), np.round(np.median(img[s], 0) * 255) if s.any() else "-"))

# 4. Dot centres: local maxima of smoothed coverage
sm = ndi.gaussian_filter(alpha, 2.5)
pk = (sm == ndi.maximum_filter(sm, size=13)) & (sm > 0.04)
ys, xs = np.nonzero(pk)
pts = np.c_[xs, ys].astype(np.float64)
print("dot candidates", len(pts))

# 5. Voronoi mass: assign covered pixels to the nearest centre (within 18 px)
py, px = np.nonzero(alpha > 0.02)
a = alpha[py, px]
tree = cKDTree(pts)
dd, idx = tree.query(np.c_[px, py], k=1, distance_upper_bound=18)
ok = np.isfinite(dd)
idx, a, px_, py_ = idx[ok], a[ok], px[ok], py[ok]
mass = np.bincount(idx, a, len(pts))
cx = np.bincount(idx, a * px_, len(pts)) / np.maximum(mass, 1e-6)
cy = np.bincount(idx, a * py_, len(pts)) / np.maximum(mass, 1e-6)
r = np.sqrt(mass / np.pi)
keep = mass >= 3.0
dots = np.c_[cx, cy, r][keep]
print("dots kept", len(dots), "radius px min/median/max", np.round([dots[:, 2].min(), np.median(dots[:, 2]), dots[:, 2].max()], 2))

# 6. Lattice orientation from nearest-neighbour vectors
t = cKDTree(dots[:, :2])
d, j = t.query(dots[:, :2], k=5)
vec = dots[j[:, 1:], :2] - dots[:, None, :2]
L = np.linalg.norm(vec, axis=2)
m = (L > 16) & (L < 28)
ang = (np.degrees(np.arctan2(vec[..., 1], vec[..., 0]))[m]) % 90
hist, e = np.histogram(ang, bins=18, range=(0, 90))
print("lattice angle mod 90 (5 deg bins):", dict(zip(e[:-1].astype(int), hist)))
print("pitch median", np.round(np.median(L[m]), 2))

np.save(D + "alpha.npy", alpha.astype(np.float16))
np.save(D + "bg.npy", bg.astype(np.float16))
np.save(D + "dots.npy", dots)
