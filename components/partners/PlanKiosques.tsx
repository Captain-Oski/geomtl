import { Coffee } from '@phosphor-icons/react/dist/ssr/Coffee';
import { Drop } from '@phosphor-icons/react/dist/ssr/Drop';

// Plan du salon des exposants (Centre de congrès de Saint-Hyacinthe), redessiné
// en vectoriel d'après le plan préliminaire (public/kiosques.webp). Tout est en
// style neutre et suit le thème (clair / sombre) : le plan n'indique pas quels
// kiosques sont pris. Au centre, le lounge café, aux couleurs d'un partenaire
// Bronze chaque demi-journée (écrans, vidéos, gobelets à son logo).

const LARGEUR_KIOSQUE = 1374 / 9; // 9 kiosques par rangée, de x = 353 à x = 1727
const COTE_ILOT = 152.5;

type Kiosque = { numero: number; x: number; y: number; l: number; h: number };

const kiosques: Kiosque[] = [
  // Rangée du haut : 1 à 9
  ...Array.from({ length: 9 }, (_, i) => ({ numero: i + 1, x: 353 + i * LARGEUR_KIOSQUE, y: 12, l: LARGEUR_KIOSQUE, h: 151 })),
  // Îlot de gauche : 10, 11 / 14, 15 — îlot de droite : 12, 13 / 16, 17
  ...[
    [10, 420, 262], [11, 420 + COTE_ILOT, 262], [14, 420, 262 + COTE_ILOT], [15, 420 + COTE_ILOT, 262 + COTE_ILOT],
    [12, 1315, 262], [13, 1315 + COTE_ILOT, 262], [16, 1315, 262 + COTE_ILOT], [17, 1315 + COTE_ILOT, 262 + COTE_ILOT],
  ].map(([numero, x, y]) => ({ numero, x, y, l: COTE_ILOT, h: COTE_ILOT })),
  // Rangée du bas : 18 à 26
  ...Array.from({ length: 9 }, (_, i) => ({ numero: i + 18, x: 353 + i * LARGEUR_KIOSQUE, y: 664, l: LARGEUR_KIOSQUE, h: 151 })),
];

// Portes doubles : charnières et sens d'ouverture (vers l'extérieur de la salle)
const PORTES = [
  // Mur de gauche
  'M215 236 L162 236 M215 289 A53 53 0 0 1 162 236 M215 342 L162 342 M215 289 A53 53 0 0 0 162 342',
  // Mur de droite, en haut et en bas
  'M1932 250 L1979.5 250 M1932 297.5 A47.5 47.5 0 0 0 1979.5 250 M1932 345 L1979.5 345 M1932 297.5 A47.5 47.5 0 0 1 1979.5 345',
  'M1932 645 L1979.5 645 M1932 692.5 A47.5 47.5 0 0 0 1979.5 645 M1932 740 L1979.5 740 M1932 692.5 A47.5 47.5 0 0 1 1979.5 740',
  // Mur du bas, à droite
  'M1795 815 L1795 862.5 M1842.5 815 A47.5 47.5 0 0 1 1795 862.5 M1890 815 L1890 862.5 M1842.5 815 A47.5 47.5 0 0 0 1890 862.5',
];

// Lounge café : zone délimitée entre les deux îlots
const LOUNGE = { x: 820, y: 192, l: 476, h: 440 };
const CENTRE_X = LOUNGE.x + LOUNGE.l / 2; // 1058

// Îlots de trois fauteuils autour d'une table basse ; « ouvert » = côté sans fauteuil
const SALONS: { x: number; y: number; ouvert: 'haut' | 'bas' }[] = [
  // Ouverts vers le centre : le comptoir et le titre restent dégagés
  { x: 910, y: 272, ouvert: 'bas' },
  { x: 1206, y: 272, ouvert: 'bas' },
  { x: 910, y: 548, ouvert: 'haut' },
  { x: 1206, y: 548, ouvert: 'haut' },
];

// Écrans commerciaux sur pied, au milieu de chaque côté du lounge
const ECRANS: { x: number; y: number; l: number; h: number }[] = [
  { x: CENTRE_X - 48, y: 201, l: 96, h: 12 },
  { x: CENTRE_X - 48, y: 611, l: 96, h: 12 },
  { x: 829, y: 364, l: 12, h: 96 },
  { x: 1275, y: 364, l: 12, h: 96 },
];

