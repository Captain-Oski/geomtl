'use client';

import { useEffect, useRef, useId } from 'react';
import gsap from 'gsap';

interface IsolineRippleProps {
  className?: string;
  /** Nombre d'isolignes */
  lineCount?: number;
  /** Amplitude du ripple en px (SVG units) */
  amplitude?: number;
  /** Vitesse de l'onde (plus grand = plus rapide) */
  speed?: number;
  /** Décalage de phase vertical entre les lignes */
  vertPhase?: number;
  /** Afficher le logo GÉOMTL centré */
  showLogo?: boolean;
  /** Couleur de fond SVG (défaut: white). 'none' = transparent */
  bgColor?: string;
}

const W = 1200;
const H = 151;
const SEGMENTS = 28; // points de sample par ligne

// Construit le `d` d'une ligne avec l'onde ripple
function buildPath(baseY: number, lineIdx: number, t: number, amp: number, speed: number, vertPhase: number): string {
  const pts: { x: number; y: number }[] = [];

  for (let s = 0; s <= SEGMENTS; s++) {
    const x = (s / SEGMENTS) * W;

    // Ondulation de base (statique, organique — réplique l'allure ISO.png)
    const organic = 3.2 * Math.sin(x * 0.009 + lineIdx * 1.07)
                  + 1.6 * Math.cos(x * 0.018 + lineIdx * 0.63);

    // Onde ripple principale — voyageuse horizontale + propagation inter-lignes
    const ripple1 = amp * Math.sin(x * 0.007 - t * speed + lineIdx * vertPhase);
    // Harmonique secondaire — donne de la texture
    const ripple2 = (amp * 0.35) * Math.sin(x * 0.015 - t * speed * 1.4 + lineIdx * vertPhase * 1.3);

    pts.push({ x, y: baseY + organic + ripple1 + ripple2 });
  }

  // Cubic bezier lisse via Catmull-Rom → bezier (tension 0.4)
  const tension = 0.4;
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(2)}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) * tension / 3;
    const cp1y = p1.y + (p2.y - p0.y) * tension / 3;
    const cp2x = p2.x - (p3.x - p1.x) * tension / 3;
    const cp2y = p2.y - (p3.y - p1.y) * tension / 3;

    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(1)},${p2.y.toFixed(2)}`;
  }

  return d;
}

export default function IsolineRipple({
  className,
  lineCount  = 22,
  amplitude  = 9,
  speed      = 1.1,
  vertPhase  = 0.42,
  showLogo   = true,
  bgColor    = 'white',
}: IsolineRippleProps) {
  const uid       = useId().replace(/:/g, '');
  const gradId    = `isoGrad-${uid}`;
  const gradLetId = `isoLet-${uid}`;
  const gradYrId  = `isoYr-${uid}`;
  const clipId    = `isoClip-${uid}`;

  const pathRefs  = useRef<(SVGPathElement | null)[]>([]);

  // Logo zone — centré dans le viewBox, scale fixe
  const logoScale  = 1.4;
  const logoW      = 409.9 * logoScale;
  const logoH      = 83.1  * logoScale;
  const logoX      = (W - logoW) / 2;
  const logoY      = (H - logoH) / 2;

  useEffect(() => {
    const lines = Array.from({ length: lineCount }, (_, i) => ({
      baseY: (H / (lineCount + 1)) * (i + 1),
    }));

    function onTick() {
      const t = gsap.ticker.time;
      lines.forEach(({ baseY }, i) => {
        const el = pathRefs.current[i];
        if (el) el.setAttribute('d', buildPath(baseY, i, t, amplitude, speed, vertPhase));
      });
    }

    gsap.ticker.fps(60);
    gsap.ticker.add(onTick);
    return () => { gsap.ticker.remove(onTick); };
  }, [lineCount, amplitude, speed, vertPhase]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient isolignes — crème → violet, pleine hauteur SVG */}
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={H}>
          <stop offset="0%"   stopColor="#01CDA5"/>
          <stop offset="50%"  stopColor="#1BC868"/>
          <stop offset="100%" stopColor="#D0DC00"/>
        </linearGradient>

        {/* Gradient lettres — espace local lettre y=0..83.1, identique à solarGrad dans GeoMTLLogo */}
        <linearGradient id={gradLetId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="83.1"
          gradientTransform={`translate(${logoX.toFixed(1)},${logoY.toFixed(1)}) scale(${logoScale})`}>
          <stop offset="0%"   stopColor="#01CDA5"/>
          <stop offset="50%"  stopColor="#1BC868"/>
          <stop offset="100%" stopColor="#D0DC00"/>
        </linearGradient>

        {/* Gradient 2027 — identique à solarGradSup de GeoMtl2027_v3_creme-violet.svg */}
        <linearGradient id={gradYrId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="25.4"
          gradientTransform={`translate(${logoX.toFixed(1)},${logoY.toFixed(1)}) scale(${logoScale})`}>
          <stop offset="0%"   stopColor="#01CDA5"/>
          <stop offset="50%"  stopColor="#1BC868"/>
          <stop offset="100%" stopColor="#D0DC00"/>
        </linearGradient>

        {/* Clip : masque les isolignes derrière le logo */}
        {showLogo && (
          <clipPath id={clipId}>
            <path
              fillRule="evenodd"
              d={`M-10,-10 H${W + 10} V${H + 10} H-10 Z  M${logoX.toFixed(1)},${logoY.toFixed(1)} H${(logoX + logoW).toFixed(1)} V${(logoY + logoH).toFixed(1)} H${logoX.toFixed(1)} Z`}
            />
          </clipPath>
        )}
      </defs>

      {bgColor !== 'none' && <rect width={W} height={H} fill={bgColor}/>}

      {/* Isolignes animées */}
      <g
        fill="none"
        stroke={`url(#${gradId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={showLogo ? `url(#${clipId})` : undefined}
      >
        {Array.from({ length: lineCount }, (_, i) => {
          const sw      = (0.55 + 0.25 * Math.sin((Math.PI * i) / lineCount)).toFixed(2);
          const opacity = (0.35 + 0.35 * Math.sin((Math.PI * i) / lineCount)).toFixed(2);
          return (
            <path
              key={i}
              ref={el => { pathRefs.current[i] = el; }}
              strokeWidth={sw}
              strokeOpacity={opacity}
            />
          );
        })}
      </g>

      {/* Logo GÉOMTL 2027 */}
      {showLogo && (
        <>
          <g
            transform={`translate(${logoX.toFixed(1)},${logoY.toFixed(1)}) scale(${logoScale})`}
            fill={`url(#${gradLetId})`}
            fillRule="nonzero"
          >
            <path d="M28.2,54.8h18v17.5c-1.8,0.9-3.8,1.5-5.8,1.8c-2.2,0.4-4.5,0.5-6.8,0.5c-3.6,0-7-0.6-10-1.9c-3-1.3-5.6-3.1-7.8-5.3c-2.1-2.2-3.9-4.9-5.1-8c-1.2-3.1-1.9-6.5-1.9-10.2c0-3.7,0.6-7.1,1.8-10.2c1.2-3.1,3-5.8,5.1-8.1c2.2-2.3,4.8-4.1,7.8-5.3c3-1.3,6.3-1.9,9.8-1.9c3.4,0,6.6,0.4,9.4,1.2c2.8,0.8,5.3,2.1,7.4,3.8l0.2,0.2h0.6v-9.2c-2.5-1.5-5.3-2.7-8.3-3.3c-3.2-0.7-6.3-1.1-9.4-1.1c-4.8,0-9.3,0.9-13.3,2.6C16,19.6,12.5,22,9.5,25c-3,3-5.3,6.6-7,10.7C0.8,39.8,0,44.3,0,49.2c0,4.9,0.8,9.5,2.5,13.6c1.7,4.1,4,7.7,7,10.7c3,3,6.5,5.4,10.6,7.1c4.1,1.7,8.6,2.6,13.4,2.6c4.1,0,8.1-0.6,11.7-1.7c3.7-1.1,6.7-2.6,9.2-4.4l0.3-0.2V46.4H28.2V54.8z"/>
            <polygon points="87.3,12.6 98.8,0.5 87.3,0.5 78.7,12.6"/>
            <polygon points="74.2,51.5 102.5,51.5 102.5,43.1 74.2,43.1 74.2,25.4 104.4,25.4 104.4,17 65.3,17 65.3,81.4 104.9,81.4 104.9,73 74.2,73"/>
            <path d="M168.1,25c-3-3-6.6-5.4-10.6-7.2c-4.1-1.7-8.5-2.6-13.2-2.6c-4.7,0-9.1,0.9-13.2,2.6c-4.1,1.7-7.6,4.1-10.6,7.2c-3,3-5.4,6.6-7.1,10.7c-1.7,4.1-2.6,8.6-2.6,13.3c0,4.9,0.9,9.4,2.6,13.5c1.7,4.1,4.1,7.7,7.1,10.7c3,3,6.6,5.4,10.6,7.2c4.1,1.7,8.5,2.6,13.2,2.6c4.7,0,9.1-0.9,13.2-2.6c4.1-1.7,7.6-4.1,10.6-7.2c3-3,5.4-6.6,7.1-10.7c1.7-4.1,2.6-8.7,2.6-13.5c0-4.7-0.9-9.2-2.6-13.3C173.5,31.7,171.1,28,168.1,25z M167,59c-1.3,3.1-3,5.9-5.2,8.2c-2.2,2.3-4.8,4.1-7.8,5.5c-3,1.3-6.2,2-9.7,2c-3.5,0-6.8-0.7-9.7-2c-3-1.3-5.6-3.2-7.8-5.5c-2.2-2.3-3.9-5-5.2-8.2c-1.3-3.1-1.9-6.4-1.9-9.9c0-3.5,0.6-6.8,1.9-9.9c1.3-3.1,3-5.8,5.2-8.1c2.2-2.3,4.8-4.1,7.8-5.4c3-1.3,6.3-2,9.7-2c3.5,0,6.7,0.7,9.7,2c3,1.3,5.6,3.2,7.8,5.4c2.2,2.3,4,5,5.2,8.1c1.3,3.1,1.9,6.4,1.9,9.9C168.9,52.6,168.3,55.9,167,59z"/>
            <polygon points="237.7,17 218.9,17 213.9,61.6 213.6,61.6 203.7,17 183.7,17 187.9,28.8 183.9,81.4 196.8,81.4 191.7,34.2 192,34.2 203.5,81.4 215.5,81.4 224.8,34.2 225.1,34.2 222.2,81.4 240.8,81.4 237.7,67.1"/>
            <polygon points="248.4,33 262,25 262,81.4 279.6,81.4 276.5,67.1 276.5,25 290.2,33 290.2,17 248.4,17"/>
            <polygon points="315.3,17 297.8,17 300.8,31.3 300.8,81.4 331.1,81.4 333.3,64.8 315.3,73.2"/>
          </g>
          <g
            transform={`translate(${logoX.toFixed(1)},${logoY.toFixed(1)}) scale(${logoScale})`}
            fill={`url(#${gradYrId})`}
            fillRule="nonzero"
          >
            <path d="M349.3,21.2v4.2h-16.1V22l8.6-9.7c1.2-1.3,2.4-2.7,2.4-4.5c0-2.3-1.7-3.6-4.4-3.6c-2.6,0-4.9,1.5-6,2.9h-0.4V2.5c1.1-1.1,3.7-2.5,7.1-2.5c4.8,0,8.5,2.9,8.5,7.2c0,3.3-1.9,5.5-3.5,7.4l-2.7,3.1c-1.5,1.7-2.4,2.5-3.3,3.5H349.3z"/>
            <path d="M352.2,12.9c0-7.3,3.9-12.9,9.7-12.9c5.9,0,9.7,5.6,9.7,12.9c0,7.6-3.3,13-9.7,13S352.2,20.6,352.2,12.9z M357.1,12.9c0,4.4,1.4,8.7,4.9,8.7c3.7,0,4.9-4.3,4.9-8.7c0-4.8-1.6-8.6-4.9-8.6C358.8,4.3,357.1,8.2,357.1,12.9z"/>
            <path d="M390.7,21.2v4.2h-16.1V22l8.6-9.7c1.2-1.3,2.4-2.7,2.4-4.5c0-2.3-1.7-3.6-4.4-3.6c-2.6,0-4.9,1.5-6,2.9h-0.4V2.5c1.1-1.1,3.7-2.5,7.1-2.5c4.8,0,8.5,2.9,8.5,7.2c0,3.3-1.9,5.5-3.5,7.4l-2.7,3.1c-1.5,1.7-2.4,2.5-3.3,3.5H390.7z"/>
            <path d="M393.8,0.5H408.6V4.0L400.2,25.4H395.5L403.9,4.0H393.8Z"/>
          </g>
        </>
      )}
    </svg>
  );
}
