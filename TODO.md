# GeoMTL 2027 — TODO : Production Ready

Liste des tâches à compléter avant la mise en ligne. Organisée par priorité.

---

## 🔴 Critique — Bloquant pour le lancement

### Infrastructure Supabase
- [x] Créer le projet Supabase (geomtl-2027)
- [x] Exécuter les migrations SQL dans l'ordre (`V001` → `V005`) via le SQL Editor
- [x] Configurer Auth
- [ ] Se connecter une première fois et attribuer le rôle admin :
  ```sql
  UPDATE public.profiles SET role = 'admin' WHERE email = 'ton@email.com';
  ```
- [ ] Configurer les variables d'environnement sur Vercel :
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Déploiement
- [ ] Connecter le repo GitHub à Vercel
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
  - Actuellement : champ texte URL uniquement
  - À faire : upload direct vers Supabase Storage + génération d'URL publique

### Contenu public du site
- [ ] Rédiger les vraies descriptions (FR + EN) pour chaque partenaire confirmé
- [ ] Compléter les traductions anglaises dans `messages/en.json`
- [ ] Vérifier et compléter `messages/fr.json`
- [ ] Rédiger la page d'accueil (texte de présentation de l'événement)
- [ ] Ajouter les dates et lieu de l'événement dans le contenu public

### SEO & Métadonnées
- [ ] Ajouter `metadata` (title, description, og:image) dans chaque page publique
- [ ] Générer un favicon et les icônes d'application
- [ ] Créer `public/robots.txt` et `sitemap.xml` (ou utiliser `next-sitemap`)

---

## 🟡 À faire — Avant l'événement

### Fonctionnalités manquantes
- [ ] **Page d'erreur 404** (`app/not-found.tsx`) avec lien retour accueil
- [ ] **Page d'erreur 500** (`app/error.tsx`) pour les erreurs serveur
- [ ] **Section exposants publique** (`PublicExhibitorsSection`) sur le site public
  - Similaire à `PublicPartnersSection` déjà créée pour les partenaires
- [ ] **Section carte du salon** — plan interactif des kiosques (voir IDEAS.md)
- [ ] **Page agenda/programme** — liste des sessions et présentations
- [ ] **Recherche** dans la liste publique des exposants/partenaires

### Admin — Améliorations
- [ ] **Export CSV** de la liste des partenaires / exposants
- [ ] **Pagination** dans les tableaux admin (si > 50 entrées)
- [ ] **Historique des modifications** par partenaire (audit log)
- [ ] **Validation de formulaire** plus robuste (email format, URL format)
- [ ] **Gestion des utilisateurs admin** — interface pour attribuer les rôles (pas juste SQL)
- [ ] **Modules manquants** dans l'admin :
  - [ ] `/admin/contacts` — gestion des contacts liés aux partenaires/exposants
  - [ ] `/admin/activations` — programme des activations partenaires
  - [ ] `/admin/contracts` — suivi des contrats (admin seulement)
  - [ ] `/admin/deliverables` — suivi des livrables
  - [ ] `/admin/kpis` — tableau de bord KPI avec graphiques

### Sécurité
- [ ] Revoir les politiques RLS (tester avec différents rôles)
- [ ] S'assurer que `SUPABASE_SERVICE_ROLE_KEY` n'est jamais exposé côté client
- [ ] Ajouter un rate limiting sur les routes `/auth/*`
- [ ] Configurer les headers de sécurité dans `next.config.js`
  (`X-Frame-Options`, `Content-Security-Policy`, etc.)

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
