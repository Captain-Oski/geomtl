-- ============================================================
-- Migration  : V000__schema_geomtl2027
-- Description: Création du schéma isolé geomtl2027 et attribution
--              des permissions aux rôles Supabase.
--              À exécuter EN PREMIER, avant toutes les autres migrations.
--
-- Après l'exécution :
--   Supabase Dashboard → Settings → API → "Extra search path"
--   Ajouter : geomtl2027
-- ============================================================

create schema if not exists geomtl2027;

-- Accès au schéma pour les rôles Supabase
grant usage on schema geomtl2027 to anon, authenticated, service_role;

-- Permissions sur les objets existants
grant all on all tables    in schema geomtl2027 to anon, authenticated, service_role;
grant all on all sequences in schema geomtl2027 to anon, authenticated, service_role;
grant all on all routines  in schema geomtl2027 to anon, authenticated, service_role;

-- Permissions automatiques sur les futurs objets
alter default privileges in schema geomtl2027
  grant all on tables    to anon, authenticated, service_role;
alter default privileges in schema geomtl2027
  grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema geomtl2027
  grant all on routines  to anon, authenticated, service_role;

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop schema if exists geomtl2027 cascade;
