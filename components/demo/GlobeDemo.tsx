'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Hero from '@/components/home/Hero';
import { IDEES, REGLAGES_GLOBE, type IdeaKey, type IdeeGlobe } from '@/components/home/GlobeTrame';
import { COULEURS_CHARTE, OLIVE, couleurGlobe, couleurPoint, hexToHsl, hslToRgb, toHex, type CouleursGlobe } from '@/lib/globe-couleurs';
import { cn } from '@/lib/utils';

const NOMS: Record<IdeaKey, string> = {
  rotation: 'Rotation',
  pulsations: 'Pulsations',
  reseau: 'Système nerveux',
  couleurs: 'Couleurs vivantes',
};
const PRESETS_POINTS: { nom: string; teinte: number; lum: number }[] = [
  { nom: 'Olive (charte)', teinte: 85, lum: 0 },
  { nom: 'Encre', teinte: 60, lum: -28 },
  { nom: 'Pétrole', teinte: 190, lum: -4 },
  { nom: 'Prune', teinte: 300, lum: -4 },
  { nom: 'Brique', teinte: 12, lum: 0 },
];
const PRESETS_GLOBE: { nom: string; teinte: number; sat: number }[] = [
  { nom: 'Charte', teinte: 0, sat: 100 },
  { nom: 'Océan', teinte: 40, sat: 100 },
  { nom: 'Aurore', teinte: 140, sat: 90 },
  { nom: 'Crépuscule', teinte: -110, sat: 95 },
  { nom: 'Brume', teinte: 0, sat: 35 },
];
const TEINTES_GLOBE = ['#20FEFD', '#01CDA5', '#1BC868', '#D0DC00'];
const CLE_STOCKAGE = 'geomtl-globe-couleurs';
const [OLIVE_H, OLIVE_S, OLIVE_L] = hexToHsl(OLIVE);
const ROUE = [0, 60, 120, 180, 240, 300, 360];
const signe = (v: number) => (v > 0 ? '+' : '') + v;

function Choix<T extends string | number>({ label, options, valeur, onChange }: {
  label: string;
  options: { v: T; nom: string }[];
  valeur: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-geo-ink-soft">{label}</span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={String(o.v)}
            type="button"
            aria-pressed={o.v === valeur}
            onClick={() => onChange(o.v)}
            className={cn(
              'rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
              o.v === valeur ? 'border-geo-ink bg-geo-ink text-geo-cream' : 'border-geo-ink/15 bg-white/60 text-geo-ink hover:border-geo-ink/40'
            )}
          >
            {o.nom}
          </button>
        ))}
      </div>
    </div>
  );
}

