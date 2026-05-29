# GeoMTL 2027

Site web officiel de la conférence GeoMTL 2027 — le rendez-vous de la communauté géospatiale francophone.

![alt text](images/readme.png)

**3–5 octobre 2027 · Centre de congrès de Saint-Hyacinthe**

---

## Stack technique

- **Framework** : Next.js 14 (App Router, Server Components)
- **Langage** : TypeScript
- **Style** : Tailwind CSS (thème personnalisé deep-blue / rose-geo / orange-geo)
- **Animations** : Framer Motion (entrées) + GSAP (isolignes 60fps)
- **i18n** : next-intl (FR / EN)
- **Base de données** : Supabase (PostgreSQL + Auth + Storage)
- **Déploiement** : Vercel

---

## Démarrage local

```bash
npm install
cp .env.local.example .env.local   # remplir les clés Supabase
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Variables d'environnement requises

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # serveur uniquement, jamais exposé client
NEXT_PUBLIC_SITE_URL=               # pour les emails d'invitation (prod)
```

---

## Structure du projet

```
app/
  [locale]/           Pages publiques FR/EN (Next.js i18n routing)
  admin/              Interface de gestion (protégée, rôle admin/editor)
components/
  home/               Sections de la page d'accueil (Hero, Partners, etc.)
  layout/             Header, Footer, Navigation
  ui/                 Composants réutilisables (GeoMTLLogo, IsolineRipple, …)
data/                 Données mock et configuration de l'événement
lib/                  Utilitaires, client Supabase, actions serveur
messages/             Traductions FR/EN (next-intl)
logo/                 Fichiers SVG du logo GeoMTL 2027
```

---

## Logo

Le logo officiel est `logo/GeoMtl2027_v3_creme-violet.svg` — dégradé crème→violet en 7 paliers.

Le composant React `GeoMTLLogo` (header/footer) et le composant animé `IsolineRipple` (hero) utilisent tous deux les couleurs de ce SVG.

---

## Admin

Accessible à `/admin` après authentification Google OAuth.

Rôles : `admin` (accès complet) · `editor` (sans suppression) · `viewer` (lecture seule)

Pour attribuer le rôle admin à la première connexion :
```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'ton@email.com';
```

---

## Migrations SQL

Les migrations sont dans `supabase/migrations/` et numérotées `V001` → `V005`.  
Exécuter dans l'ordre via le SQL Editor de Supabase.
