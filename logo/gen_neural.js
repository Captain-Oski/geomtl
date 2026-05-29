const fs = require('fs');

const W = 900, H = 1200;
const spineX = 450;
const scale = W / 409.9;
const textH = 83.1 * scale;
const textTop = (H - textH) / 2;
const textBottom = textTop + textH;

let seed = 137;
function r() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
function rr(a, b) { return a + r() * (b - a); }

const paths = [];

function upperFiber(startX, startY, jitter = true) {
  const endX  = spineX + rr(-35, 35);
  const endY  = textTop - rr(5, 30);
  const cp1x  = startX + (spineX - startX) * rr(0.05, 0.25) + (jitter ? rr(-60,60) : 0);
  const cp1y  = startY + (endY - startY) * rr(0.20, 0.40);
  const cp2x  = spineX + (startX - spineX) * rr(0.10, 0.35) + (jitter ? rr(-40,40) : 0);
  const cp2y  = endY   - (endY - startY)   * rr(0.20, 0.40);
  return {
    d: `M ${startX.toFixed(1)},${startY.toFixed(1)} C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${endX.toFixed(1)},${endY.toFixed(1)}`,
    sw: rr(0.7,2.0).toFixed(1), op: rr(0.45,0.90).toFixed(2)
  };
}

for (let i = 0; i < 52; i++) {
  const t = i / 51;
  paths.push(upperFiber(W * (0.03 + 0.94 * t) + rr(-30, 30), rr(0, H * 0.18)));
}
for (let i = 0; i < 14; i++) paths.push(upperFiber(rr(20, 220), rr(0, H * 0.25)));
for (let i = 0; i < 14; i++) paths.push(upperFiber(rr(680, 880), rr(0, H * 0.25)));
for (let i = 0; i < 8; i++) {
  const sx = i < 4 ? rr(30, 180) : rr(720, 870);
  const p = upperFiber(sx, rr(H * 0.05, H * 0.32), false);
  paths.push({ ...p, sw: rr(1.2, 2.5).toFixed(1), op: rr(0.28, 0.52).toFixed(2) });
}

// Branch fibers
for (let i = 0; i < 22; i++) {
  const sx = rr(80, 820);
  const sy = rr(5, H * 0.10);
  const fx = sx + (spineX - sx) * rr(0.5, 0.75) + rr(-40, 40);
  const fy = sy + (textTop - sy) * rr(0.4, 0.65);
  const bx = spineX + rr(-55, 55);
  const by = textTop - rr(10, 55);
  const cp1x = fx + rr(-30, 30);
  const cp1y = fy - rr(20, 90);
  const cp2x = fx * 0.4 + bx * 0.6;
  const cp2y = fy * 0.5 + by * 0.5;
  paths.push({ d: `M ${fx.toFixed(1)},${fy.toFixed(1)} C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`, sw: rr(0.5, 1.3).toFixed(1), op: rr(0.35, 0.65).toFixed(2) });
}

function lowerFiber(endX, endY) {
  const startX = spineX + rr(-35, 35);
  const startY = textBottom + rr(5, 30);
  const cp1x  = spineX + (endX - spineX) * rr(0.05, 0.25) + rr(-60, 60);
  const cp1y  = startY + (endY - startY) * rr(0.20, 0.40);
  const cp2x  = endX + (spineX - endX) * rr(0.10, 0.35) + rr(-40, 40);
  const cp2y  = endY - (endY - startY) * rr(0.20, 0.40);
  return {
    d: `M ${startX.toFixed(1)},${startY.toFixed(1)} C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${endX.toFixed(1)},${endY.toFixed(1)}`,
    sw: rr(0.7,2.0).toFixed(1), op: rr(0.45,0.90).toFixed(2)
  };
}

for (let i = 0; i < 52; i++) {
  const t = i / 51;
  paths.push(lowerFiber(W * (0.03 + 0.94 * t) + rr(-30, 30), H - rr(0, H * 0.18)));
}
for (let i = 0; i < 14; i++) paths.push(lowerFiber(rr(20, 220), H - rr(0, H * 0.25)));
for (let i = 0; i < 14; i++) paths.push(lowerFiber(rr(680, 880), H - rr(0, H * 0.25)));
for (let i = 0; i < 8; i++) {
  const ex = i < 4 ? rr(30, 180) : rr(720, 870);
  const p = lowerFiber(ex, H - rr(H * 0.05, H * 0.32));
  paths.push({ ...p, sw: rr(1.2, 2.5).toFixed(1), op: rr(0.28, 0.52).toFixed(2) });
}

