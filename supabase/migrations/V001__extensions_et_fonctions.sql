-- ============================================================
-- Migration  : V001__extensions_et_fonctions
-- Description: Extensions UUID, fonction helper RLS (get_my_role),
--              fonction générique updated_at pour triggers
-- Dépend de  : (aucune — doit être la première migration)
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

-- Extension UUID (nécessaire pour uuid_generate_v4())
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- Fonction RLS : retourne le rôle de l'utilisateur connecté
-- Utilisée dans toutes les politiques de sécurité
-- security definer = s'exécute avec les droits du propriétaire
-- ────────────────────────────────────────────────────────────
create or replace function public.get_my_role()
returns text as $$
  select role from public.profiles where id = auth.uid()
$$ language sql security definer stable;

-- ────────────────────────────────────────────────────────────
-- Fonction trigger générique : met à jour updated_at
-- Réutilisée par tous les triggers des tables métier
-- ────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- ROLLBACK (exécuter manuellement si besoin d'annuler)
-- ============================================================
-- drop function if exists public.get_my_role();
-- drop function if exists public.set_updated_at();
-- drop extension if exists "uuid-ossp";
