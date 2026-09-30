// Carte de densité des continents (équirectangulaire 720x360, niveaux de gris)
// pour le globe en trame qui tourne. Source : Natural Earth 1:50m (domaine public) via world-atlas.
// Usage : npm install --no-save world-atlas topojson-client sharp
//         node scripts/globe/carte-densite.js [fichier-de-sortie.png]
// Voir docs/globe-anime.md.
const fs = require('fs');
const sharp = require('sharp');
const topojson = require('topojson-client');

const path = require('path');
const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'public', 'images', 'brand', 'terre-densite.png');
const topo = JSON.parse(fs.readFileSync(require.resolve('world-atlas/land-50m.json'), 'utf8'));
const land = topojson.feature(topo, topo.objects.land);

// 1) Rasterise the land polygons at 4 px/degree with librsvg
const SW = 1440, SH = 720;
const px = ([lon, lat]) => `${((lon + 180) * 4).toFixed(2)} ${((90 - lat) * 4).toFixed(2)}`;
let d = '';
const geoms = (land.features || [land]).map((ft) => ft.geometry);
const polys = geoms.flatMap((g) => (g.type === 'MultiPolygon' ? g.coordinates : [g.coordinates]));
// Unwrap longitudes so rings crossing the antimeridian stay continuous; rings that
// wrap all the way round (Antarctica) are closed through the pole. Each ring is drawn
// three times (-360, 0, +360) and the canvas clips the overflow.
function unwrap(ring) {
  const out = [ring[0].slice()];
  for (let k = 1; k < ring.length; k++) {
    let lon = ring[k][0];
    const prev = out[k - 1][0];
    while (lon - prev > 180) lon -= 360;
    while (lon - prev < -180) lon += 360;
    out.push([lon, ring[k][1]]);
  }
  const span = out[out.length - 1][0] - out[0][0];
  if (Math.abs(span) > 180) {
    const pole = out.reduce((a, p) => a + p[1], 0) / out.length < 0 ? -90 : 90;
    out.push([out[out.length - 1][0], pole], [out[0][0], pole]);
  }
  return out;
}
for (const poly of polys) for (const ring of poly) {
  const u = unwrap(ring);
  for (const shift of [-360, 0, 360]) d += 'M' + u.map(([lon, lat]) => px([lon + shift, lat])).join('L') + 'Z';
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}"><rect width="100%" height="100%" fill="#000"/><path d="${d}" fill="#fff" fill-rule="evenodd"/></svg>`;

// 3D value noise on the unit sphere (seamless, no seam at the antimeridian)
const hash = (x, y, z) => {
  let h = (x * 374761393 + y * 668265263 + z * 1274126177) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};
const smooth = (t) => t * t * (3 - 2 * t);
function vnoise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = smooth(x - xi), yf = smooth(y - yi), zf = smooth(z - zi);
  let v = 0;
  for (let dx = 0; dx < 2; dx++) for (let dy = 0; dy < 2; dy++) for (let dz = 0; dz < 2; dz++) {
    const w = (dx ? xf : 1 - xf) * (dy ? yf : 1 - yf) * (dz ? zf : 1 - zf);
    v += w * hash(xi + dx, yi + dy, zi + dz);
  }
  return v;
}
const fbm = (x, y, z) => (vnoise(x * 3, y * 3, z * 3) * 0.5 + vnoise(x * 7, y * 7, z * 7) * 0.3 + vnoise(x * 15, y * 15, z * 15) * 0.2);

(async () => {
  const W = 720, H = 360;
  const mask = await sharp(Buffer.from(svg)).resize(W, H, { kernel: 'lanczos3' }).blur(1.1).greyscale().raw().toBuffer();
  const out = Buffer.alloc(W * H);
  for (let j = 0; j < H; j++) {
    const lat = (90 - (j + 0.5) / 2) * Math.PI / 180;
    for (let i = 0; i < W; i++) {
      const lon = ((i + 0.5) / 2 - 180) * Math.PI / 180;
      const x = Math.cos(lat) * Math.cos(lon), y = Math.cos(lat) * Math.sin(lon), z = Math.sin(lat);
      const n = fbm(x + 5, y + 5, z + 5);                 // ~0.2..0.8
      const texture = Math.min(1, Math.max(0.35, 0.35 + (n - 0.25) * 1.3));
      out[j * W + i] = Math.round((mask[j * W + i] / 255) * texture * 255);
    }
  }
  await sharp(out, { raw: { width: W, height: H, channels: 1 } }).png({ compressionLevel: 9, palette: false }).toFile(OUT);
  console.log('ok', (fs.statSync(OUT).size / 1024).toFixed(0) + ' KB');
})();