// Lower branch fibers
for (let i = 0; i < 22; i++) {
  const ex = rr(80, 820);
  const ey = H - rr(5, H * 0.10);
  const fx = ex + (spineX - ex) * rr(0.5, 0.75) + rr(-40, 40);
  const fy = ey - (ey - textBottom) * rr(0.4, 0.65);
  const bx = spineX + rr(-55, 55);
  const by = textBottom + rr(10, 55);
  const cp1x = fx + rr(-30, 30);
  const cp1y = fy + rr(20, 90);
  const cp2x = fx * 0.4 + bx * 0.6;
  const cp2y = fy * 0.5 + by * 0.5;
  paths.push({ d: `M ${fx.toFixed(1)},${fy.toFixed(1)} C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`, sw: rr(0.5, 1.3).toFixed(1), op: rr(0.35, 0.65).toFixed(2) });
}

const pathEls = paths.map(p => `    <path d="${p.d}" stroke-width="${p.sw}" stroke-opacity="${p.op}"/>`).join('\n');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" version="1.1">
  <defs>
    <linearGradient id="fiberGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0%"    stop-color="#fcde9c"/>
      <stop offset="12%"   stop-color="#faa476"/>
      <stop offset="25%"   stop-color="#f0746e"/>
      <stop offset="38%"   stop-color="#e34f6f"/>
      <stop offset="50%"   stop-color="#dc3977"/>
      <stop offset="62%"   stop-color="#b9257a"/>
      <stop offset="74%"   stop-color="#7c1d6f"/>
      <stop offset="85%"   stop-color="#5b3ba8"/>
      <stop offset="93%"   stop-color="#3a5bd4"/>
      <stop offset="100%"  stop-color="#4a90d9"/>
    </linearGradient>
    <linearGradient id="letterGrad" gradientUnits="userSpaceOnUse" x1="0" y1="${textTop.toFixed(1)}" x2="0" y2="${textBottom.toFixed(1)}">
      <stop offset="0%"    stop-color="#fcde9c"/>
      <stop offset="16.6%" stop-color="#faa476"/>
      <stop offset="33.3%" stop-color="#f0746e"/>
      <stop offset="50%"   stop-color="#e34f6f"/>
      <stop offset="66.6%" stop-color="#dc3977"/>
      <stop offset="83.3%" stop-color="#b9257a"/>
      <stop offset="100%"  stop-color="#7c1d6f"/>
    </linearGradient>
    <linearGradient id="yearGrad" gradientUnits="userSpaceOnUse" x1="0" y1="${textTop.toFixed(1)}" x2="0" y2="${(textTop + textH * 0.41).toFixed(1)}">
      <stop offset="0%"    stop-color="#fcde9c"/>
      <stop offset="50%"   stop-color="#faa476"/>
      <stop offset="100%"  stop-color="#f0746e"/>
    </linearGradient>
    <clipPath id="noText">
      <path fill-rule="evenodd" d="M-10,-10 H${W+10} V${H+10} H-10 Z  M0,${textTop.toFixed(1)} H${W} V${textBottom.toFixed(1)} H0 Z"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="#f0eeeb"/>

  <g fill="none" stroke="url(#fiberGrad)" stroke-linecap="round" stroke-linejoin="round" clip-path="url(#noText)">
