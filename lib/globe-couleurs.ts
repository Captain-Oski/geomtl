// Réglages de couleur du globe animé, partagés par le moteur (GlobeTrame) et la page /demo.

export type RGB = [number, number, number];

export interface CouleursGlobe {
  pointsTeinte: number;      // teinte des points, en degrés (olive de la charte : 85)
  pointsLuminosite: number;  // décalage de luminosité des points, en points de %
  globeTeinte: number;       // décalage de teinte du globe diffus, en degrés
  globeSaturation: number;   // saturation du globe diffus, en %
}

export const COULEURS_CHARTE: CouleursGlobe = { pointsTeinte: 85, pointsLuminosite: 0, globeTeinte: 0, globeSaturation: 100 };
export const OLIVE = '#6A8C3A';

export const hexRgb = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};

export function hexToHsl(hex: string): [number, number, number] {
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

export function hslToRgb(h: number, s: number, l: number): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

export const toHex = (rgb: RGB) =>
  '#' + rgb.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('').toUpperCase();

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const OLIVE_HSL = hexToHsl(OLIVE);

// Couleur d'un point : la teinte réglée remplace celle de l'olive, la saturation est conservée.
export function couleurPoint(hex: string, c: CouleursGlobe): RGB {
  const [h, s, l] = hexToHsl(hex);
  return hslToRgb((h + c.pointsTeinte - OLIVE_HSL[0] + 720) % 360, s, clamp01(l + c.pointsLuminosite / 100));
}

// Couleur du globe diffus : décalage de teinte et saturation appliqués à chaque teinte du dégradé.
export function couleurGlobe(hex: string, teinte: number, saturation: number): string {
  const [h, s, l] = hexToHsl(hex);
  return toHex(hslToRgb((h + teinte + 720) % 360, clamp01((s * saturation) / 100), l));
}
