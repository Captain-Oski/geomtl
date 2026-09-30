# Globe animé du hero

Le hero de la page d'accueil affiche le globe en trame de points de l'identité 2027 (Studio Le Séisme), animé en direct dans un `<canvas>`. La Terre tourne, les couleurs peintes du fond tournent avec elle, et quatre idées d'animation s'enchaînent en boucle.

Pour jouer avec l'animation sur le site lui-même, ouvrir **`/demo`** (`/fr/demo` ou `/en/demo`). Voir [Page de démonstration](#page-de-démonstration-demo).

## Ce que l'on voit

**La Terre tourne.** Les continents réels défilent d'ouest en est sous la trame de points à 45° du visuel. Un tour prend environ 45 s (vitesse « rapide »).

**Quatre idées s'enchaînent**, 10 s chacune, en boucle, avec des transitions douces :

| # | Idée | Ce qui se passe |
|---|------|-----------------|
| 1 | Rotation | Jusqu'à 3 événements orange, rouge ou rose s'allument sur les continents puis s'éteignent. |
| 2 | Pulsations | Chaque événement émet des ondes concentriques qui se propagent sur le globe. |
| 3 | Système nerveux | Des arcs lumineux relient les événements d'un point du globe à l'autre. |
| 4 | Couleurs vivantes | Les points changent lentement de teinte ; les taches de couleur du fond sont plus présentes. |

**En continu, dans les quatre idées :**

- les régions de points s'estompent et reviennent lentement ;
- les taches de couleur peintes (cyan, turquoise, vert, citron) sont collées au globe et tournent avec lui ;
- les points de la bordure extérieure sont des satellites en orbite, regroupés en constellations qui tournent chacune à sa vitesse ;
- les satellites émettent une pluie très légère de « 0 » et de « 1 » qui descend vers la Terre ou remonte vers l'orbite.

**Accessibilité et sobriété :**

- si le système demande de réduire les animations (`prefers-reduced-motion`), le globe est affiché fixe ;
- l'animation se met en pause quand le hero sort de l'écran ;
- sans JavaScript, l'image `globe-trame.jpg` s'affiche à la place ;
- le canvas est décoratif (`aria-hidden`) : le contenu du hero reste dans le HTML.

## Fichiers

| Fichier | Rôle |
|---------|------|
| `components/home/GlobeTrame.tsx` | Moteur de l'animation (canvas) et réglages. |
| `components/home/Hero.tsx` | Place le globe dans le hero. Sur mobile, le globe commence sous la date et le slogan. |
| `lib/globe-couleurs.ts` | Calcul des couleurs réglables (points et globe diffus), partagé par le moteur et `/demo`. |
| `app/[locale]/demo/page.tsx`, `components/demo/GlobeDemo.tsx` | Page de démonstration avec panneau de réglages. |
| `public/images/brand/globe-trame.json` | Visuel vectorisé : dégradé, touches peintes, trame de 5 489 points. Chargé au démarrage. |
| `public/images/brand/terre-densite.png` | Carte des continents, 720 x 360, équirectangulaire. Chargée au démarrage. |
| `public/images/brand/globe-trame.svg` | Le même visuel en SVG, pour Figma ou Illustrator (calques `#fond`, `#globe`, `#halo-peinture`, `#trame`). Non utilisé par le site. |
| `public/images/brand/globe-trame.jpg` | Image de secours sans JavaScript. |
| `public/images/brand/degrade-trame.jpg` / `.webp` | Dégradé en trame : bandeau d'appel à l'action et en-têtes des pages intérieures. |
| `scripts/globe/` | Scripts de régénération des données (voir plus bas). |

## Comment ça marche

### Repère

Tout est calculé dans le repère du visuel d'origine, 3600 x 2202 px. Le centre du globe est en (2476,6 ; 2320,7), sous le cadre, et son rayon fait 1720 px. Le visuel est cadré comme une image `object-fit: cover` ancrée en haut à droite, quelle que soit la taille de l'écran.

### La trame et la rotation

La trame à 45° du visuel (pas de 23,28 px) reste fixe à l'écran. Pour chaque case, le moteur calcule quel point de la sphère passe dessous (projection orthographique, vue inclinée à 32° de latitude nord) et lit la densité des terres à cet endroit dans `terre-densite.png`. Le rayon du point vaut `11,5 × √densité`, et les points rétrécissent près du bord du globe.

