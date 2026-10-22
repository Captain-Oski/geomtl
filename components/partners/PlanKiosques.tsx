'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { RESERVATIONS_APERCU, RESERVATIONS_KIOSQUES, type ReservationKiosque } from '@/data/kiosques';
import { cn } from '@/lib/utils';

// Plan interactif du salon des exposants, d'après le plan du comité (salle
// agrandie). Les kiosques sont dessinés ouverts côté allée, comme sur ce plan,
// pour montrer leur orientation. Chaque kiosque affiche « Disponible », ou
// « Indisponible » avec le logo de l'organisation qui l'a réservé
// (data/kiosques.ts). Un clic sur un kiosque en affiche le détail.
// Coordonnées : celles du plan du comité, multipliées par 10.

type Ouverture = 'haut' | 'bas';
type Kiosque = { numero: number; x: number; y: number; l: number; h: number; ouvert: Ouverture };

const SALLE = { x0: 55, y0: 110, x1: 3518, y1: 2325 };

const RANGEE_HAUT = [[1, 100], [2, 395], [3, 690], [4, 980], [5, 1580], [6, 1865], [7, 2220], [8, 2520], [9, 3125]];
const RANGEE_BAS = [[18, 375], [19, 660], [20, 955], [21, 1240], [22, 1530], [23, 1830], [24, 2115], [25, 2410], [26, 2705]];
// Îlots : kiosques du haut ouverts vers le haut, kiosques du bas vers le bas, dos à dos
const ILOTS = [
  [10, 490, 920, 'haut'], [11, 780, 920, 'haut'], [14, 490, 1200, 'bas'], [15, 780, 1200, 'bas'],
  [12, 2225, 920, 'haut'], [13, 2510, 920, 'haut'], [16, 2225, 1200, 'bas'], [17, 2510, 1200, 'bas'],
] as const;

const KIOSQUES: Kiosque[] = [
  ...RANGEE_HAUT.map(([numero, x]) => ({ numero, x, y: SALLE.y0, l: 245, h: 265, ouvert: 'bas' as const })),
  ...ILOTS.map(([numero, x, y, ouvert]) => ({ numero, x, y, l: 245, h: 280, ouvert })),
  ...RANGEE_BAS.map(([numero, x]) => ({ numero, x, y: SALLE.y1 - 265, l: 245, h: 265, ouvert: 'haut' as const })),
].sort((a, b) => a.numero - b.numero);

// Portes doubles : [mur, début, fin] ; elles s'ouvrent vers l'extérieur
const PORTES: ['gauche' | 'haut' | 'droite', number, number][] = [
  ['gauche', 440, 750], ['gauche', 1590, 1860],
  ['haut', 1300, 1490], ['haut', 2870, 3060],
  ['droite', 540, 710], ['droite', 1600, 1760],
];

// Tables (rectangles coupés en segments) et tables rondes de la pause-café
const TABLES: { x: number; y: number; l: number; h: number; segments: number }[] = [
  { x: 380, y: 1010, l: 80, h: 360, segments: 2 },
  { x: 1070, y: 1030, l: 75, h: 350, segments: 2 },
  { x: 2105, y: 1025, l: 80, h: 350, segments: 2 },
  { x: 3130, y: 970, l: 80, h: 520, segments: 3 },
  { x: 3290, y: 970, l: 85, h: 520, segments: 3 },
];
const TABLES_RONDES = [[3255, 770], [3255, 1710]];

// Cloisons de la salle, en pointillés comme sur le plan du comité
const CLOISONS = [
  'M55 1130 H380', 'M1145 1130 H2105', 'M2755 1130 H3518',
  'M1205 375 V1130', 'M2367 375 V920',
];

function murs() {
  const parMur: Record<string, [number, number][]> = { gauche: [], haut: [], droite: [] };
  PORTES.forEach(([mur, a, b]) => parMur[mur].push([a, b]));
  const segments = (debut: number, fin: number, trous: [number, number][]) => {
    const morceaux: [number, number][] = [];
    let curseur = debut;
    [...trous].sort((p, q) => p[0] - q[0]).forEach(([a, b]) => { morceaux.push([curseur, a]); curseur = b; });
    morceaux.push([curseur, fin]);
    return morceaux;
  };
  const { x0, y0, x1, y1 } = SALLE;
  return [
    ...segments(y0, y1, parMur.gauche).map(([a, b]) => `M${x0} ${a} V${b}`),
    ...segments(x0, x1, parMur.haut).map(([a, b]) => `M${a} ${y0} H${b}`),
    ...segments(y0, y1, parMur.droite).map(([a, b]) => `M${x1} ${a} V${b}`),
    `M${x0} ${y1} H${x1}`,
  ].join(' ');
}

