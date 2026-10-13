// Étape 1 : capture le globe de la charte en vue fixe, sur fond transparent,
// cadré sur tout le visuel (3600 x 2202, soit 1800 x 1101 px).
//
// Prérequis : le serveur de développement tourne sur http://localhost:3000
// (SITE_PUBLIC=true npm run dev), et Playwright est installé
// (npm i --no-save playwright sharp && npx playwright install chromium).
// Usage : node scripts/cartes/1_capturer.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TRAVAIL = path.join(__dirname, '.travail');
const URL_DEMO = process.env.URL_DEMO || 'http://localhost:3000/fr/demo';

(async () => {
  fs.mkdirSync(TRAVAIL, { recursive: true });
  const browser = await chromium.launch();
  // Mouvement réduit : le moteur dessine une vue fixe, complète et reproductible
  const ctx = await browser.newContext({ viewport: { width: 1800, height: 1300 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => {
    localStorage.removeItem('geomtl-globe-couleurs'); // couleurs de la charte
    localStorage.setItem('geomtl-theme', 'clair');
  });
  const page = await ctx.newPage();
  await page.goto(URL_DEMO, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  // Le canvas suit sa taille d'affichage (ResizeObserver) : on lui donne celle du visuel
  await page.evaluate(() => {
    const c = document.querySelector('canvas');
    Object.assign(c.style, { position: 'fixed', top: '0px', left: '0px', right: 'auto', bottom: 'auto', width: '1800px', height: '1101px' });
  });
  await page.waitForTimeout(1500);
  const png = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/png'));
  const sortie = path.join(TRAVAIL, 'globe-charte.png');
  fs.writeFileSync(sortie, Buffer.from(png.split(',')[1], 'base64'));
  console.log('Capture :', sortie);
  await browser.close();
})();