On a d'abord essayé d'accrocher les points à la sphère. Comme on ne voit que le haut du globe, vu de biais, les rangées se tassaient en rayures verticales. La trame fixe garde la régularité du visuel partout.

### Le fond peint

- Le dégradé (éclairage fixe) et les touches peintes du halo sont dessinés une seule fois dans un canvas en quart de résolution.
- Les touches qui tombent sur le globe et 16 taches aux couleurs de la charte sont collées à la sphère. Elles sont redessinées à chaque image, en quart de résolution, puis agrandies : c'est flou par nature.

### Événements et idées

- **Événements** : des zones de 2,5 à 9° choisies au cœur des terres, bien visibles, qui s'allument en 1 s puis s'éteignent en 1,5 s. Palette chaude fixe (orange, rouge, rose) pour contraster avec le globe.
- **Pulsations** : une onde toutes les 1,33 s, qui avance à 9° par seconde, jusqu'à 26° du centre.
- **Système nerveux** : chaque nouvel événement est relié à un événement récent situé à moins de 57° par un arc de grand cercle surélevé, parcouru en 1,4 s.
- **Couleurs vivantes** : les points passent progressivement par quatre teintes (olive, turquoise foncé, bleu-vert, vert).
- **Transitions** : la teinte des points, l'intensité des taches et la vitesse de rotation glissent d'une idée à l'autre ; les événements en cours finissent leur vie.

### Satellites et pluie de données

- Les points du visuel situés à plus de 1760 px du centre deviennent des satellites. Ils sont dupliqués de l'autre côté du globe pour remplir l'orbite, puis regroupés par secteurs de 5°. Cela donne 52 constellations, qui font chacune un tour en 90 à 200 s, multiplié par la vitesse des satellites.
- Environ 11 chiffres par seconde naissent sous un satellite visible et se déplacent en ligne droite depuis le centre du globe, vers la Terre ou vers l'orbite. Ils vivent de 2,2 à 4 s, avec une opacité de 22 à 38 %, et basculent de temps en temps entre 0 et 1.

### Performance

- 30 images par seconde au maximum.
- Seules les parties visibles sont calculées.
- Fond en quart de résolution, avec la partie fixe mise en cache.
- Données chargées après la page : JSON de 155 Ko et PNG de 104 Ko.
- Mesuré à environ 13 ms par image dans un navigateur sans carte graphique, qui est le cas le plus défavorable. Le budget est de 33 ms.

## Réglages

Les réglages du hero de l'accueil sont dans `REGLAGES_GLOBE`, en tête de `components/home/GlobeTrame.tsx` :

| Champ | Valeur | Effet |
|-------|--------|-------|
| `idee` | `'enchainement'` | `'enchainement'` fait défiler les quatre idées ; `'rotation'`, `'pulsations'`, `'reseau'` ou `'couleurs'` en fixe une seule. |
| `vitesseTerre` | `2.5` | Multiplicateur de rotation de la Terre (« rapide »). `1` = un tour en 90 à 140 s selon l'idée. |
| `vitesseSatellites` | `0.5` | Multiplicateur des orbites (« lente »). |
| `couleurs` | `COULEURS_CHARTE` | Couleurs des points et du globe diffus (`lib/globe-couleurs.ts`). |
| `pause` | `false` | Fige l'animation. |
| `forcerAnimation` | `false` | Anime même si le système demande de réduire les animations (utilisé par `/demo`). |

Le composant accepte aussi une prop `reglages` (réglages partiels, lus à chaque image sans relancer l'animation) et une prop `onIdee` (appelée à chaque changement d'idée).

Réglages plus fins, dans le même fichier : `DUREE_IDEE_S` (durée de chaque idée, 10 s), `IDEAS` (vitesse, nombre, taille et durée des événements, intensité des taches, pour chaque idée), `VIEW_LAT` (inclinaison de la vue), `LON_START` (longitude de départ), `R_DOT` (taille maximale des points), `WARM` (palette des événements), `PATCH_COLORS` et `DOT_TONES`.

### Changer les couleurs de l'accueil

1. Sur `/demo`, choisir les couleurs dans le panneau (préréglages ou curseurs), puis cliquer sur « Copier les valeurs ».
2. Reporter les valeurs dans `REGLAGES_GLOBE.couleurs`. Par exemple, « Points #34717E (teinte 190°, luminosité -4) · Globe : teinte +140°, saturation 90 % » devient :

```ts
couleurs: { pointsTeinte: 190, pointsLuminosite: -4, globeTeinte: 140, globeSaturation: 90 },
```