// Fauteuil vu de dessus : assise arrondie, dossier du côté opposé à la table
function Fauteuil({ x, y, dossier }: { x: number; y: number; dossier: 'gauche' | 'droite' | 'haut' | 'bas' }) {
  const c = 40; // environ 3 pi à l'échelle du plan (un kiosque de 10 pi fait 152)
  const e = 10; // épaisseur du dossier
  const d = {
    gauche: { x: x - c / 2, y: y - c / 2, l: e, h: c },
    droite: { x: x + c / 2 - e, y: y - c / 2, l: e, h: c },
    haut: { x: x - c / 2, y: y - c / 2, l: c, h: e },
    bas: { x: x - c / 2, y: y + c / 2 - e, l: c, h: e },
  }[dossier];
  return (
    <g>
      <rect x={x - c / 2} y={y - c / 2} width={c} height={c} rx="10" strokeWidth="2.5" className="fill-geo-cream stroke-geo-ink/45" />
      <rect x={d.x} y={d.y} width={d.l} height={d.h} rx="4" className="fill-geo-ink/35" />
    </g>
  );
}

export default function PlanKiosques({ fr }: { fr: boolean }) {
  const eau = fr ? 'Station d\'eau' : 'Water station';

  return (
    <div>
      {/* Sur mobile, le plan garde une taille lisible et défile horizontalement */}
      <div className="overflow-x-auto rounded-xl border border-geo-ink/10 bg-geo-cream">
        <svg
          viewBox="100 0 1910 885"
          role="img"
          aria-labelledby="plan-kiosques-titre plan-kiosques-desc"
          className="block h-auto w-full min-w-[720px]"
        >
          <title id="plan-kiosques-titre">{fr ? 'Plan du salon des exposants' : 'Exhibition hall floor plan'}</title>
          <desc id="plan-kiosques-desc">
            {fr
              ? '26 kiosques numérotés : 1 à 9 le long du mur du haut, 18 à 26 le long du mur du bas, et deux îlots de quatre kiosques (10, 11, 14, 15 à gauche ; 12, 13, 16, 17 à droite). Au centre, le lounge café : un comptoir barista, quatre îlots de fauteuils et quatre écrans, aux couleurs d\'un partenaire Bronze chaque demi-journée. Une station d\'eau borde l\'îlot de gauche côté lounge ; la pause-café est à droite de la salle.'
              : '26 numbered booths: 1 to 9 along the top wall, 18 to 26 along the bottom wall, and two islands of four booths (10, 11, 14, 15 on the left; 12, 13, 16, 17 on the right). In the centre, the café lounge: a barista counter, four armchair seating areas and four screens, in the colours of a Bronze partner each half-day. A water station flanks the left island on the lounge side; the coffee break area is on the right side of the hall.'}
          </desc>

          {/* Salle : plancher, puis murs interrompus aux portes */}
          <rect x="215" y="12" width="1717" height="803" className="fill-geo-cream-dark/50" />
          <path
            d="M215 12 H1932 V250 M1932 345 V645 M1932 740 V815 H1890 M1795 815 H215 V342 M215 236 V12"
            fill="none"
            strokeWidth="5"
            strokeLinecap="square"
            className="stroke-geo-ink/45"
          />
          {PORTES.map((d) => (
            <path key={d} d={d} fill="none" strokeWidth="2.5" className="stroke-geo-ink/35" />
          ))}

          {/* Lounge café */}
          <rect
            x={LOUNGE.x}
            y={LOUNGE.y}
            width={LOUNGE.l}
            height={LOUNGE.h}
            rx="44"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            className="fill-geo-cream/70 stroke-geo-ink/30"
          />
          {SALONS.map(({ x, y, ouvert }) => (
            <g key={`${x}-${y}`}>
              <Fauteuil x={x - 56} y={y} dossier="gauche" />
              <Fauteuil x={x + 56} y={y} dossier="droite" />
              {ouvert === 'haut'
                ? <Fauteuil x={x} y={y + 56} dossier="bas" />
                : <Fauteuil x={x} y={y - 56} dossier="haut" />}
              <circle cx={x} cy={y} r="20" strokeWidth="2.5" className="fill-geo-cream-dark stroke-geo-ink/45" />
            </g>
          ))}
          {ECRANS.map((e) => (
            <rect key={`${e.x}-${e.y}`} x={e.x} y={e.y} width={e.l} height={e.h} rx="3" className="fill-geo-ink" />
          ))}

          <text x={CENTRE_X} y="330" textAnchor="middle" fontSize="38" fontWeight="700" className="font-display fill-geo-ink">
            {fr ? 'Lounge café' : 'Café lounge'}
          </text>
          {/* Comptoir barista */}
          <rect x={CENTRE_X - 92} y="360" width="184" height="52" rx="26" strokeWidth="2.5" className="fill-geo-cream-dark stroke-geo-ink/45" />
          <Coffee x={CENTRE_X - 74} y={370} size={32} weight="light" className="text-geo-ink" aria-hidden="true" />
          <text x={CENTRE_X + 18} y="393" textAnchor="middle" fontSize="18" fontWeight="700" letterSpacing="4" className="fill-geo-ink">
            BARISTA
          </text>
          <text x={CENTRE_X} y="448" textAnchor="middle" fontSize="16" fontWeight="600" className="fill-geo-ink-soft">
            {fr ? 'Aux couleurs d\'un partenaire Bronze' : 'In the colours of a Bronze partner'}
          </text>
          <text x={CENTRE_X} y="470" textAnchor="middle" fontSize="16" fontWeight="600" className="fill-geo-ink-soft">
            {fr ? 'chaque demi-journée' : 'each half-day'}
          </text>

          {/* Kiosques : tous identiques, sans couleur d'état */}
          {kiosques.map((k) => (
            <g key={k.numero}>
              <rect x={k.x} y={k.y} width={k.l} height={k.h} strokeWidth="3" className="fill-geo-cream stroke-geo-ink/40" />
              <text
                x={k.x + k.l / 2}
                y={k.y + k.h / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="52"
                fontWeight="700"
                className="font-display fill-geo-ink"
              >
                {k.numero}
              </text>
            </g>
          ))}

          {/* Station d'eau, côté lounge de l'îlot de gauche */}
          <rect x="725" y="325" width="32" height="177" rx="6" strokeWidth="2.5" className="fill-geo-cream stroke-geo-ink/40" />
          <Drop x={729} y={398} size={24} weight="light" className="text-geo-ink-soft" aria-hidden="true" />
          <text transform="translate(790 413) rotate(90)" textAnchor="middle" fontSize="21" fontWeight="600" className="fill-geo-ink-soft">{eau}</text>

          {/* Pause-café : deux longues tables et deux tables rondes */}
          {[1769, 1841].map((x) => (
            <g key={x}>
              {[297, 385.7, 474.3].map((y) => (
                <rect key={y} x={x} y={y} width="32" height="88.7" strokeWidth="2.5" className="fill-geo-cream stroke-geo-ink/40" />
              ))}
            </g>
          ))}
          {[198, 658].map((y) => (
            <circle key={y} cx="1818" cy={y} r="38" strokeWidth="2.5" className="fill-geo-cream stroke-geo-ink/40" />
          ))}
          <text transform="translate(1744 430) rotate(90)" textAnchor="middle" fontSize="23" fontWeight="700" className="fill-geo-ink">
            {fr ? 'Pause-café' : 'Coffee break'}
          </text>
        </svg>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-geo-ink-soft">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3.5 w-3.5 border-2 border-geo-ink/40 bg-geo-cream" />
          {fr ? 'Kiosque de 10 pi × 10 pi' : '10 ft × 10 ft booth'}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3.5 w-3.5 rounded-[4px] border-2 border-l-[5px] border-geo-ink/45 bg-geo-cream" />
          {fr ? 'Fauteuil lounge' : 'Lounge armchair'}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-5 rounded-sm bg-geo-ink" />
          {fr ? 'Écran : logo et vidéos du partenaire Bronze' : 'Screen: Bronze partner logo and videos'}
        </li>
        <li className="sm:hidden">{fr ? 'Faites glisser pour voir tout le plan.' : 'Swipe to see the whole plan.'}</li>
      </ul>
    </div>
  );
}