function Curseur({ id, label, min, max, valeur, sortie, piste, onChange }: {
  id: string;
  label: string;
  min: number;
  max: number;
  valeur: number;
  sortie: string;
  piste: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="grid grid-cols-[76px_minmax(0,1fr)_48px] items-center gap-3">
      <label htmlFor={id} className="text-xs text-geo-ink-soft">{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={valeur}
        onChange={(e) => onChange(Number(e.target.value))}
        className="globe-range"
        style={{ '--track': piste } as CSSProperties}
      />
      <output htmlFor={id} className="text-right text-xs tabular-nums">{sortie}</output>
    </div>
  );
}

export default function GlobeDemo() {
  const [idee, setIdee] = useState<IdeeGlobe>('enchainement');
  const [ideeCourante, setIdeeCourante] = useState<IdeaKey>('rotation');
  const [vitesseTerre, setVitesseTerre] = useState(REGLAGES_GLOBE.vitesseTerre);
  const [vitesseSatellites, setVitesseSatellites] = useState(REGLAGES_GLOBE.vitesseSatellites);
  const [couleurs, setCouleurs] = useState<CouleursGlobe>(COULEURS_CHARTE);
  const [pause, setPause] = useState(false);
  const [fond, setFond] = useState<'creme' | 'encre'>('creme');
  const [masquerTexte, setMasquerTexte] = useState(false);
  const [ouvert, setOuvert] = useState(true);
  const [reduit, setReduit] = useState(false);
  const [forcer, setForcer] = useState(false);
  const [copie, setCopie] = useState('Copier les valeurs');

  useEffect(() => {
    setReduit(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    // Sur mobile, le panneau démarre replié pour laisser voir le globe.
    if (window.matchMedia('(max-width: 639px)').matches) setOuvert(false);
    try {
      const sauvegarde = JSON.parse(localStorage.getItem(CLE_STOCKAGE) || 'null');
      if (sauvegarde) setCouleurs({ ...COULEURS_CHARTE, ...sauvegarde });
    } catch {
      /* stockage indisponible */
    }
  }, []);

  const changerCouleurs = (partiel: Partial<CouleursGlobe>) => {
    setCouleurs((c) => {
      const suivant = { ...c, ...partiel };
      try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify(suivant)); } catch { /* stockage indisponible */ }
      return suivant;
    });
  };

  const reglages = useMemo(
    () => ({ idee, vitesseTerre, vitesseSatellites, couleurs, pause, forcerAnimation: forcer }),
    [idee, vitesseTerre, vitesseSatellites, couleurs, pause, forcer]
  );

  const pointHex = toHex(couleurPoint(OLIVE, couleurs));
  const S = Math.round(OLIVE_S * 100);
  const L = Math.round(Math.min(1, Math.max(0, OLIVE_L + couleurs.pointsLuminosite / 100)) * 100);
  const valeurs = `Points ${pointHex} (teinte ${couleurs.pointsTeinte}°, luminosité ${signe(couleurs.pointsLuminosite)}) · Globe : teinte ${signe(couleurs.globeTeinte)}°, saturation ${couleurs.globeSaturation} %`;
  const enCours = idee === 'enchainement'
    ? `Enchaînement : ${IDEES.indexOf(ideeCourante) + 1}/4 · ${NOMS[ideeCourante]}`
    : `Idée : ${NOMS[idee]}`;

  const copier = () => {
    const fait = (msg: string) => { setCopie(msg); setTimeout(() => setCopie('Copier les valeurs'), 1600); };
    const selectionner = () => {
      const el = document.getElementById('demo-valeurs');
      const sel = window.getSelection();
      if (el && sel) { const r = document.createRange(); r.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(r); }
      fait('Texte sélectionné');
    };
    try { navigator.clipboard.writeText(valeurs).then(() => fait('Copié'), selectionner); } catch { selectionner(); }
  };

  return (
    <>
      <Hero reglages={reglages} onIdee={setIdeeCourante} fond={fond} masquerTexte={masquerTexte} />

      <aside
        aria-label="Réglages du globe"
        className="fixed inset-x-3 bottom-3 z-40 max-h-[55svh] overflow-y-auto rounded-xl border border-geo-ink/15 bg-geo-cream/95 text-geo-ink shadow-card-2027 backdrop-blur sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[380px] sm:max-h-[calc(100svh-7rem)]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-geo-ink/10 bg-geo-cream/95 px-4 py-3">
          <div className="min-w-0">
            <p className="font-display text-sm font-bold">Démo · Globe animé</p>
            <p className="truncate text-xs text-geo-ink-soft" aria-live="polite">{enCours}</p>
          </div>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="demo-reglages"
            onClick={() => setOuvert((o) => !o)}
            className="rounded-md border border-geo-ink/15 px-2.5 py-1.5 text-xs font-semibold hover:border-geo-ink/40"
          >
            {ouvert ? 'Réduire' : 'Réglages'}
          </button>
        </div>

        <div id="demo-reglages" className={cn('grid gap-5 px-4 py-4', !ouvert && 'hidden')}>
          {reduit && !forcer && (
            <div className="grid gap-2 rounded-lg bg-geo-cream-dark p-3 text-xs">
              <p>Votre système demande de réduire les animations : le globe est affiché fixe.</p>
              <button type="button" onClick={() => setForcer(true)} className="justify-self-start rounded-md bg-geo-ink px-3 py-1.5 font-semibold text-geo-cream">
                Lancer l&apos;animation quand même
              </button>
            </div>
          )}

          <Choix<IdeeGlobe>
            label="Idée"
            valeur={idee}
            onChange={setIdee}
            options={[{ v: 'enchainement', nom: 'Enchaînement' }, ...IDEES.map((k) => ({ v: k as IdeeGlobe, nom: NOMS[k] }))]}
          />
          <Choix<number> label="Vitesse de la Terre" valeur={vitesseTerre} onChange={setVitesseTerre} options={[{ v: 0.5, nom: 'Lente' }, { v: 1, nom: 'Normale' }, { v: 2.5, nom: 'Rapide' }]} />
          <Choix<number> label="Vitesse des satellites" valeur={vitesseSatellites} onChange={setVitesseSatellites} options={[{ v: 0.5, nom: 'Lente' }, { v: 1, nom: 'Normale' }, { v: 2, nom: 'Rapide' }]} />
          <div className="grid grid-cols-2 gap-4">
            <Choix<'creme' | 'encre'> label="Fond" valeur={fond} onChange={setFond} options={[{ v: 'creme', nom: 'Crème' }, { v: 'encre', nom: 'Encre' }]} />
            <Choix<string> label="Texte du hero" valeur={masquerTexte ? 'non' : 'oui'} onChange={(v) => setMasquerTexte(v === 'non')} options={[{ v: 'oui', nom: 'Affiché' }, { v: 'non', nom: 'Masqué' }]} />
          </div>
          <button
            type="button"
            aria-pressed={pause}
            onClick={() => setPause((p) => !p)}
            className="justify-self-start rounded-md bg-geo-ink px-3 py-1.5 text-xs font-semibold text-geo-cream"
          >
            {pause ? 'Reprendre' : 'Pause'}
          </button>

          <section aria-labelledby="demo-points" className="grid gap-3 border-t border-geo-ink/10 pt-4">
            <h2 id="demo-points" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-geo-ink-soft">
              <span className="h-4 w-4 rounded-full border border-geo-ink/15" style={{ background: pointHex }} /> Couleur des points
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS_POINTS.map((p) => {
                const actif = p.teinte === couleurs.pointsTeinte && p.lum === couleurs.pointsLuminosite;
                return (
                  <button key={p.nom} type="button" aria-pressed={actif} onClick={() => changerCouleurs({ pointsTeinte: p.teinte, pointsLuminosite: p.lum })}
                    className={cn('inline-flex items-center gap-1.5 rounded-full border py-1 pl-1 pr-2.5 text-xs', actif ? 'border-geo-ink ring-1 ring-geo-ink' : 'border-geo-ink/15 bg-white/60')}>
                    <span className="h-4 w-4 rounded-full border border-geo-ink/15" style={{ background: toHex(hslToRgb(p.teinte, OLIVE_S, Math.min(1, Math.max(0, OLIVE_L + p.lum / 100)))) }} />
                    {p.nom}
                  </button>
                );
              })}
            </div>
            <Curseur id="demo-points-teinte" label="Teinte" min={0} max={360} valeur={couleurs.pointsTeinte} sortie={`${couleurs.pointsTeinte}°`}
              piste={`linear-gradient(90deg, ${ROUE.map((h) => `hsl(${h} ${S}% ${L}%)`).join(', ')})`}
              onChange={(v) => changerCouleurs({ pointsTeinte: v })} />
            <Curseur id="demo-points-lum" label="Luminosité" min={-30} max={20} valeur={couleurs.pointsLuminosite} sortie={signe(couleurs.pointsLuminosite)}
              piste={`linear-gradient(90deg, hsl(${couleurs.pointsTeinte} ${S}% ${Math.round((OLIVE_L - 0.3) * 100)}%), hsl(${couleurs.pointsTeinte} ${S}% ${Math.round((OLIVE_L + 0.2) * 100)}%))`}
              onChange={(v) => changerCouleurs({ pointsLuminosite: v })} />
          </section>

          <section aria-labelledby="demo-globe" className="grid gap-3 border-t border-geo-ink/10 pt-4">
            <h2 id="demo-globe" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-geo-ink-soft">
              <span className="h-4 w-8 rounded border border-geo-ink/15" style={{ background: `linear-gradient(90deg, ${TEINTES_GLOBE.map((c) => couleurGlobe(c, couleurs.globeTeinte, couleurs.globeSaturation)).join(', ')})` }} /> Couleur du globe diffus
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS_GLOBE.map((p) => {
                const actif = p.teinte === couleurs.globeTeinte && p.sat === couleurs.globeSaturation;
                return (
                  <button key={p.nom} type="button" aria-pressed={actif} onClick={() => changerCouleurs({ globeTeinte: p.teinte, globeSaturation: p.sat })}
                    className={cn('inline-flex items-center gap-1.5 rounded-full border py-1 pl-1 pr-2.5 text-xs', actif ? 'border-geo-ink ring-1 ring-geo-ink' : 'border-geo-ink/15 bg-white/60')}>
                    <span className="h-4 w-4 rounded-full border border-geo-ink/15" style={{ background: `linear-gradient(90deg, ${TEINTES_GLOBE.map((c) => couleurGlobe(c, p.teinte, p.sat)).join(', ')})` }} />
                    {p.nom}
                  </button>
                );
              })}
            </div>
            <Curseur id="demo-globe-teinte" label="Teinte" min={-180} max={180} valeur={couleurs.globeTeinte} sortie={`${signe(couleurs.globeTeinte)}°`}
              piste={`linear-gradient(90deg, ${ROUE.map((h) => `hsl(${h} 90% 55%)`).join(', ')})`}
              onChange={(v) => changerCouleurs({ globeTeinte: v })} />
            <Curseur id="demo-globe-sat" label="Saturation" min={0} max={150} valeur={couleurs.globeSaturation} sortie={`${couleurs.globeSaturation} %`}
              piste={`linear-gradient(90deg, hsl(${(180 + couleurs.globeTeinte + 360) % 360} 0% 62%), hsl(${(180 + couleurs.globeTeinte + 360) % 360} 95% 55%))`}
              onChange={(v) => changerCouleurs({ globeSaturation: v })} />
          </section>

          <div className="grid gap-2 border-t border-geo-ink/10 pt-4">
            <code id="demo-valeurs" className="rounded-md bg-geo-cream-dark px-2.5 py-2 font-mono text-[11px] leading-relaxed [overflow-wrap:anywhere]">{valeurs}</code>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={copier} className="rounded-md bg-geo-ink px-3 py-1.5 text-xs font-semibold text-geo-cream">{copie}</button>
              <button type="button" onClick={() => changerCouleurs(COULEURS_CHARTE)} className="rounded-md border border-geo-ink/15 px-3 py-1.5 text-xs font-semibold hover:border-geo-ink/40">
                Revenir à la charte
              </button>
            </div>
            <p className="text-[11px] leading-relaxed text-geo-ink-soft">
              Pour appliquer ces couleurs à l&apos;accueil, reporter les valeurs dans <code>REGLAGES_GLOBE.couleurs</code> (components/home/GlobeTrame.tsx).
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
