// GeoMTL brand logo — exact vector letterforms from the official mark.
// Pass `variant` to switch between color modes.
// The "2027" year is embedded as vector paths matching the original type style.

import { cn } from '@/lib/utils';

interface GeoMTLLogoProps {
  className?: string;
  /** 'white' for dark backgrounds, 'green' for light backgrounds, 'color' for brand rose/white split */
  variant?: 'white' | 'green' | 'color';
  /** If true, the "2027" year digits are shown */
  showYear?: boolean;
  /** SVG height in pixels — width scales proportionally (viewBox ratio ≈ 4.93:1) */
  height?: number;
}

export default function GeoMTLLogo({
  className,
  variant = 'white',
  showYear = true,
  height = 32,
}: GeoMTLLogoProps) {
  // viewBox is "0 0 409.9 83.1" — if no year, we crop to the main letterforms
  const viewBox = showYear ? '0 0 409.9 83.1' : '0 0 333.3 83.1';
  const width = showYear ? (height * 409.9) / 83.1 : (height * 333.3) / 83.1;

  const mainFill =
    variant === 'green'
      ? '#185d30'
      : variant === 'color'
      ? 'white'
      : 'white';

  const accentFill =
    variant === 'color' ? '#e91e8c' : mainFill;

  const yearOpacity = variant === 'color' ? '0.6' : '0.7';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      className={cn('flex-shrink-0', className)}
      aria-label="GeoMTL 2027"
      role="img"
    >
      {/* ── Main letterforms ─────────────────────────────── */}
      <g fill={mainFill} fillRule="nonzero">
        {/* G */}
        <path d="M28.2,54.8h18v17.5c-1.8,0.9-3.8,1.5-5.8,1.8c-2.2,0.4-4.5,0.5-6.8,0.5c-3.6,0-7-0.6-10-1.9c-3-1.3-5.6-3.1-7.8-5.3c-2.1-2.2-3.9-4.9-5.1-8c-1.2-3.1-1.9-6.5-1.9-10.2c0-3.7,0.6-7.1,1.8-10.2c1.2-3.1,3-5.8,5.1-8.1c2.2-2.3,4.8-4.1,7.8-5.3c3-1.3,6.3-1.9,9.8-1.9c3.4,0,6.6,0.4,9.4,1.2c2.8,0.8,5.3,2.1,7.4,3.8l0.2,0.2h0.6v-9.2c-2.5-1.5-5.3-2.7-8.3-3.3c-3.2-0.7-6.3-1.1-9.4-1.1c-4.8,0-9.3,0.9-13.3,2.6C16,19.6,12.5,22,9.5,25c-3,3-5.3,6.6-7,10.7C0.8,39.8,0,44.3,0,49.2c0,4.9,0.8,9.5,2.5,13.6c1.7,4.1,4,7.7,7,10.7c3,3,6.5,5.4,10.6,7.1c4.1,1.7,8.6,2.6,13.4,2.6c4.1,0,8.1-0.6,11.7-1.7c3.7-1.1,6.7-2.6,9.2-4.4l0.3-0.2V46.4H28.2V54.8z" />
        {/* e accent/arrow */}
        <polygon points="87.3,12.6 98.8,0.5 87.3,0.5 78.7,12.6" />
        {/* e body */}
        <polygon points="74.2,51.5 102.5,51.5 102.5,43.1 74.2,43.1 74.2,25.4 104.4,25.4 104.4,17 65.3,17 65.3,81.4 104.9,81.4 104.9,73 74.2,73" />
        {/* o */}
        <path d="M168.1,25c-3-3-6.6-5.4-10.6-7.2c-4.1-1.7-8.5-2.6-13.2-2.6c-4.7,0-9.1,0.9-13.2,2.6c-4.1,1.7-7.6,4.1-10.6,7.2c-3,3-5.4,6.6-7.1,10.7c-1.7,4.1-2.6,8.6-2.6,13.3c0,4.9,0.9,9.4,2.6,13.5c1.7,4.1,4.1,7.7,7.1,10.7c3,3,6.6,5.4,10.6,7.2c4.1,1.7,8.5,2.6,13.2,2.6c4.7,0,9.1-0.9,13.2-2.6c4.1-1.7,7.6-4.1,10.6-7.2c3-3,5.4-6.6,7.1-10.7c1.7-4.1,2.6-8.7,2.6-13.5c0-4.7-0.9-9.2-2.6-13.3C173.5,31.7,171.1,28,168.1,25z M167,59c-1.3,3.1-3,5.9-5.2,8.2c-2.2,2.3-4.8,4.1-7.8,5.5c-3,1.3-6.2,2-9.7,2c-3.5,0-6.8-0.7-9.7-2c-3-1.3-5.6-3.2-7.8-5.5c-2.2-2.3-3.9-5-5.2-8.2c-1.3-3.1-1.9-6.4-1.9-9.9c0-3.5,0.6-6.8,1.9-9.9c1.3-3.1,3-5.8,5.2-8.1c2.2-2.3,4.8-4.1,7.8-5.4c3-1.3,6.3-2,9.7-2c3.5,0,6.7,0.7,9.7,2c3,1.3,5.6,3.2,7.8,5.4c2.2,2.3,4,5,5.2,8.1c1.3,3.1,1.9,6.4,1.9,9.9C168.9,52.6,168.3,55.9,167,59z" />
      </g>

      {/* ── MTL — drawn with accent color when variant=color ─── */}
      <g fill={accentFill} fillRule="nonzero">
        {/* M */}
        <polygon points="237.7,17 218.9,17 213.9,61.6 213.6,61.6 203.7,17 183.7,17 187.9,28.8 183.9,81.4 196.8,81.4 191.7,34.2 192,34.2 203.5,81.4 215.5,81.4 224.8,34.2 225.1,34.2 222.2,81.4 240.8,81.4 237.7,67.1" />
        {/* T */}
        <polygon points="248.4,33 262,25 262,81.4 279.6,81.4 276.5,67.1 276.5,25 290.2,33 290.2,17 248.4,17" />
        {/* L */}
        <polygon points="315.3,17 297.8,17 300.8,31.3 300.8,81.4 331.1,81.4 333.3,64.8 315.3,73.2" />
      </g>

      {/* ── Year "2027" ──────────────────────────────────── */}
      {showYear && (
        <g fill={mainFill} fillOpacity={yearOpacity} fillRule="nonzero">
          {/* 2 */}
          <path d="M349.3,21.2v4.2h-16.1V22l8.6-9.7c1.2-1.3,2.4-2.7,2.4-4.5c0-2.3-1.7-3.6-4.4-3.6c-2.6,0-4.9,1.5-6,2.9h-0.4V2.5c1.1-1.1,3.7-2.5,7.1-2.5c4.8,0,8.5,2.9,8.5,7.2c0,3.3-1.9,5.5-3.5,7.4l-2.7,3.1c-1.5,1.7-2.4,2.5-3.3,3.5H349.3z" />
          {/* 0 */}
          <path d="M352.2,12.9c0-7.3,3.9-12.9,9.7-12.9c5.9,0,9.7,5.6,9.7,12.9c0,7.6-3.3,13-9.7,13S352.2,20.6,352.2,12.9z M357.1,12.9c0,4.4,1.4,8.7,4.9,8.7c3.7,0,4.9-4.3,4.9-8.7c0-4.8-1.6-8.6-4.9-8.6C358.8,4.3,357.1,8.2,357.1,12.9z" />
          {/* 2 */}
          <path d="M390.7,21.2v4.2h-16.1V22l8.6-9.7c1.2-1.3,2.4-2.7,2.4-4.5c0-2.3-1.7-3.6-4.4-3.6c-2.6,0-4.9,1.5-6,2.9h-0.4V2.5c1.1-1.1,3.7-2.5,7.1-2.5c4.8,0,8.5,2.9,8.5,7.2c0,3.3-1.9,5.5-3.5,7.4l-2.7,3.1c-1.5,1.7-2.4,2.5-3.3,3.5H390.7z" />
          {/* 7 — geometric bold, matches the condensed style of the other digits */}
          <path d="M393.8,0.5H409.3V4.3L401.8,25.7H397.3L404.6,4.3H393.8Z" />
        </g>
      )}
    </svg>
  );
}
