-- ============================================================
-- GeoMTL 2027 — Schéma Supabase
-- Coller dans : Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ÉTAPES DE CONFIGURATION GOOGLE OAUTH
-- 1. Supabase Dashboard > Authentication > Providers > Google > Enable
-- 2. Ajouter Client ID + Client Secret (depuis Google Cloud Console)
-- 3. Google Cloud Console > APIs & Services > Credentials > OAuth 2.0 :
--    Redirect URI : https://<votre-projet>.supabase.co/auth/v1/callback
-- 4. Après votre première connexion, attribuer votre rôle :
--    UPDATE public.profiles SET role = 'admin' WHERE email = 'votre@email.com';

-- VARIABLES D'ENVIRONNEMENT (.env.local)
-- NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
-- SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key  (côté serveur uniquement)

-- ============================================================
-- TABLES
-- ============================================================

create extension if not exists "uuid-ossp";

-- Profils (liés à auth.users — rôle NULL = non autorisé)
create table public.profiles (
  id         uuid references auth.users on delete cascade primary key,
  email      text        not null,
  full_name  text,
  role       text        check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now()
);

-- Partenaires
create table public.partners (
  id                 uuid        primary key default uuid_generate_v4(),
  name               text        not null,
  logo_url           text,
  website_url        text,
  level              text        not null default 'communaute',
  description_fr     text,
  description_en     text,
  public_visibility  boolean     not null default false,
  status             text        not null default 'pending'
                                 check (status in ('confirmed', 'pending', 'cancelled')),
  logo_validated     boolean     not null default false,
  created_at         timestamptz not null default now()
);

-- Exposants
create table public.exhibitors (
  id                 uuid        primary key default uuid_generate_v4(),
  name               text        not null,
  logo_url           text,
  website_url        text,
  sector             text,
  description_fr     text,
  description_en     text,
  booth_number       text,
  public_visibility  boolean     not null default false,
  status             text        not null default 'pending'
                                 check (status in ('confirmed', 'pending', 'cancelled')),
  logo_validated     boolean     not null default false,
  created_at         timestamptz not null default now()
);

-- Contrats
create table public.contracts (
  id            uuid        primary key default uuid_generate_v4(),
  partner_id    uuid        references public.partners(id)   on delete set null,
  exhibitor_id  uuid        references public.exhibitors(id) on delete set null,
  amount        numeric(10,2),
  status        text        not null default 'draft'
                            check (status in ('draft', 'sent', 'signed', 'cancelled')),
  signed_at     timestamptz,
  notes         text,
  created_at    timestamptz not null default now()
);

-- Contacts
create table public.contacts (
  id            uuid        primary key default uuid_generate_v4(),
  partner_id    uuid        references public.partners(id)   on delete set null,
  exhibitor_id  uuid        references public.exhibitors(id) on delete set null,
  full_name     text        not null,
  email         text        not null,
  phone         text,
  role          text,
  is_primary    boolean     not null default false,
  created_at    timestamptz not null default now()
);

-- Activations partenaires
create table public.activations (
  id                 uuid        primary key default uuid_generate_v4(),
  partner_id         uuid        references public.partners(id) on delete set null,
  title_fr           text        not null,
  title_en           text,
  description_fr     text,
  description_en     text,
  public_visibility  boolean     not null default false,
  status             text        not null default 'planned'
                                 check (status in ('planned', 'active', 'completed', 'cancelled')),
  created_at         timestamptz not null default now()
);

-- Livrables
create table public.deliverables (
  id            uuid        primary key default uuid_generate_v4(),
  partner_id    uuid        references public.partners(id)   on delete set null,
  exhibitor_id  uuid        references public.exhibitors(id) on delete set null,
  title         text        not null,
  due_date      date,
  status        text        not null default 'pending'
                            check (status in ('pending', 'in_progress', 'completed', 'overdue')),
  notes         text,
  created_at    timestamptz not null default now()
);

-- KPIs
create table public.kpis (
  id           uuid        primary key default uuid_generate_v4(),
  metric_name  text        not null,
  value        numeric     not null,
  unit         text,
  recorded_at  timestamptz not null default now(),
  notes        text
);

-- ============================================================
-- TRIGGER : création automatique du profil à l'inscription
-- Le rôle est NULL par défaut — l'admin doit l'attribuer manuellement
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- FONCTIONS HELPERS RLS
-- ============================================================

