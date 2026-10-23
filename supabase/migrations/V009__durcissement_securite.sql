-- ============================================================
-- Migration  : V009__durcissement_securite
-- Description: Corrige les avertissements de sécurité Supabase propres au
--              schéma geomtl2027 (conseiller « Security Advisor »).
-- Dépend de  : V001 (set_updated_at), V002 (get_my_role, handle_new_user),
--              V004 à V006 (vues publiques)
-- Auteur     : GéoMTL
-- Date       : 2026-10-23
-- Rollback   : voir section ROLLBACK en bas
--
-- Ce que la migration fait :
--   1. search_path fixé à vide sur les trois fonctions : leurs corps
--      n'utilisent que des noms qualifiés (geomtl2027.profiles, auth.uid())
--      ou des fonctions de pg_catalog (now, coalesce).
--   2. handle_new_user n'est plus exécutable par PUBLIC, anon ni
--      authenticated : c'est une fonction de déclencheur (création du profil
--      à l'inscription), personne ne doit pouvoir l'appeler par l'API.
--
-- Ce qu'elle ne fait pas, volontairement :
--   - get_my_role reste exécutable par anon : des règles RLS qui s'appliquent
--     à tous les rôles l'appellent (sessions, partners, exhibitors...). La
--     retirer ferait échouer les lectures anonymes au lieu de les filtrer.
--     Pour un visiteur, elle renvoie seulement null.
--   - Les vues public_*_view restent en SECURITY DEFINER : elles n'exposent
--     que les colonnes publiques des fiches publiées. Les passer en
--     security_invoker obligerait à ouvrir les tables elles-mêmes au rôle anon.
-- ============================================================

-- 1. search_path fixe
alter function geomtl2027.get_my_role() set search_path = '';
alter function geomtl2027.handle_new_user() set search_path = '';
alter function geomtl2027.set_updated_at() set search_path = '';

-- 2. Fonction de déclencheur hors de portée de l'API. Le service Auth de
--    Supabase, qui crée les comptes, garde le droit explicitement.
revoke execute on function geomtl2027.handle_new_user() from public, anon, authenticated;
grant execute on function geomtl2027.handle_new_user() to supabase_auth_admin;

-- 3. Documentation des choix ci-dessus, visible dans le tableau de bord
comment on function geomtl2027.get_my_role() is
  'Rôle GÉOMTL de l''utilisateur connecté (null pour un visiteur). Exécutable par anon : utilisée par des règles RLS qui s''appliquent à tous les rôles.';
comment on view geomtl2027.public_partners_view is
  'Partenaires publiés, colonnes publiques seulement. SECURITY DEFINER voulu : évite d''ouvrir la table partners au rôle anon.';
comment on view geomtl2027.public_exhibitors_view is
  'Exposants publiés, colonnes publiques seulement. SECURITY DEFINER voulu : évite d''ouvrir la table exhibitors au rôle anon.';
comment on view geomtl2027.public_sessions_view is
  'Sessions publiées, colonnes publiques seulement. SECURITY DEFINER voulu : évite d''ouvrir la table sessions au rôle anon.';

-- ============================================================
-- ROLLBACK
-- ============================================================
-- alter function geomtl2027.get_my_role() reset search_path;
-- alter function geomtl2027.handle_new_user() reset search_path;
-- alter function geomtl2027.set_updated_at() reset search_path;
-- grant execute on function geomtl2027.handle_new_user() to public, anon, authenticated;
-- revoke execute on function geomtl2027.handle_new_user() from supabase_auth_admin;