${pathEls}
  </g>

  <g transform="translate(0,${textTop.toFixed(1)}) scale(${scale.toFixed(3)})" fill="url(#letterGrad)" fill-rule="nonzero">
    <path d="M28.2,54.8h18v17.5c-1.8,0.9-3.8,1.5-5.8,1.8c-2.2,0.4-4.5,0.5-6.8,0.5c-3.6,0-7-0.6-10-1.9c-3-1.3-5.6-3.1-7.8-5.3c-2.1-2.2-3.9-4.9-5.1-8c-1.2-3.1-1.9-6.5-1.9-10.2c0-3.7,0.6-7.1,1.8-10.2c1.2-3.1,3-5.8,5.1-8.1c2.2-2.3,4.8-4.1,7.8-5.3c3-1.3,6.3-1.9,9.8-1.9c3.4,0,6.6,0.4,9.4,1.2c2.8,0.8,5.3,2.1,7.4,3.8l0.2,0.2h0.6v-9.2c-2.5-1.5-5.3-2.7-8.3-3.3c-3.2-0.7-6.3-1.1-9.4-1.1c-4.8,0-9.3,0.9-13.3,2.6C16,19.6,12.5,22,9.5,25c-3,3-5.3,6.6-7,10.7C0.8,39.8,0,44.3,0,49.2c0,4.9,0.8,9.5,2.5,13.6c1.7,4.1,4,7.7,7,10.7c3,3,6.5,5.4,10.6,7.1c4.1,1.7,8.6,2.6,13.4,2.6c4.1,0,8.1-0.6,11.7-1.7c3.7-1.1,6.7-2.6,9.2-4.4l0.3-0.2V46.4H28.2V54.8z"/>
    <polygon points="87.3,12.6 98.8,0.5 87.3,0.5 78.7,12.6"/>
    <polygon points="74.2,51.5 102.5,51.5 102.5,43.1 74.2,43.1 74.2,25.4 104.4,25.4 104.4,17 65.3,17 65.3,81.4 104.9,81.4 104.9,73 74.2,73"/>
    <path d="M168.1,25c-3-3-6.6-5.4-10.6-7.2c-4.1-1.7-8.5-2.6-13.2-2.6c-4.7,0-9.1,0.9-13.2,2.6c-4.1,1.7-7.6,4.1-10.6,7.2c-3,3-5.4,6.6-7.1,10.7c-1.7,4.1-2.6,8.6-2.6,13.3c0,4.9,0.9,9.4,2.6,13.5c1.7,4.1,4.1,7.7,7.1,10.7c3,3,6.6,5.4,10.6,7.2c4.1,1.7,8.5,2.6,13.2,2.6c4.7,0,9.1-0.9,13.2-2.6c4.1-1.7,7.6-4.1,10.6-7.2c3-3,5.4-6.6,7.1-10.7c1.7-4.1,2.6-8.7,2.6-13.5c0-4.7-0.9-9.2-2.6-13.3C173.5,31.7,171.1,28,168.1,25z M167,59c-1.3,3.1-3,5.9-5.2,8.2c-2.2,2.3-4.8,4.1-7.8,5.5c-3,1.3-6.2,2-9.7,2c-3.5,0-6.8-0.7-9.7-2c-3-1.3-5.6-3.2-7.8-5.5c-2.2-2.3-3.9-5-5.2-8.2c-1.3-3.1-1.9-6.4-1.9-9.9c0-3.5,0.6-6.8,1.9-9.9c1.3-3.1,3-5.8,5.2-8.1c2.2-2.3,4.8-4.1,7.8-5.4c3-1.3,6.3-2,9.7-2c3.5,0,6.7,0.7,9.7,2c3,1.3,5.6,3.2,7.8,5.4c2.2,2.3,4,5,5.2,8.1c1.3,3.1,1.9,6.4,1.9,9.9C168.9,52.6,168.3,55.9,167,59z"/>
    <polygon points="237.7,17 218.9,17 213.9,61.6 213.6,61.6 203.7,17 183.7,17 187.9,28.8 183.9,81.4 196.8,81.4 191.7,34.2 192,34.2 203.5,81.4 215.5,81.4 224.8,34.2 225.1,34.2 222.2,81.4 240.8,81.4 237.7,67.1"/>
    <polygon points="248.4,33 262,25 262,81.4 279.6,81.4 276.5,67.1 276.5,25 290.2,33 290.2,17 248.4,17"/>
    <polygon points="315.3,17 297.8,17 300.8,31.3 300.8,81.4 331.1,81.4 333.3,64.8 315.3,73.2"/>
  </g>

  <g transform="translate(0,${textTop.toFixed(1)}) scale(${scale.toFixed(3)})" fill="url(#yearGrad)" fill-rule="nonzero">
    <path d="M349.3,21.2v4.2h-16.1V22l8.6-9.7c1.2-1.3,2.4-2.7,2.4-4.5c0-2.3-1.7-3.6-4.4-3.6c-2.6,0-4.9,1.5-6,2.9h-0.4V2.5c1.1-1.1,3.7-2.5,7.1-2.5c4.8,0,8.5,2.9,8.5,7.2c0,3.3-1.9,5.5-3.5,7.4l-2.7,3.1c-1.5,1.7-2.4,2.5-3.3,3.5H349.3z"/>
    <path d="M352.2,12.9c0-7.3,3.9-12.9,9.7-12.9c5.9,0,9.7,5.6,9.7,12.9c0,7.6-3.3,13-9.7,13S352.2,20.6,352.2,12.9z M357.1,12.9c0,4.4,1.4,8.7,4.9,8.7c3.7,0,4.9-4.3,4.9-8.7c0-4.8-1.6-8.6-4.9-8.6C358.8,4.3,357.1,8.2,357.1,12.9z"/>
    <path d="M390.7,21.2v4.2h-16.1V22l8.6-9.7c1.2-1.3,2.4-2.7,2.4-4.5c0-2.3-1.7-3.6-4.4-3.6c-2.6,0-4.9,1.5-6,2.9h-0.4V2.5c1.1-1.1,3.7-2.5,7.1-2.5c4.8,0,8.5,2.9,8.5,7.2c0,3.3-1.9,5.5-3.5,7.4l-2.7,3.1c-1.5,1.7-2.4,2.5-3.3,3.5H390.7z"/>
    <path d="M393.8,0.5H408.6V4.0L400.2,25.4H395.5L403.9,4.0H393.8Z"/>
  </g>
</svg>`;

fs.writeFileSync('c:/Users/cglogowski/geomtl/logo/GeoMtl2027_neural.svg', svg, 'utf-8');
console.log('Done —', Math.round(svg.length/1024), 'KB,', paths.length, 'fibres');
console.log('textTop=', textTop.toFixed(0), 'textBottom=', textBottom.toFixed(0), 'scale=', scale.toFixed(3));