create or replace function public.get_my_role()
returns text as $$
  select role from public.profiles where id = auth.uid()
$$ language sql security definer stable;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles    enable row level security;
alter table public.partners    enable row level security;
alter table public.exhibitors  enable row level security;
alter table public.contracts   enable row level security;
alter table public.contacts    enable row level security;
alter table public.activations enable row level security;
alter table public.deliverables enable row level security;
alter table public.kpis        enable row level security;

-- -------- PROFILES --------
create policy "Lecture profil personnel"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admin : lecture tous les profils"
  on public.profiles for select
  using (public.get_my_role() = 'admin');

create policy "Admin : modification des profils"
  on public.profiles for update
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

-- -------- PARTNERS --------
-- Lecture publique : visible + confirmé + logo validé
create policy "Public : partenaires visibles"
  on public.partners for select
  using (public_visibility = true and status = 'confirmed' and logo_validated = true);

-- Lecture authentifiée (avec rôle) : tout
create policy "Auth : lecture tous les partenaires"
  on public.partners for select
  using (auth.uid() is not null and public.get_my_role() is not null);

create policy "Editor/Admin : ajout partenaires"
  on public.partners for insert
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Editor/Admin : modification partenaires"
  on public.partners for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression partenaires"
  on public.partners for delete
  using (public.get_my_role() = 'admin');

-- -------- EXHIBITORS --------
create policy "Public : exposants visibles"
  on public.exhibitors for select
  using (public_visibility = true and status = 'confirmed' and logo_validated = true);

create policy "Auth : lecture tous les exposants"
  on public.exhibitors for select
  using (auth.uid() is not null and public.get_my_role() is not null);

create policy "Editor/Admin : ajout exposants"
  on public.exhibitors for insert
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Editor/Admin : modification exposants"
  on public.exhibitors for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression exposants"
  on public.exhibitors for delete
  using (public.get_my_role() = 'admin');

-- -------- CONTRACTS (admin seulement) --------
create policy "Admin : lecture contrats"
  on public.contracts for select
  using (public.get_my_role() = 'admin');

create policy "Admin : ajout contrats"
  on public.contracts for insert
  with check (public.get_my_role() = 'admin');

create policy "Admin : modification contrats"
  on public.contracts for update
  using  (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "Admin : suppression contrats"
  on public.contracts for delete
  using (public.get_my_role() = 'admin');

-- -------- CONTACTS --------
create policy "Auth : lecture contacts"
  on public.contacts for select
  using (auth.uid() is not null and public.get_my_role() is not null);

create policy "Editor/Admin : ajout contacts"
  on public.contacts for insert
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Editor/Admin : modification contacts"
  on public.contacts for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression contacts"
  on public.contacts for delete
  using (public.get_my_role() = 'admin');

-- -------- ACTIVATIONS --------
create policy "Public : activations visibles"
  on public.activations for select
  using (public_visibility = true and status in ('active', 'completed'));

create policy "Auth : lecture toutes les activations"
  on public.activations for select
  using (auth.uid() is not null and public.get_my_role() is not null);

create policy "Editor/Admin : ajout activations"
  on public.activations for insert
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Editor/Admin : modification activations"
  on public.activations for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression activations"
  on public.activations for delete
  using (public.get_my_role() = 'admin');

-- -------- DELIVERABLES --------
create policy "Auth : lecture livrables"
  on public.deliverables for select
  using (auth.uid() is not null and public.get_my_role() is not null);

create policy "Editor/Admin : ajout livrables"
  on public.deliverables for insert
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Editor/Admin : modification livrables"
  on public.deliverables for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression livrables"
  on public.deliverables for delete
  using (public.get_my_role() = 'admin');

-- -------- KPIs --------
create policy "Auth : lecture KPIs"
  on public.kpis for select
  using (auth.uid() is not null and public.get_my_role() is not null);

create policy "Admin : ajout KPIs"
  on public.kpis for insert
  with check (public.get_my_role() = 'admin');

create policy "Admin : modification KPIs"
  on public.kpis for update
  using  (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "Admin : suppression KPIs"
  on public.kpis for delete
  using (public.get_my_role() = 'admin');
