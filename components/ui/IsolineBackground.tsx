'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Neural system background — abstract nervous system cartography.
//
// Direction artistique :
//   Inspiré des scans en fluorescence (souris CUBIC, imagerie DTI) et des
//   planches anatomiques du système nerveux périphérique.
//   Structure : une colonne centrale lumineuse (chaude) dont partent 8 paires
//   de nerfs qui se ramifient en branches de 2e et 3e ordre jusqu'à des filaments.
//   Température de couleur décroissante du centre vers la périphérie :
//     rose (#e91e8c) → orange (#ff6b35) → jaune (#ffd60a) → blanc filaments.
//   Le tout très transparent — texture de fond, pas d'élément au premier plan.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  className?: string;
  variant?: 'hero' | 'section';
}

// Glow helper: renders a path with multiple stacked strokes to simulate
// the bioluminescent bloom visible in fluorescence microscopy.
function GlowPath({
  d,
  color,
  coreOp,
  coreW,
  glowOp,
  glowW,
  bloomOp,
  bloomW,
  dashArray,
}: {
  d: string;
  color: string;
  coreOp: number;
  coreW: number;
  glowOp?: number;
  glowW?: number;
  bloomOp?: number;
  bloomW?: number;
  dashArray?: string;
}) {
  const common = {
    fill: 'none' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeDasharray: dashArray,
  };
  return (
    <>
      {bloomOp && bloomW && (
        <path d={d} stroke={color} strokeOpacity={bloomOp} strokeWidth={bloomW} {...common} />
      )}
      {glowOp && glowW && (
        <path d={d} stroke={color} strokeOpacity={glowOp}  strokeWidth={glowW}  {...common} />
      )}
      <path d={d} stroke={color} strokeOpacity={coreOp} strokeWidth={coreW} {...common} />
    </>
  );
}

