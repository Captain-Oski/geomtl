'use client';

import { useEffect, useRef } from 'react';

// Globe animé du hero. Fonctionnement, réglages et régénération des données :
// voir docs/globe-anime.md.

type Stop = [number, string, number];
type Touch = [number, number, number, string, number];
type Point = [number, number, number, number, number];
type Vec3 = [number, number, number];
type RGB = [number, number, number];

interface GlobeData {
  width: number;
  height: number;
  colors: { trame: string };
  degrade: { cx: number; cy: number; r: number; stops: Stop[] };
  halo_peinture: { touches: Touch[] };
  trame: { pas: number; decalage: [number, number]; points: Point[] };
}

type IdeaKey = 'rotation' | 'pulsations' | 'reseau' | 'couleurs';
interface Idea {
  turnS: number;
  patchGain: number;
  colorDots: boolean;
  rings: boolean;
  network: boolean;
  hot: { max: number; rMin: number; rMax: number; dMin: number; dMax: number; gap: [number, number] };
}
interface Patch { p: Vec3; rho: number; color: string; alpha: number; brand: boolean }
interface Hotspot { start: number; dur: number; c: Vec3; cosR: number; inner: RGB; outer: RGB; innerHex: string; rings: boolean; env: number }
interface Link { a: Vec3; b: Vec3; start: number; travel: number; life: number; colA: string; colB: string }
interface Satellite { a0: number; rho: number; r: number; w: number }
interface Drop { ux: number; uy: number; from: number; to: number; age: number; life: number; glyph: string; flip: number; size: number; alpha: number }

// ── Réglages ─────────────────────────────────────────────────────
const VITESSE_TERRE = 2.5;       // multiplicateur de rotation de la Terre (« rapide »)
const VITESSE_SATELLITES = 0.5;  // multiplicateur des orbites (« lente »)
const DUREE_IDEE_S = 10;         // durée de chaque idée dans l'enchaînement
// Valeurs copiées depuis le panneau « Couleurs » de la page de démonstration.
const COULEURS = { pointsTeinte: 85, pointsLuminosite: 0, globeTeinte: 0, globeSaturation: 100 };

const ORDER: IdeaKey[] = ['rotation', 'pulsations', 'reseau', 'couleurs'];
const IDEAS: Record<IdeaKey, Idea> = {
  rotation:   { turnS: 110, patchGain: 1,   colorDots: false, rings: false, network: false, hot: { max: 3, rMin: 4,   rMax: 9,   dMin: 4.5, dMax: 7.5, gap: [1.2, 3.7] } },
  pulsations: { turnS: 140, patchGain: 1,   colorDots: false, rings: true,  network: false, hot: { max: 2, rMin: 2.5, rMax: 4,   dMin: 5.5, dMax: 7.5, gap: [1.0, 2.5] } },
  reseau:     { turnS: 120, patchGain: 1,   colorDots: false, rings: false, network: true,  hot: { max: 5, rMin: 2.5, rMax: 4.5, dMin: 5,   dMax: 8,   gap: [0.7, 1.6] } },
  couleurs:   { turnS: 90,  patchGain: 1.8, colorDots: true,  rings: false, network: false, hot: { max: 2, rMin: 4,   rMax: 7,   dMin: 5,   dMax: 7,   gap: [2.0, 4.0] } },
};

const DATA_URL = '/images/brand/globe-trame.json';
const DENSITY_URL = '/images/brand/terre-densite.png';
const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const R_SPHERE = 1720;        // rayon du globe dans le repère du visuel (3600 x 2202)
const ATMO_MIN = 1760;        // au-delà : points de la bordure, qui deviennent les satellites
const VIEW_LAT = 32 * DEG;    // on voit l'hémisphère nord de biais
const LON_START = -62 * DEG;  // départ centré sur l'Atlantique nord
const R_DOT = 11.5;           // rayon maximal d'un point de trame
const INTRO_S = 1.5;
const STILL_T = 20;           // instant affiché quand les animations sont réduites
const FRAME_MS = 1000 / 30;
const RING_MAX = 26 * DEG;
const RING_W = 2.9 * DEG;
const WARM: [string, string][] = [['#F0304A', '#FF8A3D'], ['#FF4F9A', '#FFA14A'], ['#E8264F', '#FF77B8'], ['#FF5A36', '#FFC04D']];
const PATCH_COLORS = ['#20FEFD', '#01CDA5', '#1BC868', '#D0DC00'];
const DOT_TONES = ['#6A8C3A', '#00836A', '#0E6F80', '#4F7A1E'];