La teinte des points remplace celle de l'olive en gardant sa saturation. La teinte du globe décale tout le dégradé et les taches peintes. Les événements gardent leur palette chaude.

## Page de démonstration `/demo`

`/fr/demo` (ou `/en/demo`, `/demo` redirige vers `/fr/demo`) affiche le vrai hero du site avec un panneau de réglages flottant et repliable (en bas de l'écran sur mobile) :

- idée : enchaînement ou une des quatre idées ;
- vitesse de la Terre et vitesse des satellites (lente, normale, rapide) ;
- fond crème ou encre (c'est le thème clair ou sombre du site, le même que le bouton du Header), texte du hero affiché ou masqué, pause ;
- couleur des points et du globe diffus : préréglages et curseurs, valeurs à copier, retour à la charte.

Les couleurs choisies sont mémorisées dans le navigateur du visiteur. Rien n'est enregistré sur le serveur : les couleurs de la démo ne modifient jamais l'accueil. Le fond, lui, est le thème du site : le choisir ici le change aussi sur les autres pages, pour ce visiteur seulement. Si le système demande de réduire les animations, un bouton permet de lancer l'animation quand même.

La page n'est liée nulle part et porte `noindex` : elle n'apparaît pas dans les moteurs de recherche, mais reste accessible à quiconque connaît l'adresse. Son interface est en français, y compris sur `/en/demo`.

## Régénérer les données

Les deux jeux de données se régénèrent indépendamment. Les scripts reproduisent octet pour octet les fichiers actuels.

### Visuel vectorisé : `globe-trame.json` et `globe-trame.svg`

**Prérequis :**

- Python 3 avec numpy, scipy et Pillow :

  ```bash
  python -m venv .venv-globe
  .venv-globe/Scripts/pip install -r scripts/globe/requirements.txt   # macOS / Linux : .venv-globe/bin/pip
  ```

- L'image d'origine du studio, 3600 x 2202 px (globe olive sur fond crème), placée dans `scripts/globe/source/globe-trame-original.jpg`. Elle n'est pas versionnée (4,8 Mo). On peut aussi indiquer un autre chemin avec `GLOBE_SOURCE`.

**Étapes** (à lancer depuis la racine du dépôt, dans l'ordre) :

| Script | Ce qu'il fait |
|--------|---------------|
| `1_detecter.py` | Estime le fond sans les points, calcule la couverture de chaque pixel (les points sont olive `#6A8C3A` opaque) et détecte les points. |
| `2_trame.py` | Trouve la grille : 45°, pas de 23,28 px, écart moyen de 0,1 px. |
| `3_centre.py` | Trouve le centre du dégradé, qui est radial. |
| `4_svg.py` | Mesure le rayon de chaque case de la grille et écrit une première version du SVG et du JSON. |
| `5_halo.py` | Écrit la version finale : dégradé dont le halo s'efface en transparence, et 93 touches peintes calées sur les irrégularités de l'aérographe. |

```bash
for s in 1_detecter 2_trame 3_centre 4_svg 5_halo; do .venv-globe/Scripts/python scripts/globe/$s.py; done
```

Les fichiers intermédiaires vont dans `scripts/globe/.travail/` (non versionné). Variables facultatives : `GLOBE_SOURCE`, `GLOBE_TRAVAIL`, `GLOBE_SORTIE` (par défaut `public/images/brand`).

### Carte des continents : `terre-densite.png`

```bash
npm install --no-save world-atlas topojson-client sharp
node scripts/globe/carte-densite.js
```

Source : Natural Earth 1:50m, domaine public, via le paquet `world-atlas`. Le script dessine les terres en projection équirectangulaire, adoucit les côtes et ajoute une texture de bruit pour faire varier la taille des points comme dans la trame d'origine. Il corrige aussi les polygones qui traversent l'antiméridien, comme la Russie, les Fidji ou l'Antarctique. `--no-save` évite d'ajouter ces paquets aux dépendances du site.

## Limites connues

- Le halo vectorisé est un peu plus régulier que l'aérographe d'origine, par exemple sur la gauche de la bande cyan.
- Les réglages faits sur `/demo` ne s'appliquent pas à l'accueil : il faut les reporter dans `REGLAGES_GLOBE`.
- Les continents sont ceux de la vraie Terre, pas les formes du visuel d'origine. L'image fixe `globe-trame.jpg` garde les formes du studio.
