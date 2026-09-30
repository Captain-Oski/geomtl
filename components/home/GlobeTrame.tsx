'use client';

import { useEffect, useRef } from 'react';

type Stop = [number, string, number];
type Touch = [number, number, number, string, number];
type Point = [number, number, number, number, number];

interface GlobeData {
  width: number;
  height: number;
  colors: { trame: string };
  degrade: { cx: number; cy: number; r: number; stops: Stop[] };
  halo_peinture: { touches: Touch[] };
  trame: { points: Point[] };
}

const DATA_URL = '/images/brand/globe-trame.json';
const TAU = Math.PI * 2;
const REVEAL = 2.2;
const DOT_GROW = 0.6;
const FRAME_MS = 1000 / 30;

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

// Globe en trame animé : apparition depuis le centre, puis ondulation de la
// trame et halo peint qui respire, en boucle. Cadré comme
// `object-fit: cover; object-position: right top`.
export default function GlobeTrame({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const halo = document.createElement('canvas');
    const hctx = halo.getContext('2d');
    if (!hctx) return;

    let data: GlobeData | null = null;
    let dist = new Float32Array(0);
    let dMin = 0;
    let dMax = 1;
    let phase: [number, number][] = [];
    let dpr = 1;
    let scale = 1;
    let offX = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let start = 0;
    let last = 0;
    let cancelled = false;

    const resize = () => {
      if (!data) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      halo.width = Math.max(1, Math.round(canvas.width / 2));
      halo.height = Math.max(1, Math.round(canvas.height / 2));
      scale = Math.max(w / data.width, h / data.height);
      offX = w - data.width * scale;
    };

    const draw = (t: number) => {
      if (!data) return;
      const { degrade: G, halo_peinture, trame, colors } = data;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Halo peint, rendu en demi-résolution (il est flou de toute façon)
      const hs = halo.width / Math.max(1, w);
      hctx.setTransform(1, 0, 0, 1, 0, 0);
      hctx.clearRect(0, 0, halo.width, halo.height);
      hctx.setTransform(scale * hs, 0, 0, scale * hs, offX * hs, 0);
      const haloIn = Math.min(1, t / 1.2);
      const r = G.r * (1 + 0.012 * Math.sin(t * 0.8));
      const grad = hctx.createRadialGradient(G.cx, G.cy, 0, G.cx, G.cy, r);
      for (const [o, c, a] of G.stops) grad.addColorStop(Math.min(1, o), rgba(c, a * haloIn));
      hctx.fillStyle = grad;
      hctx.fillRect(0, 0, data.width, data.height);

      halo_peinture.touches.forEach(([x, y, s, c, a], k) => {
        const [p1, p2] = phase[k];
        const cx = x + 22 * Math.sin(t * 0.35 + p1);
        const cy = y + 16 * Math.cos(t * 0.29 + p2);
        const op = a * haloIn * (0.8 + 0.2 * Math.sin(t * 0.6 + p1));
        const R = 3 * s;
        const tg = hctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        for (const q of [0, 0.2, 0.4, 0.6, 0.8]) tg.addColorStop(q, rgba(c, op * Math.exp(-((3 * q) ** 2) / 2)));
        tg.addColorStop(1, rgba(c, 0));
        hctx.fillStyle = tg;
        hctx.beginPath();
        hctx.arc(cx, cy, R, 0, TAU);
        hctx.fill();
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(halo, 0, 0, canvas.width, canvas.height);

      // Trame : seuls les points dans le cadre visible sont dessinés
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, offX * dpr, 0);
      const x0 = -offX / scale - 15;
      const x1 = (w - offX) / scale + 15;
      const y1 = h / scale + 15;
      ctx.fillStyle = colors.trame;
      ctx.beginPath();
      const pts = trame.points;
      for (let k = 0; k < pts.length; k++) {
        const [x, y, pr] = pts[k];
        if (x < x0 || x > x1 || y > y1) continue;
        const d = (dist[k] - dMin) / (dMax - dMin);
        const appear = easeOut(Math.min(1, Math.max(0, (t - 0.3 - d * REVEAL) / DOT_GROW)));
        if (appear <= 0) continue;
        const rr = pr * appear * (1 + 0.12 * Math.sin(t * 1.4 - dist[k] * 0.006));
        ctx.moveTo(x + rr, y);
        ctx.arc(x, y, rr, 0, TAU);
      }
      ctx.fill();
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw((now - start) / 1000);
    };
    const play = () => {
      if (running || reduceMotion || !data || !visible) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    fetch(DATA_URL)
      .then((res) => res.json() as Promise<GlobeData>)
      .then((d) => {
        if (cancelled) return;
        data = d;
        const { cx, cy } = d.degrade;
        dist = new Float32Array(d.trame.points.map(([x, y]) => Math.hypot(x - cx, y - cy)));
        dMin = Infinity;
        dMax = 0;
        for (let k = 0; k < dist.length; k++) {
          if (dist[k] < dMin) dMin = dist[k];
          if (dist[k] > dMax) dMax = dist[k];
        }
        phase = d.halo_peinture.touches.map((_, k) => [((k * 0.618034) % 1) * TAU, ((k * 0.381966 + 0.5) % 1) * TAU]);
        resize();
        start = performance.now();
        if (reduceMotion) draw(60);
        else play();
      })
      .catch(() => {});

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(60);
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
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand/globe-trame.jpg" alt="" className={`${className ?? ''} object-cover object-right-top`} />
      </noscript>
    </>
  );
}