const hexRgb = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};
const rgba = (hex: string, a: number) => {
  const [r, g, b] = hexRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
};
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, u: number) => Math.round(a + (b - a) * u);
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const ease = (cur: number, target: number, dt: number, rate: number) => cur + (target - cur) * Math.min(1, dt * rate);
const dot3 = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function viewBasis(lon: number) {
  const cl = Math.cos(lon), sl = Math.sin(lon), cp = Math.cos(VIEW_LAT), sp = Math.sin(VIEW_LAT);
  return {
    e: [-sl, cl, 0] as Vec3,
    n: [-sp * cl, -sp * sl, cp] as Vec3,
    f: [cp * cl, cp * sl, sp] as Vec3,
  };
}

function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexRgb(hex).map((v) => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}
function hslToRgb(h: number, s: number, l: number): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
const toHex = (rgb: RGB) => '#' + rgb.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('').toUpperCase();

// Globe en trame qui tourne comme la Terre, en quatre idées enchaînées :
// rotation avec événements, pulsations, système nerveux (arcs entre événements)
// et couleurs vivantes. Satellites en orbite et fine pluie de 0 et 1 en continu.
// Cadré comme `object-fit: cover; object-position: right top`.
export default function GlobeTrame({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    // Fond peint en quart de résolution (il est flou) : la partie fixe est dessinée
    // une seule fois dans `still`, seules les taches qui tournent sont redessinées.
    const halo = document.createElement('canvas');
    const hctx = halo.getContext('2d');
    const still = document.createElement('canvas');
    const sctx = still.getContext('2d');
    if (!canvas || !ctx || !hctx || !sctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let data: GlobeData | null = null;
    let cx = 0, cy = 0;
    let map = new Uint8Array(0), MW = 1, MH = 1;
    let CX = new Float32Array(0), CY = new Float32Array(0);
    let VX = new Float32Array(0), VY = new Float32Array(0), VZ = new Float32Array(0);
    let staticTouches: Touch[] = [];
    let patches: Patch[] = [];
    let sats: Satellite[] = [];
    let rain: Drop[] = [];
    let hots: Hotspot[] = [];
    let links: Link[] = [];
    let recent: Hotspot[] = [];
    let nextSpawn = 1.5;

    // Couleurs (points et globe diffus), calculées une fois au chargement
    let DOT: RGB = [106, 140, 58], DOT_HEX = '#6A8C3A', TONES: RGB[] = DOT_TONES.map(hexRgb);
    const gcache = new Map<string, string>();
    const globeColor = (hex: string) => {
      let v = gcache.get(hex);
      if (!v) {
        const [h, s, l] = hexToHsl(hex);
        v = toHex(hslToRgb((h + COULEURS.globeTeinte + 720) % 360, clamp01((s * COULEURS.globeSaturation) / 100), l));
        gcache.set(hex, v);
      }
      return v;
    };

    let idea: Idea = IDEAS.rotation, phaseIdx = -1;
    let colorW = 0, patchGain = 1, omega = TAU / IDEAS.rotation.turnS;
    let lon = LON_START, t = 0, satT = 0;
    let dpr = 1, scale = 1, offX = 0;
    let raf = 0, running = false, visible = true, cancelled = false;
    let lastNow = 0, lastDraw = 0, pending = 0;

    const sample = (lat: number, lo: number) => {
      const u = (lo / TAU + 0.5) * MW - 0.5, v = (0.5 - lat / Math.PI) * MH - 0.5;
      const i0 = Math.floor(u), j0 = Math.floor(v), fu = u - i0, fv = v - j0;
      const ia = ((i0 % MW) + MW) % MW, ib = (ia + 1) % MW;
      const ja = Math.max(0, Math.min(MH - 1, j0)), jb = Math.max(0, Math.min(MH - 1, j0 + 1));
      const top = map[ja * MW + ia] * (1 - fu) + map[ja * MW + ib] * fu;
      const bot = map[jb * MW + ia] * (1 - fu) + map[jb * MW + ib] * fu;
      return (top * (1 - fv) + bot * fv) / 255;
    };

    const blob = (g: CanvasRenderingContext2D, x: number, y: number, R: number, color: string, op: number) => {
      const tg = g.createRadialGradient(x, y, 0, x, y, R);
      for (const q of [0, 0.2, 0.4, 0.6, 0.8]) tg.addColorStop(q, rgba(color, op * Math.exp(-((3 * q) ** 2) / 2)));
      tg.addColorStop(1, rgba(color, 0));
      g.fillStyle = tg;
      g.beginPath();
      g.arc(x, y, R, 0, TAU);
      g.fill();
    };

    const drawStill = () => {
      if (!data) return;
      const G = data.degrade;
      const hs = still.width / Math.max(1, canvas.clientWidth);
      sctx.setTransform(1, 0, 0, 1, 0, 0);
      sctx.clearRect(0, 0, still.width, still.height);
      sctx.setTransform(scale * hs, 0, 0, scale * hs, offX * hs, 0);
      const grad = sctx.createRadialGradient(G.cx, G.cy, 0, G.cx, G.cy, G.r);
      for (const [o, c, a] of G.stops) grad.addColorStop(Math.min(1, o), rgba(globeColor(c), a));
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, data.width, data.height);
      for (const [x, y, s, c, a] of staticTouches) blob(sctx, x, y, 3 * s, globeColor(c), a);
    };

    const resize = () => {
      if (!data) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      halo.width = still.width = Math.max(1, Math.round(canvas.width / 4));
      halo.height = still.height = Math.max(1, Math.round(canvas.height / 4));
      scale = Math.max(w / data.width, h / data.height);
      offX = w - data.width * scale;
      drawStill();
    };

    const spawn = (f: Vec3, e: Vec3, n: Vec3) => {
      const hc = idea.hot;
      if (hots.length >= hc.max) return;
      for (let tries = 0; tries < 80; tries++) {
        const z = Math.random() * 2 - 1, a = Math.random() * TAU, s = Math.sqrt(1 - z * z);
        const c: Vec3 = [s * Math.cos(a), s * Math.sin(a), z];
        if (sample(Math.asin(z), a > Math.PI ? a - TAU : a) < 0.5) continue;   // au cœur des terres
        if (dot3(f, c) < 0.45 || -dot3(n, c) > -0.15 || dot3(e, c) > 0.45) continue;  // bien visible
        const [inner, outer] = WARM[Math.floor(Math.random() * WARM.length)];
        const hot: Hotspot = {
          start: t, dur: rand(hc.dMin, hc.dMax), c, cosR: Math.cos(rand(hc.rMin, hc.rMax) * DEG),
          inner: hexRgb(inner), outer: hexRgb(outer), innerHex: inner, rings: idea.rings, env: 0,
        };
        hots.push(hot);
        if (idea.network) {
          const from = recent.filter((r) => { const d = dot3(r.c, c); return d < 0.995 && d > 0.55; });
          if (from.length) {
            const src = from[Math.floor(Math.random() * from.length)];
            links.push({ a: src.c, b: c, start: t, travel: 1.4, life: 4.5, colA: src.innerHex, colB: inner });
          }
        }
        recent.push(hot);
        if (recent.length > 8) recent.shift();
        return;
      }
    };

    // Pluie de données : de fins « 0 » et « 1 » qui descendent vers la Terre ou montent vers l'orbite
    const spawnRain = (dt: number, x0: number, x1: number, y1: number) => {
      const expected = 11 * dt;
      let count = Math.floor(expected) + (Math.random() < expected % 1 ? 1 : 0);
      while (count-- > 0) {
        for (let tries = 0; tries < 6; tries++) {
          const s = sats[Math.floor(Math.random() * sats.length)];
          const a = s.a0 + s.w * satT;
          const sx = cx + s.rho * Math.cos(a), sy = cy + s.rho * Math.sin(a);
          if (sx < x0 || sx > x1 || sy > y1 || sy < 0) continue;
          const down = Math.random() < 0.5;
          rain.push({
            ux: Math.cos(a), uy: Math.sin(a),
            from: down ? s.rho - 10 : R_SPHERE * rand(0.97, 1.01),
            to: down ? R_SPHERE * rand(0.95, 1.0) : s.rho + rand(20, 90),
            age: 0, life: rand(2.2, 4), glyph: Math.random() < 0.5 ? '0' : '1', flip: rand(0.3, 0.9),
            size: rand(26, 34), alpha: rand(0.22, 0.38),
          });
          break;
        }
      }
    };

    const draw = (dt: number) => {
      if (!data) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const intro = reduceMotion ? 1 : smoothstep(0, INTRO_S, t);
      const { e, n, f } = viewBasis(lon);

      // ── Fond : partie fixe + taches peintes collées à la sphère
      const hs = halo.width / Math.max(1, w);
      hctx.setTransform(1, 0, 0, 1, 0, 0);
      hctx.clearRect(0, 0, halo.width, halo.height);
      hctx.globalAlpha = intro;
      hctx.drawImage(still, 0, 0);
      hctx.globalAlpha = 1;
      hctx.setTransform(scale * hs, 0, 0, scale * hs, offX * hs, 0);
      for (const pt of patches) {
        const vz = dot3(f, pt.p);
        if (vz < -0.1) continue;
        const X = cx + R_SPHERE * dot3(e, pt.p), Y = cy - R_SPHERE * dot3(n, pt.p);
        const Rt = R_SPHERE * Math.sin(3 * pt.rho);
        const op = Math.min(0.9, pt.alpha * (pt.brand ? patchGain : 1)) * intro * smoothstep(-0.1, 0.35, vz);
        hctx.save();
        hctx.translate(X, Y);
        hctx.rotate(Math.atan2(Y - cy, X - cx));
        hctx.scale(Math.max(0.15, vz), 1);
        blob(hctx, 0, 0, Rt, globeColor(pt.color), op);
        hctx.restore();
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(halo, 0, 0, canvas.width, canvas.height);

      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, offX * dpr, 0);
      const x0 = -offX / scale - 30, x1 = (w - offX) / scale + 30, y1 = h / scale + 30;

      // ── Satellites en orbite
      ctx.fillStyle = DOT_HEX;
      ctx.globalAlpha = intro;
      ctx.beginPath();
      for (const s of sats) {
        const a = s.a0 + s.w * satT, x = cx + s.rho * Math.cos(a), y = cy + s.rho * Math.sin(a);
        if (x < x0 || x > x1 || y > y1 || y < -30) continue;
        ctx.moveTo(x + s.r, y);
        ctx.arc(x, y, s.r, 0, TAU);
      }
      ctx.fill();
      ctx.globalAlpha = 1;

      // ── Événements : apparition, maintien, extinction
      if (!reduceMotion) {
        hots = hots.filter((hsp) => t - hsp.start <= hsp.dur);
        for (const hsp of hots) {
          const age = t - hsp.start;
          hsp.env = smoothstep(0, 1, age) * (1 - smoothstep(hsp.dur - 1.5, hsp.dur, age));
        }
        if (t > nextSpawn) {
          spawn(f, e, n);
          nextSpawn = t + rand(idea.hot.gap[0], idea.hot.gap[1]);
        }
      }
      const cosRingMax = Math.cos(RING_MAX);

      // ── Terre : chaque cellule de la trame lit la carte à l'endroit du globe qui passe dessous
      const paths: Path2D[] = [];
      for (let b = 0; b < 12; b++) paths.push(new Path2D());
      const hotDots: [number, number, number, string][] = [];
      for (let i = 0; i < CX.length; i++) {
        const x = CX[i], y = CY[i];
        if (x < x0 || x > x1 || y > y1) continue;
        const vx = VX[i], vy = VY[i], vz = VZ[i];
        const wx = vx * e[0] - vy * n[0] + vz * f[0];
        const wy = vx * e[1] - vy * n[1] + vz * f[1];
        const wz = vx * e[2] - vy * n[2] + vz * f[2];
        const limb = smoothstep(0, 0.22, vz) * intro;
        const r = R_DOT * Math.sqrt(sample(Math.asin(Math.max(-1, Math.min(1, wz))), Math.atan2(wy, wx))) * limb;

        let best = 0, kk = 0, ring = 0;
        let bh: Hotspot | null = null, rh: Hotspot | null = null;
        for (const hsp of hots) {
          const c = wx * hsp.c[0] + wy * hsp.c[1] + wz * hsp.c[2];
          if (c > hsp.cosR) {
            const k = (c - hsp.cosR) / (1 - hsp.cosR), v = hsp.env * (0.55 + 0.45 * k);
            if (v > best) { best = v; bh = hsp; kk = k; }
          }
          if (hsp.rings && c > cosRingMax) {
            const ang = Math.acos(Math.min(1, c)), age = t - hsp.start;
            for (let q = 0; q < 4; q++) {
              const ra = age * 9 * DEG - q * 12 * DEG;   // une onde toutes les 1,33 s, à 9°/s
              if (ra <= 0 || ra > RING_MAX) continue;
              const v = Math.exp(-(((ang - ra) / RING_W) ** 2)) * (1 - ra / RING_MAX) * hsp.env;
              if (v > ring) { ring = v; rh = hsp; }
            }
          }
        }
        if (bh && best > 0.03) {
          const u = Math.min(1, best * 1.2);
          const hc: RGB = [mix(bh.outer[0], bh.inner[0], kk), mix(bh.outer[1], bh.inner[1], kk), mix(bh.outer[2], bh.inner[2], kk)];
          hotDots.push([x, y, Math.max(r * (1 + 0.3 * best), (3 + 6 * kk) * best * limb), `rgb(${mix(DOT[0], hc[0], u)},${mix(DOT[1], hc[1], u)},${mix(DOT[2], hc[2], u)})`]);
          continue;
        }
        if (rh && ring > 0.06) {
          const u = Math.min(1, ring * 1.8);
          hotDots.push([x, y, Math.max(r, 7 * ring * limb), `rgb(${mix(DOT[0], rh.outer[0], u)},${mix(DOT[1], rh.outer[1], u)},${mix(DOT[2], rh.outer[2], u)})`]);
          continue;
        }
        if (r < 0.6) continue;
        // Régions qui s'estompent et reviennent (motif fixé sur la sphère), et teintes vivantes
        const breath = 0.5 + 0.25 * (Math.sin(4.3 * wx + 2.1 * wz + t * 0.37) + Math.sin(3.1 * wy - 3.7 * wz - t * 0.29));
        const g = 0.5 + 0.25 * (Math.sin(2.7 * wx - 1.9 * wz + t * 0.21) + Math.sin(3.3 * wy + 2.2 * wx - t * 0.17));
        const idx = Math.min(3, Math.floor(g * 4)) * 3 + Math.min(2, Math.floor(breath * 3));
        paths[idx].moveTo(x + r, y);
        paths[idx].arc(x, y, r, 0, TAU);
      }
      for (let b = 0; b < 12; b++) {
        const tone = TONES[Math.floor(b / 3)];
        ctx.fillStyle = `rgba(${mix(DOT[0], tone[0], colorW)},${mix(DOT[1], tone[1], colorW)},${mix(DOT[2], tone[2], colorW)},${0.6 + 0.4 * (((b % 3) + 0.5) / 3)})`;
        ctx.fill(paths[b]);
      }
      for (const [x, y, r, col] of hotDots) {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fill();
      }

      // ── Système nerveux : arcs lumineux entre événements
      links = links.filter((l) => t - l.start < l.travel + l.life);
      for (const l of links) {
        const age = t - l.start, prog = Math.min(1, age / l.travel);
        const fade = 1 - smoothstep(l.travel + l.life - 1.5, l.travel + l.life, age);
        const om = Math.acos(Math.min(1, dot3(l.a, l.b))), so = Math.sin(om);
        if (so < 1e-4) continue;
        const hmax = Math.min(0.22, 0.06 + om * 0.2), N = 60, cA = hexRgb(l.colA), cB = hexRgb(l.colB);
        for (let s = 0; s <= N; s++) {
          const u = s / N;
          if (u > prog) break;
          const ka = Math.sin((1 - u) * om) / so, kb = Math.sin(u * om) / so, lift = 1 + hmax * Math.sin(Math.PI * u);
          const P: Vec3 = [(ka * l.a[0] + kb * l.b[0]) * lift, (ka * l.a[1] + kb * l.b[1]) * lift, (ka * l.a[2] + kb * l.b[2]) * lift];
          const X = cx + R_SPHERE * dot3(e, P), Y = cy - R_SPHERE * dot3(n, P);
          if (dot3(f, P) < 0 && (X - cx) ** 2 + (Y - cy) ** 2 < R_SPHERE * R_SPHERE) continue;
          const head = prog < 1 && s === Math.floor(prog * N);
          ctx.fillStyle = `rgba(${mix(cA[0], cB[0], u)},${mix(cA[1], cB[1], u)},${mix(cA[2], cB[2], u)},${fade * (head ? 1 : 0.85)})`;
          ctx.beginPath();
          ctx.arc(X, Y, head ? 11 : 4.6, 0, TAU);
          ctx.fill();
        }
      }

      // ── Pluie de données
      if (dt > 0) spawnRain(dt, x0, x1, y1);
      if (rain.length) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = DOT_HEX;
        rain = rain.filter((p) => (p.age += dt) < p.life);
        for (const p of rain) {
          const u = p.age / p.life;
          p.flip -= dt;
          if (p.flip < 0) { p.glyph = p.glyph === '0' ? '1' : '0'; p.flip = rand(0.3, 0.9); }
          const rr = p.from + (p.to - p.from) * u;
          ctx.globalAlpha = p.alpha * smoothstep(0, 0.2, u) * (1 - smoothstep(0.75, 1, u));
          ctx.font = `500 ${p.size.toFixed(0)}px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace`;
          ctx.fillText(p.glyph, cx + rr * p.ux, cy + rr * p.uy);
        }
        ctx.globalAlpha = 1;
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = lastNow ? Math.min(0.1, (now - lastNow) / 1000) : 0;
      lastNow = now;
      t += dt;
      satT += dt * VITESSE_SATELLITES;
      const idx = Math.floor(t / DUREE_IDEE_S) % ORDER.length;
      if (idx !== phaseIdx) {
        phaseIdx = idx;
        idea = IDEAS[ORDER[idx]];
        nextSpawn = Math.min(nextSpawn, t + 0.4);
      }
      // Transitions douces entre les idées
      colorW = ease(colorW, idea.colorDots ? 1 : 0, dt, 0.8);
      patchGain = ease(patchGain, idea.patchGain, dt, 0.8);
      omega = ease(omega, TAU / idea.turnS, dt, 0.8);
      lon -= omega * VITESSE_TERRE * dt;
      pending += dt;
      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;
      draw(pending);
      pending = 0;
    };
    const play = () => {
      if (running || reduceMotion || !data || !visible) return;
      running = true;
      lastNow = 0;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const showStill = () => {
      t = STILL_T;
      lon = LON_START - (TAU / IDEAS.rotation.turnS) * VITESSE_TERRE * STILL_T;
      draw(0);
    };

    const loadDensity = async () => {
      const img = new Image();
      img.src = DENSITY_URL;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      const cc = c.getContext('2d', { willReadFrequently: true });
      if (!cc) throw new Error('canvas');
      cc.drawImage(img, 0, 0);
      const px = cc.getImageData(0, 0, c.width, c.height).data;
      const m = new Uint8Array(c.width * c.height);
      for (let k = 0; k < m.length; k++) m[k] = px[k * 4];
      return { m, w: c.width, h: c.height };
    };

    Promise.all([fetch(DATA_URL).then((r) => r.json() as Promise<GlobeData>), loadDensity()])
      .then(([d, dens]) => {
        if (cancelled) return;
        data = d;
        map = dens.m;
        MW = dens.w;
        MH = dens.h;
        cx = d.degrade.cx;
        cy = d.degrade.cy;

        // Couleur des points : teinte et luminosité réglées, saturation de l'olive de la charte
        const oliveHsl = hexToHsl(d.colors.trame);
        const dotColor = (hex: string): RGB => {
          const [h, s, l] = hexToHsl(hex);
          return hslToRgb((h + COULEURS.pointsTeinte - oliveHsl[0] + 720) % 360, s, clamp01(l + COULEURS.pointsLuminosite / 100));
        };
        DOT = dotColor(d.colors.trame);
        DOT_HEX = toHex(DOT);
        TONES = DOT_TONES.map(dotColor);

        // Cellules de la trame du visuel (45°, même pas, même décalage) sur le disque du globe
        const p = d.trame.pas, [ox, oy] = d.trame.decalage, k45 = Math.SQRT1_2, s2 = p * Math.SQRT2;
        const bx0 = Math.max(-p, cx - R_SPHERE), bx1 = Math.min(d.width + p, cx + R_SPHERE);
        const by0 = Math.max(-p, cy - R_SPHERE), by1 = Math.min(d.height + p, cy + R_SPHERE);
        const xs: number[] = [], ys: number[] = [], vxs: number[] = [], vys: number[] = [], vzs: number[] = [];
        for (let i = Math.floor((bx0 + by0) / s2 - ox); i <= Math.ceil((bx1 + by1) / s2 - ox); i++) {
          for (let j = Math.floor((by0 - bx1) / s2 - oy); j <= Math.ceil((by1 - bx0) / s2 - oy); j++) {
            const x = p * k45 * (i + ox - (j + oy)), y = p * k45 * (i + ox + (j + oy));
            if (x < bx0 || x > bx1 || y < by0 || y > by1) continue;
            const vx = (x - cx) / R_SPHERE, vy = (y - cy) / R_SPHERE, q = 1 - vx * vx - vy * vy;
            if (q <= 0) continue;
            xs.push(x); ys.push(y); vxs.push(vx); vys.push(vy); vzs.push(Math.sqrt(q));
          }
        }
        CX = Float32Array.from(xs); CY = Float32Array.from(ys);
        VX = Float32Array.from(vxs); VY = Float32Array.from(vys); VZ = Float32Array.from(vzs);

        // Satellites : les points de la bordure, complétés sur tout le tour et regroupés en
        // constellations (secteurs de 5°) qui tournent chacune à sa vitesse aléatoire.
        const groupSpeed = new Map<number, number>();
        sats = [];
        for (const [x, y, r] of d.trame.points) {
          const rho = Math.hypot(x - cx, y - cy);
          if (rho <= ATMO_MIN) continue;
          const a = Math.atan2(y - cy, x - cx);
          for (const shift of [0, Math.PI]) {
            const grp = Math.floor(((((a + shift) / DEG) % 360) + 720) % 360 / 5);
            if (!groupSpeed.has(grp)) groupSpeed.set(grp, TAU / rand(90, 200));
            sats.push({ a0: a + shift, rho, r, w: groupSpeed.get(grp) as number });
          }
        }

        // Taches peintes du visuel : celles qui tombent sur le globe sont collées à la
        // sphère (elles tournent avec elle), les autres restent dans le halo.
        const b0 = viewBasis(LON_START);
        staticTouches = [];
        patches = [];
        for (const tch of d.halo_peinture.touches) {
          const vx = (tch[0] - cx) / R_SPHERE, vy = (tch[1] - cy) / R_SPHERE, q = 1 - vx * vx - vy * vy;
          if (q > 0.06) {
            const vz = Math.sqrt(q);
            const pp: Vec3 = [
              vx * b0.e[0] - vy * b0.n[0] + vz * b0.f[0],
              vx * b0.e[1] - vy * b0.n[1] + vz * b0.f[1],
              vx * b0.e[2] - vy * b0.n[2] + vz * b0.f[2],
            ];
            patches.push({ p: pp, rho: tch[2] / R_SPHERE, color: tch[3], alpha: tch[4], brand: false });
          } else {
            staticTouches.push(tch);
          }
        }
        // Taches de couleur de la charte, réparties sur toute la sphère
        let seed = 7;
        const seeded = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        for (let k = 0; k < 16; k++) {
          const z = seeded() * 2 - 1, an = seeded() * TAU, s = Math.sqrt(1 - z * z);
          patches.push({ p: [s * Math.cos(an), s * Math.sin(an), z], rho: 0.05 + seeded() * 0.05, color: PATCH_COLORS[k % 4], alpha: 0.28 + seeded() * 0.17, brand: true });
        }

        resize();
        if (reduceMotion) showStill();
        else play();
      })
      .catch(() => {});

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) showStill();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);

    return () => {
      cancelled = true;
      pause();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
      {/* Écrit en HTML brut : un <img> React ici serait préchargé même avec JavaScript actif. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img src="/images/brand/globe-trame.jpg" alt="" class="${className ?? ''} object-cover object-right-top" />`,
        }}
      />
    </>
  );
}
