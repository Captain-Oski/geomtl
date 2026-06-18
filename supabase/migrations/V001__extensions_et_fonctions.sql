-- ============================================================
-- Migration  : V001__extensions_et_fonctions
-- Description: Extension UUID et fonction générique set_updated_at.
--              get_my_role() est dans V002 car elle dépend de
--              la table profiles qui n'existe pas encore ici.
-- Dépend de  : V000__schema_geomtl2027
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

-- Extension UUID (nécessaire pour uuid_generate_v4())
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- Fonction trigger générique : met à jour updated_at
-- Réutilisée par les triggers de toutes les tables métier
-- ────────────────────────────────────────────────────────────
create or replace function geomtl2027.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop function if exists geomtl2027.set_updated_at();
-- drop extension if exists "uuid-ossp";
