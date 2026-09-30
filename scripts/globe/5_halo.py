import json, os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from chemins import D, OUT

prev = json.load(open(OUT + "globe-trame.json", encoding="utf-8"))
W, H = prev["width"], prev["height"]
gx, gy = prev["degrade"]["cx"], prev["degrade"]["cy"]
bg = np.load(D + "bg.npy").astype(np.float32)
CREAM = np.array([244, 243, 238], np.float32) / 255
OLIVE = prev["colors"]["trame"]
hexc = lambda c: "#%02X%02X%02X" % tuple(int(round(v)) for v in np.clip(np.asarray(c) * 255, 0, 255))

# ── 1. Fine radial profile around the gradient centre ───────────
ys, xs = np.mgrid[0:H:2, 0:W:2]
rad = np.hypot(xs - gx, ys - gy)
step = 8
bins = (rad / step).astype(int); nb = bins.max() + 1
b = bg[::2, ::2]
prof = np.stack([np.bincount(bins.ravel(), b[..., c].ravel(), nb) for c in range(3)], 1)
cnt = np.bincount(bins.ravel(), minlength=nb)
ok = cnt > 20
rr = (np.arange(nb) + 0.5)[ok] * step
prof = prof[ok] / cnt[ok, None]

# cyan peak = most saturated cyan (lowest red) in the outer half
outer = rr > rr.max() * 0.4
k_peak = np.where(outer)[0][np.argmax(np.minimum(prof[outer, 1], prof[outer, 2]) - prof[outer, 0])]
r_peak, C = rr[k_peak], prof[k_peak].copy()
# beyond the peak: observed = a*C + (1-a)*cream  -> a(r)
vC = C - CREAM
a_out = np.clip(((prof[k_peak:] - CREAM) * vC).sum(1) / (vC * vC).sum(), 0, 1)
k_end = k_peak + int(np.argmax(a_out < 0.004)) if (a_out < 0.004).any() else len(rr) - 1
R_end = rr[k_end]
print("cyan peak %s at r=%.0f, fade ends at r=%.0f" % (hexc(C), r_peak, R_end))

def dp(xv, yv, tol):
    keep = {0, len(xv) - 1}; st = [(0, len(xv) - 1)]
    while st:
        s, e = st.pop()
        if e <= s + 1: continue
        t = (xv[s + 1:e] - xv[s]) / (xv[e] - xv[s])
        err = np.abs(yv[s + 1:e] - (yv[s] + t[:, None] * (yv[e] - yv[s]))).max(1)
        k = int(np.argmax(err))
        if err[k] > tol:
            m = s + 1 + k; keep.add(m); st += [(s, m), (m, e)]
    return sorted(keep)

r_in = np.r_[0.0, rr[:k_peak + 1]]; c_in = np.r_[prof[:1], prof[:k_peak + 1]]
inner = [(r_in[k] / R_end, c_in[k], 1.0) for k in dp(r_in, c_in, 2.0 / 255)]
r_o = rr[k_peak:k_end + 1]; a_o = a_out[:k_end - k_peak + 1]
a_o[-1] = 0.0
outer_stops = [(r_o[k] / R_end, C, float(a_o[k])) for k in dp(r_o, a_o[:, None], 0.008)][1:]
stops = inner + outer_stops
print("%d stops (%d opaque, %d fading)" % (len(stops), len(inner), len(outer_stops)))

def render_base(xg, yg):
    d = np.hypot(xg - gx, yg - gy) / R_end
    offs = np.array([s[0] for s in stops]); cols = np.array([s[1] for s in stops]); alps = np.array([s[2] for s in stops])
    col = np.stack([np.interp(d, offs, cols[:, c]) for c in range(3)], -1)
    al = np.interp(d, offs, alps, right=0.0)[..., None]
    return al * col + (1 - al) * CREAM