export default function IsolineBackground({ className = '', variant = 'hero' }: Props) {
  const isSection = variant === 'section';
  const dim = isSection ? 0.42 : 1;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ opacity: dim }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >

        {/* ══════════════════════════════════════════════════════════════
            COLONNE VERTÉBRALE — tronc central lumineux
            Courbe légèrement en S (comme la colonne anatomique).
            3 couches de glow : bloom extérieur → halo → cœur brillant.
        ══════════════════════════════════════════════════════════════ */}

        {/* Bloom externe étendu */}
        <path
          d="M 800,-20 C 825,100 795,235 782,375 C 769,515 812,640 796,775 C 784,870 758,920 745,960"
          stroke="#e91e8c" strokeOpacity="0.06" strokeWidth="80"
          fill="none" strokeLinecap="round"
        />
        {/* Halo intermédiaire */}
        <path
          d="M 800,-20 C 825,100 795,235 782,375 C 769,515 812,640 796,775 C 784,870 758,920 745,960"
          stroke="#e91e8c" strokeOpacity="0.12" strokeWidth="32"
          fill="none" strokeLinecap="round"
        />
        {/* Lueur interne */}
        <path
          d="M 800,-20 C 825,100 795,235 782,375 C 769,515 812,640 796,775 C 784,870 758,920 745,960"
          stroke="#ff6b35" strokeOpacity="0.28" strokeWidth="10"
          fill="none" strokeLinecap="round"
        />
        {/* Ligne centrale */}
        <path
          d="M 800,-20 C 825,100 795,235 782,375 C 769,515 812,640 796,775 C 784,870 758,920 745,960"
          stroke="#ffaa60" strokeOpacity="0.55" strokeWidth="2.2"
          fill="none" strokeLinecap="round"
        />
        {/* Reflet brillant (highlight) */}
        <path
          d="M 800,-20 C 825,100 795,235 782,375 C 769,515 812,640 796,775 C 784,870 758,920 745,960"
          stroke="white" strokeOpacity="0.22" strokeWidth="0.7"
          fill="none" strokeLinecap="round"
        />


        {/* ══════════════════════════════════════════════════════════════
            NERFS PRIMAIRES — 8 paires gauche/droite
            Partent de la colonne et se déploient en arc gracieux.
            strokeWidth 1.8 → 1.4 du haut vers le bas.
        ══════════════════════════════════════════════════════════════ */}

        {/* ── Niveau 1 (cervical haut, y≈75) ── */}
        <GlowPath d="M 812,75  C 740,62  620,68  485,88  C 395,102 295,128 150,162"
          color="#ff6b35" coreOp={0.30} coreW={1.8} glowOp={0.10} glowW={8} bloomOp={0.04} bloomW={22} />
        <GlowPath d="M 812,75  C 885,62  1010,68 1148,90  C 1240,104 1340,132 1490,168"
          color="#ff6b35" coreOp={0.30} coreW={1.8} glowOp={0.10} glowW={8} bloomOp={0.04} bloomW={22} />

        {/* ── Niveau 2 (cervical bas, y≈165) ── */}
        <GlowPath d="M 800,165 C 715,152 592,160 462,188 C 365,208 258,238 88,282"
          color="#ff6b35" coreOp={0.28} coreW={1.7} glowOp={0.09} glowW={7} bloomOp={0.035} bloomW={20} />
        <GlowPath d="M 800,165 C 885,152 1010,162 1140,190 C 1238,212 1338,244 1508,288"
          color="#ff6b35" coreOp={0.28} coreW={1.7} glowOp={0.09} glowW={7} bloomOp={0.035} bloomW={20} />

        {/* ── Niveau 3 (thoracique haut, y≈265) ── */}
        <GlowPath d="M 786,265 C 698,252 572,260 442,290 C 342,312 235,348 62,398"
          color="#ff7830" coreOp={0.26} coreW={1.65} glowOp={0.09} glowW={7} bloomOp={0.032} bloomW={18} />
        <GlowPath d="M 786,265 C 875,252 1002,262 1132,292 C 1232,316 1335,354 1508,404"
          color="#ff7830" coreOp={0.26} coreW={1.65} glowOp={0.09} glowW={7} bloomOp={0.032} bloomW={18} />

        {/* ── Niveau 4 (thoracique bas, y≈368) ── */}
        <GlowPath d="M 778,368 C 688,355 560,365 428,396 C 326,420 218,460 42,512"
          color="#ff8020" coreOp={0.24} coreW={1.6} glowOp={0.08} glowW={6} bloomOp={0.03} bloomW={17} />
        <GlowPath d="M 778,368 C 869,355 998,367 1128,398 C 1228,424 1330,466 1504,518"
          color="#ff8020" coreOp={0.24} coreW={1.6} glowOp={0.08} glowW={6} bloomOp={0.03} bloomW={17} />

        {/* ── Niveau 5 (lombaire haut, y≈468) ── */}
        <GlowPath d="M 772,468 C 680,456 552,468 418,500 C 315,526 205,568 28,622"
          color="#ffa020" coreOp={0.22} coreW={1.55} glowOp={0.08} glowW={6} bloomOp={0.028} bloomW={16} />
        <GlowPath d="M 772,468 C 865,456 995,470 1124,502 C 1224,528 1328,572 1500,626"
          color="#ffa020" coreOp={0.22} coreW={1.55} glowOp={0.08} glowW={6} bloomOp={0.028} bloomW={16} />

        {/* ── Niveau 6 (lombaire bas, y≈568) ── */}
        <GlowPath d="M 780,568 C 688,558 558,568 425,600 C 322,625 212,668 35,724"
          color="#ffc020" coreOp={0.20} coreW={1.5} glowOp={0.07} glowW={5} bloomOp={0.025} bloomW={15} />
        <GlowPath d="M 780,568 C 872,558 1002,570 1130,602 C 1228,628 1332,672 1505,728"
          color="#ffc020" coreOp={0.20} coreW={1.5} glowOp={0.07} glowW={5} bloomOp={0.025} bloomW={15} />

        {/* ── Niveau 7 (sacré, y≈668) ── */}
        <GlowPath d="M 789,668 C 694,658 565,670 432,703 C 328,729 218,772 40,830"
          color="#ffd020" coreOp={0.18} coreW={1.4} glowOp={0.06} glowW={5} bloomOp={0.022} bloomW={14} />
        <GlowPath d="M 789,668 C 882,658 1012,672 1140,705 C 1236,731 1338,775 1508,834"
          color="#ffd020" coreOp={0.18} coreW={1.4} glowOp={0.06} glowW={5} bloomOp={0.022} bloomW={14} />

        {/* ── Niveau 8 (coccygien, y≈768) ── */}
        <GlowPath d="M 790,768 C 696,762 567,774 435,808 C 330,836 220,878 42,920"
          color="#ffd60a" coreOp={0.16} coreW={1.3} glowOp={0.055} glowW={4} bloomOp={0.020} bloomW={13} />
        <GlowPath d="M 790,768 C 884,762 1014,776 1142,810 C 1238,838 1340,882 1508,924"
          color="#ffd60a" coreOp={0.16} coreW={1.3} glowOp={0.055} glowW={4} bloomOp={0.020} bloomW={13} />


        {/* ══════════════════════════════════════════════════════════════
            NERFS SECONDAIRES — ramifications des primaires
            Partent à mi-chemin ou en bout de chaque nerf primaire.
            strokeWidth 0.7–1.0, couleurs plus froides.
        ══════════════════════════════════════════════════════════════ */}
        <g stroke="#ffd60a" strokeLinecap="round" fill="none">
          {/* Branches gauche niveau 1 */}
          <path d="M 485,88  C 430,72  360,65  272,60 " strokeOpacity="0.16" strokeWidth="0.90" />
          <path d="M 485,88  C 458,108 408,122 340,140" strokeOpacity="0.14" strokeWidth="0.80" />
          <path d="M 150,162 C 98,172  48,185  -10,202" strokeOpacity="0.12" strokeWidth="0.72" />
          {/* Branches droite niveau 1 */}
          <path d="M 1148,90  C 1210,74 1290,66 1378,60" strokeOpacity="0.16" strokeWidth="0.90" />
          <path d="M 1148,90  C 1178,112 1228,128 1300,148" strokeOpacity="0.14" strokeWidth="0.80" />
          <path d="M 1490,168 C 1542,178 1590,192 1640,210" strokeOpacity="0.12" strokeWidth="0.72" />

          {/* Branches gauche niveau 2 */}
          <path d="M 462,188 C 405,172 330,165 245,162" strokeOpacity="0.15" strokeWidth="0.88" />
          <path d="M 462,188 C 435,212 390,230 325,252" strokeOpacity="0.13" strokeWidth="0.78" />
          <path d="M 88,282  C 38,295  -8,312  -55,332" strokeOpacity="0.11" strokeWidth="0.68" />
          {/* Branches droite niveau 2 */}
          <path d="M 1140,190 C 1205,174 1285,166 1372,162" strokeOpacity="0.15" strokeWidth="0.88" />
          <path d="M 1140,190 C 1168,215 1215,235 1282,258" strokeOpacity="0.13" strokeWidth="0.78" />
          <path d="M 1508,288 C 1558,302 1606,320 1655,342" strokeOpacity="0.11" strokeWidth="0.68" />

          {/* Branches gauche niveau 3 */}
          <path d="M 442,290 C 382,274 305,268 215,265" strokeOpacity="0.14" strokeWidth="0.85" />
          <path d="M 442,290 C 415,316 368,338 298,362" strokeOpacity="0.12" strokeWidth="0.75" />
          <path d="M 62,398  C 10,414  -38,432 -88,452" strokeOpacity="0.10" strokeWidth="0.65" />
          {/* Branches droite niveau 3 */}
          <path d="M 1132,292 C 1196,276 1272,270 1362,268" strokeOpacity="0.14" strokeWidth="0.85" />
          <path d="M 1132,292 C 1162,318 1210,342 1280,368" strokeOpacity="0.12" strokeWidth="0.75" />
          <path d="M 1508,404 C 1558,420 1608,440 1658,462" strokeOpacity="0.10" strokeWidth="0.65" />

          {/* Branches gauche niveau 4 */}
          <path d="M 428,396 C 362,380 282,374 188,372" strokeOpacity="0.13" strokeWidth="0.82" />
          <path d="M 428,396 C 398,425 348,450 275,478" strokeOpacity="0.11" strokeWidth="0.72" />
          <path d="M 42,512  C -8,530  -58,550 -108,572" strokeOpacity="0.09" strokeWidth="0.62" />
          {/* Branches droite niveau 4 */}
          <path d="M 1128,398 C 1195,382 1272,376 1364,374" strokeOpacity="0.13" strokeWidth="0.82" />
          <path d="M 1128,398 C 1158,428 1208,454 1278,482" strokeOpacity="0.11" strokeWidth="0.72" />
          <path d="M 1504,518 C 1554,536 1604,558 1654,580" strokeOpacity="0.09" strokeWidth="0.62" />

          {/* Branches gauche niveau 5 */}
          <path d="M 418,500 C 350,485 268,480 172,478" strokeOpacity="0.12" strokeWidth="0.80" />
          <path d="M 418,500 C 386,530 334,558 260,588" strokeOpacity="0.10" strokeWidth="0.70" />
          {/* Branches droite niveau 5 */}
          <path d="M 1124,502 C 1192,487 1270,482 1362,480" strokeOpacity="0.12" strokeWidth="0.80" />
          <path d="M 1124,502 C 1156,532 1208,560 1278,590" strokeOpacity="0.10" strokeWidth="0.70" />

          {/* Branches gauche niveaux 6-8 (de plus en plus fins) */}
          <path d="M 425,600 C 355,585 272,580 175,578" strokeOpacity="0.11" strokeWidth="0.75" />
          <path d="M 35,724  C -18,742 -68,762 -118,784" strokeOpacity="0.08" strokeWidth="0.58" />
          <path d="M 432,703 C 358,690 272,686 172,684" strokeOpacity="0.10" strokeWidth="0.70" />
          <path d="M 40,830  C -15,848 -65,868 -118,890" strokeOpacity="0.07" strokeWidth="0.55" />
          <path d="M 435,808 C 358,796 270,792 168,790" strokeOpacity="0.09" strokeWidth="0.65" />
          {/* Branches droite niveaux 6-8 */}
          <path d="M 1130,602 C 1200,587 1278,582 1372,580" strokeOpacity="0.11" strokeWidth="0.75" />
          <path d="M 1505,728 C 1558,746 1608,766 1660,788" strokeOpacity="0.08" strokeWidth="0.58" />
          <path d="M 1140,705 C 1208,692 1286,688 1382,686" strokeOpacity="0.10" strokeWidth="0.70" />
          <path d="M 1508,834 C 1560,852 1610,872 1662,894" strokeOpacity="0.07" strokeWidth="0.55" />
          <path d="M 1142,810 C 1212,798 1290,794 1388,792" strokeOpacity="0.09" strokeWidth="0.65" />
        </g>


        {/* ══════════════════════════════════════════════════════════════
            FILAMENTS TERTIAIRES — fins comme des axones terminaux
            strokeWidth 0.3–0.5, blanc quasi-transparent.
            Donnent la texture "réseau capillaire nerveux".
        ══════════════════════════════════════════════════════════════ */}
        {!isSection && (
          <g stroke="rgba(255,255,255,0.08)" strokeLinecap="round" fill="none" strokeWidth="0.38">
            {/* Éventail gauche haut */}
            <path d="M 272,60  C 218,50  158,45  92,44" />
            <path d="M 272,60  C 238,42  202,32  162,28" />
            <path d="M 340,140 C 288,148 232,158 168,172" />
            <path d="M 340,140 C 305,125 268,116 226,112" />
            <path d="M 245,162 C 190,155 130,152 65,153" />
            <path d="M 245,162 C 205,148 162,140 114,136" />
            {/* Éventail droite haut */}
            <path d="M 1378,60  C 1432,50 1492,44 1558,43" />
            <path d="M 1378,60  C 1412,42 1450,32 1492,28" />
            <path d="M 1300,148 C 1352,156 1408,166 1470,180" />
            <path d="M 1300,148 C 1336,128 1376,118 1420,114" />
            <path d="M 1372,162 C 1428,155 1488,152 1552,152" />
            <path d="M 1372,162 C 1410,148 1452,140 1498,136" />
            {/* Éventail gauche milieu */}
            <path d="M 215,265 C 155,258 90,255 20,256" />
            <path d="M 215,265 C 172,250 126,242 76,238" />
            <path d="M 298,362 C 242,372 180,384 112,400" />
            <path d="M 188,372 C 132,368 72,368 8,372" />
            <path d="M 172,478 C 114,474 52,474 -12,478" />
            <path d="M 260,588 C 202,600 138,614 68,632" />
            {/* Éventail droite milieu */}
            <path d="M 1362,268 C 1422,261 1486,258 1556,258" />
            <path d="M 1362,268 C 1405,252 1452,244 1502,240" />
            <path d="M 1280,368 C 1336,378 1396,390 1462,406" />
            <path d="M 1364,374 C 1422,370 1484,370 1550,374" />
            <path d="M 1362,480 C 1422,476 1484,476 1550,480" />
            <path d="M 1278,590 C 1336,602 1398,616 1464,634" />
            {/* Filaments bas */}
            <path d="M 175,578 C 118,574 56,574 -10,578" />
            <path d="M 172,684 C 114,680 52,680 -12,684" />
            <path d="M 168,790 C 110,788 48,788 -16,792" />
            <path d="M 1372,580 C 1432,576 1494,576 1560,580" />
            <path d="M 1382,686 C 1442,682 1504,682 1570,686" />
            <path d="M 1388,792 C 1448,790 1510,790 1576,794" />
            {/* Quelques filaments diagonaux supplémentaires pour la texture */}
            <path d="M 88,282  C 42,298  -4,318  -52,342" />
            <path d="M -55,332 C -90,348 -124,366 -158,388" />
            <path d="M 1508,288 C 1555,305 1600,325 1645,348" />
          </g>
        )}


        {/* ══════════════════════════════════════════════════════════════
            NŒUDS GANGLIONNAIRES — petits points lumineux
            Là où les nerfs primaires rejoignent la colonne.
            Simulent les ganglions spinaux.
        ══════════════════════════════════════════════════════════════ */}
        {[
          { x: 812, y: 75,  r: 3.5, color: '#ff6b35' },
          { x: 800, y: 165, r: 3.2, color: '#ff6b35' },
          { x: 786, y: 265, r: 3.0, color: '#ff7830' },
          { x: 778, y: 368, r: 2.8, color: '#ff8020' },
          { x: 772, y: 468, r: 2.6, color: '#ffa020' },
          { x: 780, y: 568, r: 2.4, color: '#ffc020' },
          { x: 789, y: 668, r: 2.2, color: '#ffd020' },
          { x: 790, y: 768, r: 2.0, color: '#ffd60a' },
        ].map(({ x, y, r, color }, i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r * 5}  fill={color} opacity={0.06} />
            <circle cx={x} cy={y} r={r * 2.2} fill={color} opacity={0.18} />
            <circle cx={x} cy={y} r={r}       fill="white"  opacity={0.72}
              style={{ animation: `neuralPulse ${3 + i * 0.25}s ease-in-out infinite` }}
            />
          </g>
        ))}

        {/* Nœud supérieur (tronc cérébral) — plus grand, plus lumineux */}
        <circle cx="800" cy="-20" r="28" fill="#e91e8c" opacity="0.06" />
        <circle cx="800" cy="-20" r="12" fill="#e91e8c" opacity="0.14" />
        <circle cx="800" cy="-20" r="5"  fill="white"   opacity="0.80" />


        {/* ══════════════════════════════════════════════════════════════
            OVERLAY CARTOGRAPHIQUE — fantôme de grille de référence
            Simule la superposition carte / anatomie.
            Opacité ≤ 3 % : texture invisible mais présente.
        ══════════════════════════════════════════════════════════════ */}
        {!isSection && (
          <>
            {/* Grille de fond (parallèles et méridiens) */}
            <g stroke="rgba(255,255,255,0.022)" strokeWidth="0.5">
              {[200, 400, 600, 800, 1000, 1200, 1400].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="900" />
              ))}
              {[150, 300, 450, 600, 750].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="1600" y2={y} />
              ))}
            </g>

            {/* Annotations cartographiques fantôme */}
            <g
              fill="rgba(255,255,255,0.05)"
              fontSize="6.5"
              fontFamily="'Courier New',monospace"
              letterSpacing="0.7"
            >
              <text x="820" y="90">N.I — CERVICAL</text>
              <text x="820" y="180">N.II — BRACHIAL</text>
              <text x="820" y="278">N.III — THORACIQUE</text>
              <text x="820" y="380">N.IV — LOMBAIRE</text>
              <text x="820" y="480">N.V — SACRÉ</text>
              <text x="820" y="580">N.VI</text>
              <text x="820" y="680">N.VII</text>
              <text x="820" y="780">N.VIII — COCCYGIEN</text>
              {/* Coin bas gauche */}
              <text x="18" y="885" fontSize="5.5" opacity="0.7">
                GeoMTL 2027 · Système nerveux du territoire · Montréal QC
              </text>
            </g>

            {/* Échelle (coin bas droite) */}
            <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.6">
              <line x1="1460" y1="862" x2="1580" y2="862" />
              <line x1="1460" y1="858" x2="1460" y2="866" />
              <line x1="1520" y1="858" x2="1520" y2="866" />
              <line x1="1580" y1="858" x2="1580" y2="866" />
            </g>
            <text
              x="1480" y="856"
              fill="rgba(255,255,255,0.04)"
              fontSize="5.5"
              fontFamily="'Courier New',monospace"
            >
              1 km
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