// Battants et arcs d'une porte double ; sens de l'arc calculé par produit vectoriel
function porte([mur, a, b]: (typeof PORTES)[number]) {
  const m = (a + b) / 2;
  const L = (b - a) / 2;
  const vertical = mur !== 'haut';
  const paroi = mur === 'gauche' ? SALLE.x0 : mur === 'droite' ? SALLE.x1 : SALLE.y0;
  const s = mur === 'droite' ? 1 : -1;
  const pt = (le: number, t: number) => (vertical ? [paroi + t, le] : [le, paroi + t]);
  return [a, b].map((charniere) => {
    const [cx, cy] = pt(charniere, 0);
    const [ox, oy] = pt(charniere, s * L); // battant ouvert
    const [fx, fy] = pt(m, 0); // battant fermé
    const balayage = (fx - cx) * (oy - cy) - (fy - cy) * (ox - cx) > 0 ? 1 : 0;
    return `M${cx} ${cy} L${ox} ${oy} M${fx} ${fy} A${L} ${L} 0 0 ${balayage} ${ox} ${oy}`;
  }).join(' ');
}

// Murs d'un kiosque : trois côtés, le côté ouvert donnant sur l'allée
function contour(k: Kiosque) {
  const x1 = k.x + k.l, y1 = k.y + k.h;
  return k.ouvert === 'bas'
    ? `M${k.x} ${y1} V${k.y} H${x1} V${y1}`
    : `M${k.x} ${k.y} V${y1} H${x1} V${k.y}`;
}

// Nom de l'organisation sur deux lignes au plus, quand il n'y a pas de logo
function lignes(nom: string, max = 14) {
  const mots = nom.split(' ');
  const out: string[] = [''];
  for (const mot of mots) {
    const courant = out[out.length - 1];
    if (!courant || (courant + ' ' + mot).length <= max) out[out.length - 1] = courant ? `${courant} ${mot}` : mot;
    else if (out.length < 2) out.push(mot);
    else { out[1] = `${out[1].slice(0, max - 1)}…`; break; }
  }
  return out;
}

