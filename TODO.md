# GeoMTL 2027 — TODO : Production Ready

Liste des tâches à compléter avant la mise en ligne. Organisée par priorité.

---

## 🔴 Critique — Bloquant pour le lancement

### Infrastructure Supabase
- [x] Créer le projet Supabase (geomtl-2027)
- [x] Exécuter les migrations SQL dans l'ordre (`V001` → `V005`) via le SQL Editor
- [x] Configurer Auth
- [x] Se connecter une première fois et attribuer le rôle admin :
  ```sql
  UPDATE public.profiles SET role = 'admin' WHERE email = 'ton@email.com';
  ```
- [x] Configurer les variables d'environnement sur Vercel :
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Déploiement
- [ ] Connecter le repo GitHub à Vercel
- [ ] Configurer `NEXT_PUBLIC_SITE_URL` en production (nécessaire pour les emails d'invitation)
- [ ] Configurer le domaine personnalisé (ex. `geomtl.com`)
- [ ] Vérifier que le build passe sans erreur (`npm run build`)
- [ ] Tester l'auth Google OAuth en production (redirect URI Supabase à jour)

---

## 🟠 Important — Avant les premières utilisations réelles

### Données réelles
- [ ] Remplacer les données mock par les vrais partenaires et exposants
- [ ] Collecter et téléverser les vrais logos (voir section Stockage)
- [ ] Vérifier toutes les URLs de sites web

### Stockage des logos (Supabase Storage)
- [ ] Créer un bucket `logos` dans Supabase Storage (accès public en lecture)
- [ ] Configurer les politiques RLS du bucket (upload réservé aux editor/admin)
- [ ] Ajouter un champ d'upload de fichier dans `PartnerForm` et `ExhibitorForm`

### Contenu public du site
- [ ] Rédiger les vraies descriptions (FR + EN) pour chaque partenaire confirmé
- [ ] Compléter les traductions anglaises dans `messages/en.json`
- [ ] Vérifier et compléter `messages/fr.json`

### SEO & Métadonnées
- [ ] Ajouter `metadata` (title, description, og:image) dans chaque page publique
- [ ] Générer un favicon et les icônes d'application
- [ ] Créer `public/robots.txt` et `sitemap.xml`

---

## 🟡 À faire — Avant l'événement

### Fonctionnalités manquantes
- [ ] **Page d'erreur 404** (`app/not-found.tsx`) avec lien retour accueil
- [ ] **Page d'erreur 500** (`app/error.tsx`) pour les erreurs serveur
- [ ] **Section exposants publique** (`PublicExhibitorsSection`) sur le site public
- [ ] **Section carte du salon** — plan interactif des kiosques (voir IDEAS.md)
- [ ] **Page agenda/programme** — liste des sessions et présentations
- [ ] **Recherche** dans la liste publique des exposants/partenaires

### Admin — Modules manquants
- [ ] `/admin/contacts` — gestion des contacts liés aux partenaires/exposants
- [ ] `/admin/activations` — programme des activations partenaires
- [ ] `/admin/contracts` — suivi des contrats (admin seulement)
- [ ] `/admin/deliverables` — suivi des livrables
- [ ] `/admin/kpis` — tableau de bord KPI avec graphiques

### Admin — Améliorations
- [ ] **Export CSV** de la liste des partenaires / exposants
- [ ] **Pagination** dans les tableaux admin (si > 50 entrées)
- [ ] **Historique des modifications** par partenaire (audit log)
- [ ] **Gestion des utilisateurs admin** — interface pour attribuer les rôles (pas juste SQL)

### Sécurité
- [ ] Revoir les politiques RLS (tester avec différents rôles)
- [ ] Ajouter un rate limiting sur les routes `/auth/*`
- [ ] Configurer les headers de sécurité dans `next.config.js`

---

## 🟢 Souhaitable — Avant / pendant l'événement

### Qualité
- [ ] Tests de base (au moins les Server Actions critiques)
- [ ] Vérification accessibilité (contraste, navigation clavier, ARIA)
- [ ] Test sur mobile (responsive de l'admin et du site public)
- [ ] Optimisation des images (utiliser `next/image` partout)

### Monitoring
- [ ] Configurer Vercel Analytics (ou Plausible pour RGPD-friendly)
- [ ] Activer les logs d'erreur Supabase
- [ ] Mettre en place une alerte email si le site tombe

---

## ✅ Complété

- [x] Authentification Google OAuth avec rôles (admin/editor/viewer)
- [x] Module partenaires complet (CRUD + dashboard + filtres + formulaire)
- [x] Module exposants complet (CRUD + dashboard + filtres + formulaire)
- [x] Migrations SQL numérotées (V001–V005) avec CHANGELOG
- [x] Section partenaires publique (`PublicPartnersSection`)
- [x] Mode mock (développement sans Supabase)
- [x] Internationalisation FR/EN (next-intl)
- [x] Protection des routes `/admin` par middleware
- [x] Logo GeoMTL 2027 — dégradé crème→violet (`GeoMtl2027_v3_creme-violet.svg`) dans header, footer et hero
- [x] Hero animé — isolignes ondulantes 60fps via GSAP (`IsolineRipple` component)
- [x] Hero pleine largeur — animation bord à bord, fond transparent sur `bg-deep-blue`
- [x] Bouton CTA renommé « Participer » (FR) / « Participate » (EN) — moins commercial
- [x] Page actualités avec articles, catégories et sidebar articles connexes
- [x] Bannière cookie conforme Loi 25 (Québec)
