# Identité visuelle 2027 dans le code

Repères pour appliquer l'identité 2027 (Studio Le Séisme) sur le site public. L'interface d'administration (`/admin`) garde volontairement l'ancienne palette.

## Couleurs

Les couleurs ont été relevées dans les visuels du studio (globe en trame de points). Leurs valeurs sont définies une seule fois, dans `styles/globals.css`, en canaux RGB (`--rgb-geo-cream: 244 243 237`). S'en servent :

- les classes Tailwind (`bg-geo-cream`, `text-geo-ink/60`…), que `tailwind.config.ts` fait pointer vers ces variables ;
- le CSS écrit à la main, avec `var(--geo-cream)` ou, pour une opacité, `rgb(var(--rgb-geo-ink) / 0.15)`.

| Nom | Clair | Sombre | Usage |
|-----|-------|--------|-------|
| `geo-cream` | `#F4F3ED` | `#141412` | Fond du site |
| `geo-cream-dark` | `#E8E6DD` | `#1E1E1B` | Fonds secondaires (bandeaux, sections) |
| `geo-ink` | `#141412` | `#F4F3ED` | Texte, boutons posés sur les visuels |
| `geo-ink-soft` | `#4A4944` | `#B5B3AA` | Texte secondaire |
| `geo-cyan` | `#20FEFD` | idem | Départ du dégradé |
| `geo-teal` | `#01CDA5` | idem | Turquoise |
| `geo-teal-dark` | `#00A383` | `#01CDA5` | Turquoise lisible sur le fond (liens, accents) |
| `geo-green` | `#1BC868` | idem | Vert du dégradé |
| `geo-lime` | `#D0DC00` | idem | Citron, arrivée du dégradé |
| `geo-lime-dark` | `#A9B300` | `#D0DC00` | Citron lisible sur le fond |
| `geo-olive` | `#6A8C3A` | idem | Points de la trame |
| `geo-noir` | `#141412` | idem | Fixe : texte sur le dégradé signature, pied de page |
| `geo-papier` | `#F4F3ED` | idem | Fixe : texte du pied de page |

Le dégradé signature cyan → turquoise → vert → citron est disponible avec la classe `bg-gradient-geo-2027`. Il reste clair dans les deux thèmes : le texte posé dessus est en `text-geo-noir`, pas en `text-geo-ink`. Pas de couleur écrite en dur dans les pages publiques : utiliser ces classes ou variables.

## Mode sombre

Le bouton lune / soleil du Header (`components/layout/ThemeToggle.tsx`) bascule le site public entre le thème clair, par défaut (la charte), et un thème sombre sur fond encre. Le choix est mémorisé dans le navigateur (`localStorage`, clé `geomtl-theme`) ; le fond crème / encre de la page `/demo` est le même réglage.

- Le thème sombre est la classe `.dark` sur `<html>`. Elle inverse les variables de couleur (tableau ci-dessus), si bien que la plupart des composants n'ont rien à prévoir : `bg-geo-cream` devient le fond encre, `text-geo-ink` le texte crème.
- Un petit script dans le `<head>` (`lib/theme-script.ts`) pose la classe avant le premier affichage, sans flash crème au chargement. Le hook `useTheme` et la fonction `changerTheme` sont dans `lib/theme.ts`.
- Tailwind est configuré en `darkMode: 'class'` : le préfixe `dark:` sert pour les rares cas qui ne s'expriment pas avec les variables, par exemple un blanc translucide (`bg-white/55 dark:bg-geo-cream/75`).
- Ce qui ne change pas de couleur : le dégradé signature et son texte (`geo-noir`), le pied de page (toujours noir, `geo-noir` / `geo-papier`), les visuels.
- Pour vérifier un composant, afficher la page dans les deux thèmes.

## Icônes

- Bibliothèque : [Phosphor Icons](https://phosphoricons.com), graisse **Light**, monochrome.
- Importer chaque icône par son chemin, ce qui fonctionne dans les composants serveur comme client et garde le code léger :

  ```tsx
  import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin';

  <MapPin size={20} weight="light" aria-hidden="true" />
  ```

- Toujours passer `weight="light"`. Les icônes décoratives prennent `aria-hidden="true"`.
- Pas d'emoji comme icône sur le site public.

## Visuels

| Visuel | Fichier | Où |
|--------|---------|----|
| Globe en trame (animé) | `public/images/brand/globe-trame.json` + `terre-densite.png` | Hero de l'accueil. Voir [globe-anime.md](globe-anime.md). |
| Dégradé en trame | `public/images/brand/degrade-trame.jpg` / `.webp` | Bandeau d'appel à l'action de l'accueil et en-têtes des pages intérieures. |

Les en-têtes des pages intérieures utilisent la classe `page-header-2027` (`styles/globals.css`). Elle pose le dégradé en trame et repasse en encre les éléments qui disparaîtraient dessus : sur-titre en dégradé, texte secondaire et boutons en dégradé. En mode sombre, le dégradé est éteint sous un voile d'encre et ces éléments gardent leurs couleurs vives.

## Boutons sur les visuels

Sur le globe et sur le dégradé en trame, les boutons sont en encre avec le texte en clair, comme dans le Figma. Ailleurs, le bouton principal garde le dégradé signature.
