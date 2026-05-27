-- ============================================================
-- Migration  : V005__exhibitors
-- Description: Table exhibitors complète (40+ champs), trigger
--              updated_at, RLS, vue publique, données initiales.
--              Remplace toute version antérieure de la table.
-- Dépend de  : V001__extensions_et_fonctions, V003__tables_support
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

-- Suppression de l'ancienne version (CASCADE retire les FK dépendantes)
drop table if exists public.exhibitors cascade;

-- ────────────────────────────────────────────────────────────
-- TABLE : exhibitors
-- ────────────────────────────────────────────────────────────
create table public.exhibitors (
  id uuid primary key default uuid_generate_v4(),

  -- Identité
  company_name    text        not null,
  public_name     text,
  sector          text,
  year            integer     not null default 2027,

  -- Visibilité publique
  website_url     text,
  description_fr  text,
  description_en  text,
  logo_url        text,
  logo_alt_text   text,
  public_visibility  boolean  not null default false,
  display_order      integer  not null default 10,
  featured           boolean  not null default false,

  -- Contact
  primary_contact_name    text,
  primary_contact_email   text,
  primary_contact_phone   text,
  secondary_contact_name  text,
  secondary_contact_email text,
  notes_contact           text,

  -- Suivi administratif
  status                text  not null default 'prospect'
    check (status in ('prospect','contacted','confirmed','invoiced','paid',
                      'assets_pending','ready_to_publish','published','cancelled')),
  communication_date    date,
  invoice_sent_date     date,
  payment_received_date date,
  follow_up_date        date,
  contract_url          text,
  invoice_url           text,
  payment_status        text  not null default 'unpaid'
    check (payment_status in ('unpaid','pending','paid','cancelled')),
  internal_notes        text,

  -- Kiosque
  booth_number    text,
  booth_size      text  not null default 'standard'
    check (booth_size in ('standard','double','corner','island')),
  booth_zone      text,
  booth_status    text  not null default 'not_required'
    check (booth_status in ('not_required','to_assign','assigned','confirmed')),
  setup_date      date,
  teardown_date   date,

  -- Actifs / Livrables
  logo_received           boolean not null default false,
  logo_validated          boolean not null default false,
  company_name_confirmed  boolean not null default false,
  description_received    boolean not null default false,
  materials_received      boolean not null default false,
  promo_code              text,

  -- Responsables internes
  internal_owner_name   text,
  internal_owner_email  text,
  committee_owner       text,
  last_updated_by       text,

  -- Métadonnées
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  archived_at   timestamptz,

  -- Unicité par année
  constraint unique_exhibitor_booth_per_year unique (booth_number, year),
  constraint unique_exhibitor_promo_per_year unique (promo_code, year)
);

-- ────────────────────────────────────────────────────────────
-- TRIGGER : updated_at automatique
-- ────────────────────────────────────────────────────────────
drop trigger if exists exhibitors_updated_at on public.exhibitors;

create trigger exhibitors_updated_at
  before update on public.exhibitors
  for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- FK vers tables support (recréées après DROP CASCADE)
-- ────────────────────────────────────────────────────────────
alter table public.contracts
  drop constraint if exists contracts_exhibitor_id_fkey;
alter table public.contracts
  add constraint contracts_exhibitor_id_fkey
  foreign key (exhibitor_id) references public.exhibitors(id) on delete set null;

alter table public.contacts
  drop constraint if exists contacts_exhibitor_id_fkey;
alter table public.contacts
  add constraint contacts_exhibitor_id_fkey
  foreign key (exhibitor_id) references public.exhibitors(id) on delete set null;

alter table public.deliverables
  drop constraint if exists deliverables_exhibitor_id_fkey;
alter table public.deliverables
  add constraint deliverables_exhibitor_id_fkey
  foreign key (exhibitor_id) references public.exhibitors(id) on delete set null;

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
alter table public.exhibitors enable row level security;

create policy "Public : lecture exposants publiés"
  on public.exhibitors for select
  using (
    public_visibility = true
    and status = 'published'
    and archived_at is null
  );

create policy "Auth : lecture tous les exposants"
  on public.exhibitors for select
  using (auth.uid() is not null and public.get_my_role() is not null);

create policy "Editor/Admin : création exposant"
  on public.exhibitors for insert
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Editor/Admin : modification exposant"
  on public.exhibitors for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression exposant"
  on public.exhibitors for delete
  using (public.get_my_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- VUE PUBLIQUE (champs non sensibles uniquement)
-- ────────────────────────────────────────────────────────────
create or replace view public.public_exhibitors_view as
  select
    id, company_name, public_name, sector,
    website_url, description_fr, description_en,
    logo_url, logo_alt_text, display_order, featured,
    booth_number, year
  from public.exhibitors
  where
    public_visibility = true
    and status        = 'published'
    and archived_at   is null
  order by display_order asc;

-- ────────────────────────────────────────────────────────────
-- DONNÉES INITIALES (seed)
-- ────────────────────────────────────────────────────────────
insert into public.exhibitors (
  company_name, public_name, sector, year,
  website_url, description_fr, description_en,
  logo_alt_text, public_visibility, display_order, featured,
  primary_contact_name, primary_contact_email,
  status, payment_status, payment_received_date,
  booth_number, booth_size, booth_zone, booth_status,
  logo_received, logo_validated, company_name_confirmed, description_received, materials_received,
  internal_owner_name, internal_owner_email
) values
(
  'CartoCraft Solutions', 'CartoCraft', 'Cartographie', 2027,
  'https://cartcraft.io',
  'Outils professionnels de cartographie pour les équipes terrain.',
  'Professional mapping tools for field teams.',
  'Logo CartoCraft', true, 1, true,
  'Nadia Pelletier', 'nadia@cartcraft.io',
  'published', 'paid', current_date - 100,
  'A-01', 'double', 'Zone A – Entrée principale', 'confirmed',
  true, true, true, true, true,
  'Sophie Martin', 'sophie@geomtl.com'
),
(
  'DroneGeo Québec', 'DroneGeo QC', 'Télédétection / Drone', 2027,
  'https://dronegeo.qc.ca',
  'Acquisition de données par drone pour les professionnels du géospatial.',
  'Drone data acquisition for geospatial professionals.',
  null, false, 2, false,
  'Julien Côté', 'julien@dronegeo.qc.ca',
  'assets_pending', 'paid', current_date - 60,
  'A-03', 'standard', 'Zone A – Entrée principale', 'assigned',
  false, false, true, true, false,
  'Marc Bouchard', 'marc@geomtl.com'
),
(
  'GeoData Analytics Inc.', 'GeoData Analytics', 'Analyse de données', 2027,
  'https://geodata-analytics.com',
  'Plateforme analytique pour grandes données géospatiales.',
  'Analytics platform for large-scale geospatial data.',
  null, false, 3, false,
  'Sarah O''Brien', 'sobrien@geodata-analytics.com',
  'confirmed', 'pending', null,
  'B-07', 'standard', 'Zone B – Corridor central', 'assigned',
  false, false, true, false, false,
  'Sophie Martin', 'sophie@geomtl.com'
);

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop view if exists public.public_exhibitors_view;
-- drop table if exists public.exhibitors cascade;