# ── 2. Paint touches: greedy gaussian blobs on the residual ──────
S = 6
yl, xl = np.mgrid[0:H:S, 0:W:S].astype(np.float32)
target = ndi.gaussian_filter(bg[::S, ::S], (2, 2, 0))
cur = render_base(xl, yl)
def rms(a, b): return float(np.sqrt(((a - b) ** 2).mean()) * 255)
print("background rms before touches: %.2f /255" % rms(cur, target))
blobs = []
blocked = np.zeros(xl.shape, bool)
vC_ = C - CREAM
sigmas = [28, 40, 60, 90, 130, 190, 280, 400]
for it in range(400):
    res = target - cur
    mag = np.linalg.norm(ndi.gaussian_filter(res, (4, 4, 0)), axis=2)
    mag[blocked] = 0
    py, px = np.unravel_index(np.argmax(mag), mag.shape)
    x0, y0 = xl[py, px], yl[py, px]
    best = None
    for sg in sigmas:
        g = np.exp(-((xl - x0) ** 2 + (yl - y0) ** 2) / (2 * sg * sg))[..., None]
        wsum = (g[..., 0] ** 2).sum()
        # colour painted = local target colour (gaussian-weighted)
        c = (target * g).sum((0, 1)) / g.sum()
        # paint colours only: a light cyan/cream mix is repainted as pure cyan with lower opacity
        k_c = float(((c - CREAM) * vC_).sum() / (vC_ * vC_).sum())
        mix_err = np.abs(c - (CREAM + k_c * vC_)).max()
        if k_c < 0.97 and mix_err < 0.06:
            if k_c < 0.08:
                continue
            c_paint, a_scale = C.copy(), k_c
        elif np.linalg.norm(c - CREAM) < 0.3:
            continue
        else:
            c_paint, a_scale = c, 1.0
        for a0 in (0.15, 0.3, 0.45, 0.65, 0.85, 1.0):
            a = a0 * a_scale
            new = cur + a * g * (c_paint - cur)
            e = ((new - target) ** 2).sum()
            if best is None or e < best[0]:
                best = (e, sg, a, c_paint, new)
    if best is None:
        blocked |= (xl - x0) ** 2 + (yl - y0) ** 2 < 90 ** 2
        continue
    e, sg, a, c, new = best
    gain = rms(cur, target) - rms(new, target)
    if gain < 0.004:
        blocked |= (xl - x0) ** 2 + (yl - y0) ** 2 < 90 ** 2
        if blocked.mean() > 0.6:
            break
        continue
    cur = new
    blobs.append((float(x0), float(y0), float(sg), c, float(a)))
print("paint touches: %d  background rms after: %.2f /255" % (len(blobs), rms(cur, target)))

# ── 3. SVG ──────────────────────────────────────────────────────
f1 = lambda v: ("%.1f" % v).rstrip("0").rstrip(".")
f4 = lambda v: ("%.4f" % v).rstrip("0").rstrip(".") or "0"
def stop_xml(o, c, a):
    return '<stop offset="%s" stop-color="%s"%s/>' % (f4(o), hexc(c), "" if a >= 0.999 else ' stop-opacity="%s"' % f4(a))
grad = "\n      ".join(stop_xml(*s) for s in stops)
blob_defs, blob_shapes = [], []
for n, (x0, y0, sg, c, a) in enumerate(blobs, 1):
    ts = np.linspace(0, 1, 6)
    st = "".join('<stop offset="%s" stop-color="%s" stop-opacity="%s"/>' % (f4(t), hexc(c), f4(a * np.exp(-(t * 3) ** 2 / 2) if t < 1 else 0)) for t in ts)
    blob_defs.append('<radialGradient id="touche-%d">%s</radialGradient>' % (n, st))
    blob_shapes.append('<circle cx="%s" cy="%s" r="%s" fill="url(#touche-%d)"/>' % (f1(x0), f1(y0), f1(3 * sg), n))
circles = "\n    ".join('<circle cx="%s" cy="%s" r="%s"/>' % (f1(x), f1(y), f1(r)) for x, y, r, i, j in prev["trame"]["points"])
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
  <title>GeoMTL 2027 — globe en trame</title>
  <defs>
    <radialGradient id="globe-degrade" gradientUnits="userSpaceOnUse" cx="{f1(gx)}" cy="{f1(gy)}" r="{f1(R_end)}">
      {grad}
    </radialGradient>
    {chr(10).join("    " + d for d in blob_defs).lstrip()}
  </defs>
  <rect id="fond" width="{W}" height="{H}" fill="{hexc(CREAM)}"/>
  <circle id="globe" cx="{f1(gx)}" cy="{f1(gy)}" r="{f1(R_end)}" fill="url(#globe-degrade)"/>
  <g id="halo-peinture">
    {chr(10).join("    " + s for s in blob_shapes).lstrip()}
  </g>
  <g id="trame" fill="{OLIVE}">
    {circles}
  </g>
</svg>
'''
open(OUT + "globe-trame.svg", "w", encoding="utf-8").write(svg)

prev["degrade"] = {"cx": round(gx, 1), "cy": round(gy, 1), "r": round(float(R_end), 1),
                   "note": "stops = [position 0-1, couleur, opacité] ; au-delà du pic cyan, la couleur reste fixe et seule l'opacité baisse, pour s'effacer sur n'importe quel fond",
                   "stops": [[round(float(o), 4), hexc(c), round(float(a), 4)] for o, c, a in stops]}
prev["halo_peinture"] = {"note": "touches gaussiennes peintes par-dessus le dégradé : couleur avec opacité max au centre, écart-type sigma (le cercle SVG a r = 3*sigma)",
                         "champs": ["cx", "cy", "sigma", "couleur", "opacite"],
                         "touches": [[round(x0, 1), round(y0, 1), round(sg, 1), hexc(c), round(a, 2)] for x0, y0, sg, c, a in blobs]}
open(OUT + "globe-trame.json", "w", encoding="utf-8").write(json.dumps(prev, ensure_ascii=False, separators=(",", ":")))
print("svg %.0f KB, json %.0f KB" % (os.path.getsize(OUT + "globe-trame.svg") / 1024, os.path.getsize(OUT + "globe-trame.json") / 1024))