export default function PlanKiosques({ fr, onReserver }: { fr: boolean; onReserver?: (numero: number) => void }) {
  const [reservations, setReservations] = useState(RESERVATIONS_KIOSQUES);
  const [apercu, setApercu] = useState(false);
  const [choisi, setChoisi] = useState<number | null>(null);
  const [survol, setSurvol] = useState<number | null>(null);

  // Aperçu des réservations fictives : serveur de développement seulement
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && new URLSearchParams(window.location.search).has('apercu-kiosques')) {
      setReservations({ ...RESERVATIONS_APERCU, ...RESERVATIONS_KIOSQUES });
      setApercu(true);
    }
  }, []);

  const reservation = (n: number): ReservationKiosque | undefined => reservations[n];
  const disponibles = KIOSQUES.filter((k) => !reservation(k.numero)).length;
  const libelle = (pris: boolean) => (pris ? (fr ? 'Indisponible' : 'Unavailable') : (fr ? 'Disponible' : 'Available'));
  const detail = choisi !== null ? reservation(choisi) : undefined;

  return (
    <div>
      {apercu && (
        <p className="mb-3 rounded-lg border border-dashed border-geo-ink/30 px-3 py-2 text-xs text-geo-ink-soft">
          {fr
            ? 'Aperçu local : réservations fictives pour vérifier le rendu. Elles ne s\'affichent jamais en production.'
            : 'Local preview: sample bookings to check the layout. They never appear in production.'}
        </p>
      )}

      {/* Sur mobile, le plan garde une taille lisible et défile horizontalement */}
      <div className="overflow-x-auto rounded-xl border border-geo-ink/10 bg-geo-cream">
        <svg
          viewBox="-120 0 3750 2345"
          role="group"
          aria-labelledby="plan-kiosques-titre"
          aria-describedby="plan-kiosques-desc"
          className="block h-auto w-full min-w-[760px] select-none"
        >
          <title id="plan-kiosques-titre">{fr ? 'Plan du salon des exposants' : 'Exhibition hall floor plan'}</title>
          <desc id="plan-kiosques-desc">
            {fr
              ? '26 kiosques ouverts sur les allées : 1 à 9 le long du mur du haut, 18 à 26 le long du mur du bas, et deux îlots de quatre kiosques dos à dos (10, 11, 14, 15 à gauche ; 12, 13, 16, 17 à droite). Au centre, l\'Espace café avec le barista et deux vélos café ; la pause-café est à droite. Chaque kiosque est un bouton qui indique s\'il est disponible.'
              : '26 booths open onto the aisles: 1 to 9 along the top wall, 18 to 26 along the bottom wall, and two islands of four back-to-back booths (10, 11, 14, 15 on the left; 12, 13, 16, 17 on the right). In the centre, the Café Space with the barista and two coffee bikes; the coffee break area is on the right. Each booth is a button that tells whether it is available.'}
          </desc>

          {/* Salle */}
          <rect x={SALLE.x0} y={SALLE.y0} width={SALLE.x1 - SALLE.x0} height={SALLE.y1 - SALLE.y0} className="fill-geo-cream-dark/50" />
          <path d={murs()} fill="none" strokeWidth="9" strokeLinecap="square" className="stroke-geo-ink/50" />
          {PORTES.map((p) => (
            <path key={`${p[0]}-${p[1]}`} d={porte(p)} fill="none" strokeWidth="4" className="stroke-geo-ink/35" />
          ))}
          {CLOISONS.map((d) => (
            <path key={d} d={d} fill="none" strokeWidth="4" strokeDasharray="22 16" className="stroke-geo-ink/20" />
          ))}

          {/* Espace café : barista et deux vélos café */}
          <rect x="1230" y="1190" width="790" height="280" rx="70" className="fill-geo-ink/[0.04]" />
          <text x="1625" y="1300" textAnchor="middle" fontSize="64" fontWeight="700" className="font-display fill-geo-ink">
            {fr ? 'Espace café' : 'Café Space'}
          </text>
          <text x="1625" y="1385" textAnchor="middle" fontSize="38" fontWeight="600" className="fill-geo-ink-soft">
            {fr ? 'Barista · 2 vélos café' : 'Barista · 2 coffee bikes'}
          </text>

          {/* Tables et pause-café */}
          {TABLES.map((t) => (
            <g key={`${t.x}-${t.y}`}>
              {Array.from({ length: t.segments }, (_, i) => (
                <rect key={i} x={t.x} y={t.y + (i * t.h) / t.segments} width={t.l} height={t.h / t.segments} strokeWidth="4" className="fill-geo-cream stroke-geo-ink/40" />
              ))}
            </g>
          ))}
          {TABLES_RONDES.map(([cx, cy]) => (
            <circle key={cy} cx={cx} cy={cy} r="90" strokeWidth="4" className="fill-geo-cream stroke-geo-ink/40" />
          ))}
          <text transform="translate(3075 1230) rotate(90)" textAnchor="middle" fontSize="44" fontWeight="700" className="fill-geo-ink">
            {fr ? 'Pause-café' : 'Coffee break'}
          </text>

          {/* Kiosques */}
          {KIOSQUES.map((k) => {
            const r = reservation(k.numero);
            const pris = Boolean(r);
            const actif = choisi === k.numero;
            const cx = k.x + k.l / 2;
            const cy = k.y + k.h / 2;
            const choisir = () => setChoisi(actif ? null : k.numero);
            return (
              <g
                key={k.numero}
                role="button"
                tabIndex={0}
                aria-pressed={actif}
                aria-label={`${fr ? 'Kiosque' : 'Booth'} ${k.numero}, ${libelle(pris).toLowerCase()}${r ? `, ${r.organisation}` : ''}`}
                onClick={choisir}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choisir(); } }}
                onMouseEnter={() => setSurvol(k.numero)}
                onMouseLeave={() => setSurvol(null)}
                onFocus={() => setSurvol(k.numero)}
                onBlur={() => setSurvol(null)}
                className="cursor-pointer outline-none"
              >
                <rect
                  x={k.x}
                  y={k.y}
                  width={k.l}
                  height={k.h}
                  className={cn(
                    'transition-colors',
                    actif ? 'fill-geo-teal/25' : survol === k.numero ? 'fill-geo-teal/10' : pris ? 'fill-geo-cream-dark' : 'fill-geo-cream'
                  )}
                />
                <path
                  d={contour(k)}
                  fill="none"
                  strokeWidth={actif || survol === k.numero ? 10 : 6}
                  className={actif || survol === k.numero ? 'stroke-geo-teal-dark' : 'stroke-geo-ink/60'}
                />
                {pris && r ? (
                  <>
                    <text x={k.x + 22} y={k.y + 46} fontSize="36" fontWeight="700" className="font-display fill-geo-ink">{k.numero}</text>
                    {r.logo ? (
                      <image href={r.logo} x={k.x + 25} y={cy - 55} width={k.l - 50} height={95} preserveAspectRatio="xMidYMid meet" />
                    ) : (
                      lignes(r.organisation).map((ligne, i, tout) => (
                        <text key={i} x={cx} y={cy - 5 + (i - (tout.length - 1) / 2) * 34} textAnchor="middle" dominantBaseline="central" fontSize="28" fontWeight="600" className="fill-geo-ink">{ligne}</text>
                      ))
                    )}
                    <text x={cx} y={k.y + k.h - 28} textAnchor="middle" fontSize="28" fontWeight="600" className="fill-geo-ink-soft">{libelle(true)}</text>
                  </>
                ) : (
                  <>
                    <text x={cx} y={cy - 18} textAnchor="middle" dominantBaseline="central" fontSize="68" fontWeight="700" className="font-display fill-geo-ink">{k.numero}</text>
                    <text x={cx} y={cy + 55} textAnchor="middle" dominantBaseline="central" fontSize="32" fontWeight="600" className="fill-geo-teal-dark">{libelle(false)}</text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Légende et compte */}
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-geo-ink-soft">
        <span className="flex items-center gap-2">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4"><path d="M2 14V2h12v12" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          {fr ? 'Kiosque de 10 pi × 10 pi, ouvert sur l\'allée' : '10 ft × 10 ft booth, open onto the aisle'}
        </span>
        <span className="flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-geo-teal-dark" />{libelle(false)}</span>
        <span className="flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-geo-ink/40" />{libelle(true)}</span>
        <span className="font-semibold text-geo-ink">
          {fr ? `${disponibles} kiosques disponibles sur ${KIOSQUES.length}` : `${disponibles} of ${KIOSQUES.length} booths available`}
        </span>
        <span className="sm:hidden">{fr ? 'Faites glisser pour voir tout le plan.' : 'Swipe to see the whole plan.'}</span>
      </div>

      {/* Détail du kiosque choisi */}
      <div aria-live="polite" className="mt-4 rounded-xl border border-geo-ink/10 bg-geo-cream p-4 sm:p-5">
        {choisi === null ? (
          <p className="text-sm text-geo-ink-soft">
            {fr ? 'Choisissez un kiosque sur le plan pour voir s\'il est disponible.' : 'Select a booth on the plan to see whether it is available.'}
          </p>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <p className="font-display text-2xl font-bold text-geo-ink">{fr ? 'Kiosque' : 'Booth'} {choisi}</p>
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 text-xs font-semibold',
                  detail ? 'bg-geo-ink/10 text-geo-ink-soft' : 'bg-geo-teal/15 text-geo-teal-dark'
                )}
              >
                {libelle(Boolean(detail))}
              </span>
            </div>
            {detail ? (
              <div className="flex flex-1 items-center gap-4 sm:justify-end">
                {detail.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={detail.logo} alt={`${fr ? 'Logo de' : 'Logo of'} ${detail.organisation}`} className="h-10 w-auto max-w-[140px] object-contain" />
                )}
                <div className="text-sm">
                  <p className="font-semibold text-geo-ink">{detail.organisation}</p>
                  {detail.site && (
                    <a href={detail.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-geo-teal-dark hover:underline">
                      {detail.site.replace(/^https?:\/\//, '')}
                      <ArrowUpRight size={14} weight="light" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <p className="text-sm text-geo-ink-soft">
                  {fr ? 'Ce kiosque est libre. Écrivez-nous pour le réserver.' : 'This booth is free. Write to us to book it.'}
                </p>
                {onReserver && (
                  <button
                    type="button"
                    onClick={() => onReserver(choisi)}
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-geo-ink px-4 py-2 text-sm font-semibold text-geo-cream hover:bg-geo-ink/85 transition-colors"
                  >
                    {fr ? 'Réserver ce kiosque' : 'Book this booth'}
                    <ArrowRight size={16} weight="light" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
