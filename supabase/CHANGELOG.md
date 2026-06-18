# GeoMTL 2027 — Journal des migrations SQL Supabase

Toutes les migrations sont dans [`supabase/migrations/`](./migrations/).  
À exécuter **dans l'ordre numérique** dans le SQL Editor de Supabase.

## Statuts

| Icône | Signification |
|-------|---------------|
| ✅ | Appliqué en production |
| ⏳ | Prêt à exécuter |
| 🚧 | En développement / non finalisé |
| ❌ | Annulé / remplacé |

---

## Migrations

| # | Fichier | Description | Date | Statut |
|---|---------|-------------|------|--------|
| V000 | [V000__schema_geomtl2027.sql](./migrations/V000__schema_geomtl2027.sql) | Création du schéma `geomtl2027` · grants anon/authenticated/service_role | 2025-05-27 | ⏳ |
| V001 | [V001__extensions_et_fonctions.sql](./migrations/V001__extensions_et_fonctions.sql) | Extension UUID · fonction `set_updated_at()` | 2025-05-27 | ⏳ |
| V002 | [V002__profiles.sql](./migrations/V002__profiles.sql) | Table `profiles` · fonction `get_my_role()` · trigger OAuth · RLS | 2025-05-27 | ⏳ |
| V003 | [V003__tables_support.sql](./migrations/V003__tables_support.sql) | Tables `contracts`, `contacts`, `activations`, `deliverables`, `kpis` · RLS | 2025-05-27 | ⏳ |
| V004 | [V004__partners.sql](./migrations/V004__partners.sql) | Table `partners` complète · trigger · RLS · vue publique · seed | 2025-05-27 | ⏳ |
| V005 | [V005__exhibitors.sql](./migrations/V005__exhibitors.sql) | Table `exhibitors` complète · trigger · RLS · vue publique · seed | 2025-05-27 | ⏳ |

---

## Comment exécuter une migration

1. Ouvrir **Supabase Dashboard → SQL Editor → New query**
2. Coller le contenu du fichier de migration
3. Cliquer **Run**
4. Mettre à jour ce tableau (changer ⏳ → ✅ et noter la date réelle)

## Ordre d'exécution obligatoire

```
V000 → V001 → V002 → V003 → V004 → V005
```

**V000** doit être la toute première — elle crée le schéma `geomtl2027`.  
**V002** doit suivre V001 — `get_my_role()` référence la table `profiles` créée dans V002.  
**V003** doit précéder V004 et V005 — ces dernières ajoutent des FK vers les tables de support.

## Étape obligatoire après V000

Dans **Supabase Dashboard → Settings → API → Extra search path**, ajouter :
```
geomtl2027
```
Sans ça, les queries du client TypeScript ne trouveront pas les tables.

---

## Configuration Google OAuth (à faire une seule fois)

1. Supabase Dashboard → **Authentication → Providers → Google → Enable**
2. Ajouter Client ID + Client Secret (Google Cloud Console)
3. Google Cloud Console → Credentials → OAuth 2.0 :
   - Redirect URI : `https://<projet>.supabase.co/auth/v1/callback`
4. Après votre première connexion, attribuer votre rôle admin :
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE email = 'votre@email.com';
   ```

## Variables d'environnement (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key   ← serveur uniquement, jamais exposé
```

---

## Fichiers dépréciés

Ces fichiers à la racine de `supabase/` sont remplacés par les migrations numérotées ci-dessus.
Ils peuvent être supprimés une fois les migrations appliquées.

| Fichier | Remplacé par |
|---------|-------------|
| `schema.sql` | V001 + V002 + V003 (partiel) |
| `partners.sql` | V004 |
| `exhibitors.sql` | V005 |
