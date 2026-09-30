# Identité visuelle 2027 dans le code

Repères pour appliquer l'identité 2027 (Studio Le Séisme) sur le site public. L'interface d'administration (`/admin`) garde volontairement l'ancienne palette.

## Couleurs

Les couleurs ont été relevées dans les visuels du studio (globe en trame de points). Elles sont définies à deux endroits, à garder synchronisés :

- `tailwind.config.ts`, pour les classes Tailwind : `bg-geo-cream`, `text-geo-ink`, etc. ;
- `styles/globals.css`, pour les variables CSS : `--geo-cream`, `--geo-ink`, etc.

| Nom | Valeur | Usage |
|-----|--------|-------|
| `geo-cream` | `#F4F3ED` | Fond du site |
| `geo-cream-dark` | `#E8E6DD` | Fonds secondaires (bandeaux, sections) |
| `geo-ink` | `#141412` | Texte, pied de page, boutons posés sur les visuels |
| `geo-ink-soft` | `#4A4944` | Texte secondaire |
| `geo-cyan` | `#20FEFD` | Départ du dégradé |
| `geo-teal` | `#01CDA5` | Turquoise |
| `geo-teal-dark` | `#00A383` | Turquoise lisible sur fond clair (liens, accents) |
| `geo-green` | `#1BC868` | Vert du dégradé |
| `geo-lime` | `#D0DC00` | Citron, arrivée du dégradé |
| `geo-lime-dark` | `#A9B300` | Citron lisible sur fond clair |
| `geo-olive` | `#6A8C3A` | Points de la trame |

Le dégradé signature cyan → turquoise → vert → citron est disponible avec la classe `bg-gradient-geo-2027`. Pas de couleur écrite en dur dans les pages publiques : utiliser ces classes ou variables.

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

Les en-têtes des pages intérieures utilisent la classe `page-header-2027` (`styles/globals.css`). Elle pose le dégradé en trame et repasse en encre les éléments qui disparaîtraient dessus : sur-titre en dégradé, texte secondaire et boutons en dégradé.

## Boutons sur les visuels

Sur le globe et sur le dégradé en trame, les boutons sont en encre avec le texte en clair, comme dans le Figma. Ailleurs, le bouton principal garde le dégradé signature.
