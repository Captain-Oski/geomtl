-- ============================================================
-- Migration  : V002__profiles
-- Description: Table profiles, trigger création auto OAuth,
--              fonction get_my_role() (dépend de profiles),
--              politiques RLS.
-- Dépend de  : V001__extensions_et_fonctions
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- TABLE : profiles
-- Créée automatiquement à chaque connexion Google OAuth.
-- Rôle NULL par défaut — l'admin attribue manuellement :
--   UPDATE geomtl2027.profiles SET role = 'admin' WHERE email = 'ton@email.com';
-- ────────────────────────────────────────────────────────────
create table if not exists geomtl2027.profiles (
  id         uuid        references auth.users on delete cascade primary key,
  email      text        not null,
  full_name  text,
  role       text        check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- Fonction RLS : retourne le rôle de l'utilisateur connecté.
-- Créée ICI (après profiles) car elle référence la table.
-- security definer = s'exécute avec les droits du propriétaire.
-- ────────────────────────────────────────────────────────────
create or replace function geomtl2027.get_my_role()
returns text as $$
  select role from geomtl2027.profiles where id = auth.uid()
$$ language sql security definer stable;

-- ────────────────────────────────────────────────────────────
-- TRIGGER : création du profil à la première connexion OAuth
-- ────────────────────────────────────────────────────────────
create or replace function geomtl2027.handle_new_user()
returns trigger as $$
begin
  insert into geomtl2027.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure geomtl2027.handle_new_user();

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
alter table geomtl2027.profiles enable row level security;

create policy "Profil : lecture personnelle"
  on geomtl2027.profiles for select
  using (auth.uid() = id);

create policy "Admin : lecture tous les profils"
  on geomtl2027.profiles for select
  using (geomtl2027.get_my_role() = 'admin');

create policy "Admin : modification des profils"
  on geomtl2027.profiles for update
  using  (geomtl2027.get_my_role() = 'admin')
  with check (geomtl2027.get_my_role() = 'admin');

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop trigger if exists on_auth_user_created on auth.users;
-- drop function if exists geomtl2027.handle_new_user();
-- drop function if exists geomtl2027.get_my_role();
-- drop table if exists geomtl2027.profiles cascade;
