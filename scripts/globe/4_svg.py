import json
import numpy as np
from chemins import D, OUT

alpha = np.load(D + "alpha.npy").astype(np.float32)
bg = np.load(D + "bg.npy").astype(np.float32)
p, ox, oy, *_ = np.load(D + "lattice.npy")
_, _, _, gx, gy = np.load(D + "globe.npy")
H, W = alpha.shape
CREAM = "#F4F3EE"
OLIVE = "#6A8C3A"

# ── Dots: coverage mass per lattice site ─────────────────────────
th = np.radians(45.0)
Rm = np.array([[np.cos(th), np.sin(th)], [-np.sin(th), np.cos(th)]])
yy, xx = np.nonzero(alpha > 0.01)
a = alpha[yy, xx]
q = np.c_[xx, yy] @ Rm.T / p - [ox, oy]
ij = np.round(q).astype(np.int64)
imin, jmin = ij.min(0)
key = (ij[:, 0] - imin) * 100000 + (ij[:, 1] - jmin)
uk, inv = np.unique(key, return_inverse=True)
mass = np.bincount(inv, a)
si = uk // 100000 + imin
sj = uk % 100000 + jmin
centres = (np.c_[si, sj] + [ox, oy]) @ Rm * p
r = np.sqrt(mass / np.pi)

# Dots cut by the image border: solve visible area(r) = mass
def visible_area(cx, cy, rad, n=24):
    g = (np.arange(n) + 0.5) / n * 2 - 1
    gx_, gy_ = np.meshgrid(g, g)
    inside = (gx_ ** 2 + gy_ ** 2) <= 1
    X = cx[:, None, None] + gx_ * rad[:, None, None]
    Y = cy[:, None, None] + gy_ * rad[:, None, None]
    vis = inside & (X >= 0) & (X < W) & (Y >= 0) & (Y < H)
    return vis.sum((1, 2)) / inside.sum() * np.pi * rad ** 2

cut = (centres[:, 0] - r < 0) | (centres[:, 0] + r > W) | (centres[:, 1] - r < 0) | (centres[:, 1] + r > H) \
      | (centres[:, 0] < 0) | (centres[:, 0] > W) | (centres[:, 1] < 0) | (centres[:, 1] > H)
lo = r[cut].copy(); hi = np.full(cut.sum(), 13.0)
for _ in range(30):
    mid = (lo + hi) / 2
    too_small = visible_area(centres[cut, 0], centres[cut, 1], mid) < mass[cut]
    lo = np.where(too_small, mid, lo); hi = np.where(too_small, hi, mid)
r[cut] = np.minimum((lo + hi) / 2, 13.0)

keep = (mass >= 2.0) & (r >= 0.8)
dots = np.c_[centres, r, si, sj][keep]
order = np.lexsort((dots[:, 0], dots[:, 1]))
dots = dots[order]
print("dots", len(dots), "cut by border", int((cut & keep).sum()), "r range", np.round([dots[:, 2].min(), dots[:, 2].max()], 2))

# ── Gradient: radial profile around (gx, gy), simplified to few stops ─
ys, xs = np.mgrid[0:H:2, 0:W:2]
rad = np.hypot(xs - gx, ys - gy)
b = bg[::2, ::2]
step = 10
bins = (rad / step).astype(int)
nb = bins.max() + 1
prof = np.stack([np.bincount(bins.ravel(), b[..., c].ravel(), nb) for c in range(3)], 1)
cnt = np.bincount(bins.ravel(), minlength=nb)
valid = cnt > 20
rr = (np.arange(nb) + 0.5) * step
rr, prof = rr[valid], prof[valid] / cnt[valid, None]
cream = np.array([244, 243, 238]) / 255
R_end = rr[np.argmax(np.linalg.norm(prof - cream, axis=1) < 3 / 255 * np.sqrt(3))] if (np.linalg.norm(prof - cream, axis=1) < 3 / 255 * np.sqrt(3)).any() else rr[-1]
sel = rr <= R_end
rr, prof = rr[sel], prof[sel]
rr = np.r_[0.0, rr, R_end]; prof = np.r_[prof[:1], prof, cream[None]]

def simplify(xv, yv, tol):  # Douglas-Peucker on (r, rgb) with tolerance in rgb units
    keep_idx = [0, len(xv) - 1]
    stack = [(0, len(xv) - 1)]
    while stack:
        s, e = stack.pop()
        if e <= s + 1:
            continue
        t = (xv[s + 1:e] - xv[s]) / (xv[e] - xv[s])
        interp = yv[s] + t[:, None] * (yv[e] - yv[s])
        err = np.abs(yv[s + 1:e] - interp).max(1)
        k = np.argmax(err)
        if err[k] > tol:
            m = s + 1 + k
            keep_idx.append(m); stack += [(s, m), (m, e)]
    return sorted(set(keep_idx))
idx = simplify(rr, prof, 2.5 / 255)
stops = [(rr[k] / R_end, prof[k]) for k in idx]
hexc = lambda c: "#%02X%02X%02X" % tuple(int(round(v)) for v in np.clip(c * 255, 0, 255))
print("gradient centre (%.1f, %.1f) radius %.1f, %d stops" % (gx, gy, R_end, len(stops)))
for o, c in stops:
    print("  %.4f %s" % (o, hexc(c)))

# ── SVG ─────────────────────────────────────────────────────────
f1 = lambda v: ("%.1f" % v).rstrip("0").rstrip(".")
stop_xml = "\n      ".join('<stop offset="%s" stop-color="%s"/>' % (("%.4f" % o).rstrip("0").rstrip(".") or "0", hexc(c)) for o, c in stops)
circles = "\n    ".join('<circle cx="%s" cy="%s" r="%s"/>' % (f1(x), f1(y), f1(rad_)) for x, y, rad_, _, _ in dots)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
  <title>GeoMTL 2027 — globe en trame</title>
  <defs>
    <radialGradient id="globe-degrade" gradientUnits="userSpaceOnUse" cx="{f1(gx)}" cy="{f1(gy)}" r="{f1(R_end)}">
      {stop_xml}
    </radialGradient>
  </defs>
  <rect id="fond" width="{W}" height="{H}" fill="{CREAM}"/>
  <circle id="globe" cx="{f1(gx)}" cy="{f1(gy)}" r="{f1(R_end)}" fill="url(#globe-degrade)"/>
  <g id="trame" fill="{OLIVE}">
    {circles}
  </g>
</svg>
'''
open(OUT + "globe-trame.svg", "w", encoding="utf-8").write(svg)

data = {
    "source": "globe-trame (Studio Le Séisme), vectorisé depuis l'image 3600x2202",
    "width": W, "height": H,
    "colors": {"fond": CREAM, "trame": OLIVE},
    "degrade": {"cx": round(float(gx), 1), "cy": round(float(gy), 1), "r": round(float(R_end), 1),
                "stops": [[round(float(o), 4), hexc(c)] for o, c in stops]},
    "trame": {"angle": 45, "pas": round(float(p), 4), "decalage": [round(float(ox), 4), round(float(oy), 4)],
              "note": "x,y = pas * rot45(i + decalage[0], j + decalage[1])",
              "champs": ["x", "y", "r", "i", "j"],
              "points": [[round(float(x), 1), round(float(y), 1), round(float(rad_), 2), int(i), int(j)] for x, y, rad_, i, j in dots]},
}
open(OUT + "globe-trame.json", "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, separators=(",", ":")))
import os
print("svg %.0f KB, json %.0f KB" % (os.path.getsize(OUT + "globe-trame.svg") / 1024, os.path.getsize(OUT + "globe-trame.json") / 1024))
