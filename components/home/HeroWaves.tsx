'use client'

// Système nerveux organique — couvre toute la section hero (inset-0).
// viewBox 1440×900 avec preserveAspectRatio="none" → s'adapte à n'importe quelle hauteur.
// Origine hors cadre gauche (x=-288), branches qui s'étalent de y≈0 à y≈900.
export function HeroWaves() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Nervures primaires : tronc + 5 branches sup + 5 branches inf */}
        <g opacity="0.20">
          {/* Tronc central ondulant */}
          <path strokeWidth="4.5" d="M-288,450 C-120,440 200,462 420,447 C680,430 920,466 1150,450 C1280,440 1380,456 1440,450"/>
          {/* Branches supérieures — étalées de y≈10 à y≈235 */}
          <path strokeWidth="3.0"  d="M-20,445 C80,380 200,260 380,140 C480,70 580,30 720,10"/>
          <path strokeWidth="2.6"  d="M150,440 C250,370 380,278 520,182 C620,110 720,70 850,40"/>
          <path strokeWidth="2.2"  d="M380,442 C480,372 610,290 740,212 C840,150 940,115 1060,82"/>
          <path strokeWidth="2.1"  d="M650,445 C750,382 878,312 1010,252 C1100,210 1200,185 1330,158"/>
          <path strokeWidth="2.0"  d="M950,448 C1040,392 1140,342 1240,298 C1320,264 1380,250 1440,236"/>
          {/* Branches inférieures — étalées de y≈680 à y≈870 */}
          <path strokeWidth="3.3"  d="M-50,455 C60,522 185,602 315,682 C410,742 505,792 620,842"/>
          <path strokeWidth="2.5"  d="M200,460 C315,532 450,622 580,712 C670,776 760,822 880,868"/>
          <path strokeWidth="2.3"  d="M460,455 C570,527 700,617 830,702 C920,764 1010,807 1125,852"/>
          <path strokeWidth="2.2"  d="M740,452 C840,522 960,602 1080,677 C1165,732 1252,772 1360,822"/>
          <path strokeWidth="2.0"  d="M1020,452 C1095,517 1180,577 1275,637 C1345,682 1400,712 1440,752"/>
        </g>

        {/* Nervures secondaires — émergent en cours de route des primaires */}
        <g opacity="0.14">
          {/* Secondaires supérieures */}
          <path strokeWidth="1.35" d="M120,362 C180,292 240,222 310,162 C360,117 410,87 460,57"/>
          <path strokeWidth="1.15" d="M500,82 C560,47 620,22 700,8"/>
          <path strokeWidth="1.25" d="M300,312 C360,242 430,177 510,122 C570,80 630,57 700,32"/>
          <path strokeWidth="1.05" d="M650,92 C710,57 780,32 860,17"/>
          <path strokeWidth="1.20" d="M560,262 C630,197 710,147 800,107"/>
          <path strokeWidth="1.00" d="M870,112 C935,77 1000,57 1080,42"/>
          <path strokeWidth="1.15" d="M840,292 C910,242 990,202 1070,167"/>
          <path strokeWidth="0.90" d="M1130,182 C1195,147 1265,127 1350,112"/>
          <path strokeWidth="1.10" d="M1090,347 C1155,302 1220,267 1295,237"/>
          <path strokeWidth="0.85" d="M1320,262 C1370,234 1412,220 1440,207"/>
          {/* Secondaires inférieures */}
          <path strokeWidth="1.45" d="M50,522 C110,587 175,652 240,712"/>
          <path strokeWidth="1.05" d="M410,737 C465,782 525,822 595,857"/>
          <path strokeWidth="1.32" d="M350,602 C415,662 488,722 565,777"/>
          <path strokeWidth="1.00" d="M700,782 C755,822 820,857 895,882"/>
          <path strokeWidth="1.26" d="M630,642 C695,700 770,754 845,802"/>
          <path strokeWidth="0.96" d="M970,822 C1025,852 1082,877 1150,894"/>
          <path strokeWidth="1.20" d="M900,652 C960,707 1030,757 1105,802"/>
          <path strokeWidth="0.90" d="M1230,787 C1290,822 1350,852 1415,877"/>
          <path strokeWidth="1.14" d="M1155,597 C1210,647 1270,692 1335,732"/>
          <path strokeWidth="0.75" d="M1380,712 C1405,740 1427,764 1440,782"/>
        </g>

        {/* Fibres tertiaires fines */}
        <g opacity="0.11">
          <path strokeWidth="0.60" d="M460,57 C512,30 566,14 626,7"/>
          <path strokeWidth="0.55" d="M700,8 C756,-5 816,-5 876,8"/>
          <path strokeWidth="0.60" d="M860,17 C920,2 982,0 1042,12"/>
          <path strokeWidth="0.55" d="M1080,42 C1140,24 1202,18 1262,30"/>
          <path strokeWidth="0.52" d="M1350,112 C1392,92 1422,82 1440,82"/>
          <path strokeWidth="0.65" d="M595,857 C642,877 692,892 747,900"/>
          <path strokeWidth="0.55" d="M895,882 C942,897 994,904 1048,900"/>
          <path strokeWidth="0.60" d="M1150,894 C1202,907 1257,907 1312,900"/>
          <path strokeWidth="0.52" d="M1415,877 C1432,887 1440,894 1440,900"/>
          <path strokeWidth="0.65" d="M240,712 C296,752 357,787 417,814"/>
          <path strokeWidth="0.60" d="M565,777 C620,812 680,842 742,862"/>
          <path strokeWidth="0.58" d="M845,802 C900,834 957,860 1017,877"/>
          <path strokeWidth="0.65" d="M310,162 C352,122 388,90 437,67"/>
          <path strokeWidth="0.60" d="M700,32 C754,14 810,6 867,8"/>
          <path strokeWidth="0.58" d="M1070,167 C1117,140 1167,122 1222,112"/>
          <path strokeWidth="0.55" d="M1295,237 C1342,214 1387,202 1440,198"/>
        </g>
      </svg>
    </div>
  )
}
