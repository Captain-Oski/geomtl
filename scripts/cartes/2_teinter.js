// Étape 2 : recolore la capture pour chaque niveau de partenariat. La
// luminosité de chaque pixel est projetée sur une rampe de couleurs
// (« gradient map ») : le relief et la trame de points sont conservés,
// la transparence aussi. Sortie : public/images/brand/cartes/<niveau>.webp
//
// Les rampes doivent rester assorties aux filets de la page Devenir
// partenaire (NIVEAUX_VISUELS dans app/[locale]/devenir-partenaire/page.tsx).
// Usage : node scripts/cartes/2_teinter.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '.travail', 'globe-charte.png');
const SORTIE = path.join(__dirname, '..', '..', 'public', 'images', 'brand', 'cartes');

const RAMPES = {
  or: [[0, '#4A3206'], [0.3, '#8E6410'], [0.6, '#D3A12C'], [0.82, '#F0CB62'], [1, '#FFF1BF']],
  argent: [[0, '#2C3238'], [0.3, '#5F6871'], [0.6, '#A2AAB2'], [0.82, '#D2D7DC'], [1, '#F5F7F9']],
  bronze: [[0, '#381D0B'], [0.3, '#74401E'], [0.6, '#B36F3F'], [0.82, '#DA9E6F'], [1, '#F4D3B4']],
  exposant: [[0, '#2A2A26'], [0.3, '#55544D'], [0.6, '#8F8D84'], [0.82, '#BDBAB0'], [1, '#E6E4DC']],
};

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

function rampe(stops, t) {
  for (let i = 1; i < stops.length; i++) {
    const [t1, c1] = stops[i];
    if (t <= t1) {
      const [t0, c0] = stops[i - 1];
      const u = (t - t0) / (t1 - t0);
      const a = hex(c0), b = hex(c1);
      return a.map((v, k) => Math.round(v + (b[k] - v) * u));
    }
  }
  return hex(stops[stops.length - 1][1]);
}

(async () => {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

  // Luminosité perçue (racine cubique de la luminance), bornée sur les pixels opaques
  const Y = new Float32Array(n);
  const opaques = [];
  for (let i = 0; i < n; i++) {
    const [r, g, b] = [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]].map((v) => lin(v / 255));
    Y[i] = Math.cbrt(0.2126 * r + 0.7152 * g + 0.0722 * b);
    if (data[i * 4 + 3] > 200) opaques.push(Y[i]);
  }
  opaques.sort((a, b) => a - b);
  const bas = opaques[Math.floor(opaques.length * 0.01)];
  const haut = opaques[Math.floor(opaques.length * 0.995)];

  fs.mkdirSync(SORTIE, { recursive: true });
  for (const [niveau, stops] of Object.entries(RAMPES)) {
    const out = Buffer.alloc(n * 4);
    for (let i = 0; i < n; i++) {
      const [r, g, b] = rampe(stops, Math.min(1, Math.max(0, (Y[i] - bas) / (haut - bas))));
      out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b; out[i * 4 + 3] = data[i * 4 + 3];
    }
    const fichier = path.join(SORTIE, `${niveau}.webp`);
    await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
      .resize(800)
      .webp({ quality: 80, alphaQuality: 85, effort: 6 })
      .toFile(fichier);
    console.log(niveau, Math.round(fs.statSync(fichier).size / 1024), 'Ko');
  }
})();
