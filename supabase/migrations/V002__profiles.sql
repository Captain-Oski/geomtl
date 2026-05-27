-- ============================================================
-- Migration  : V002__profiles
-- Description: Table profiles (liée à auth.users), trigger de
--              création automatique à l'inscription Google OAuth,
--              politiques RLS
-- Dépend de  : V001__extensions_et_fonctions
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- TABLE : profiles
-- Créée automatiquement à chaque nouvelle connexion Google OAuth
-- Le rôle est NULL par défaut — l'admin doit l'attribuer manuellement :
--   UPDATE public.profiles SET role = 'admin' WHERE email = 'votre@email.com';
-- ────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid        references auth.users on delete cascade primary key,
  email      text        not null,
  full_name  text,
  role       text        check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- TRIGGER : création du profil à l'inscription
-- S'exécute sur auth.users (géré par Supabase Auth)
-- ────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
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
  for each row execute procedure public.handle_new_user();

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- Un utilisateur peut lire son propre profil
create policy "Profil : lecture personnelle"
  on public.profiles for select
  using (auth.uid() = id);

-- Un admin peut lire tous les profils
create policy "Admin : lecture tous les profils"
  on public.profiles for select
  using (public.get_my_role() = 'admin');

-- Un admin peut modifier les rôles
create policy "Admin : modification des profils"
  on public.profiles for update
  using  (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop trigger if exists on_auth_user_created on auth.users;
-- drop function if exists public.handle_new_user();
-- drop table if exists public.profiles cascade;
