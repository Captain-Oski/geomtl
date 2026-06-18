-- ============================================================
-- Migration  : V004__partners
-- Description: Table partners complète, trigger updated_at, RLS,
--              vue publique, FK vers tables support, seed.
-- Dépend de  : V001, V003__tables_support
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

drop table if exists geomtl2027.partners cascade;

create table geomtl2027.partners (
  id uuid primary key default uuid_generate_v4(),

  company_name          text        not null,
  public_name           text,
  partner_type          text        not null
    check (partner_type in ('Platinum', 'Gold', 'Silver', 'Bronze', 'Exhibitor', 'Other')),
  status                text        not null default 'prospect'
    check (status in ('prospect','contacted','confirmed','invoiced','paid',
                      'assets_pending','ready_to_publish','published','cancelled')),
  year                  integer     not null default 2027,

  website_url           text,
  description_fr        text,
  description_en        text,
  logo_url              text,
  logo_alt_text         text,
  public_visibility     boolean     not null default false,
  display_order         integer     not null default 10,
  featured              boolean     not null default false,

  primary_contact_name    text,
  primary_contact_email   text,
  primary_contact_phone   text,
  secondary_contact_name  text,
  secondary_contact_email text,
  notes_contact           text,

  communication_date          date,
  invoice_sent_date           date,
  payment_received_date       date,
  information_requested_date  date,
  follow_up_date              date,
  contract_url                text,
  invoice_url                 text,
  payment_status              text not null default 'unpaid'
    check (payment_status in ('unpaid','pending','paid','cancelled')),
  internal_notes              text,

  promo_code              text,
  booth_number            text,
  booth_status            text not null default 'not_required'
    check (booth_status in ('not_required','to_assign','assigned','confirmed')),
  activation_type         text,
  activation_description  text,
  deliverables            text,
  deadlines               text,
  logo_received           boolean not null default false,
  company_name_confirmed  boolean not null default false,
  description_received    boolean not null default false,

  internal_owner_name   text,
  internal_owner_email  text,
  committee_owner       text,
  last_updated_by       text,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  archived_at   timestamptz,

  constraint unique_partner_booth_per_year unique (booth_number, year),
  constraint unique_partner_promo_per_year unique (promo_code, year)
);

-- ────────────────────────────────────────────────────────────
-- TRIGGER updated_at
-- ────────────────────────────────────────────────────────────
drop trigger if exists partners_updated_at on geomtl2027.partners;

create trigger partners_updated_at
  before update on geomtl2027.partners
  for each row execute function geomtl2027.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- FK vers tables support (recréées après DROP CASCADE)
-- ────────────────────────────────────────────────────────────
alter table geomtl2027.contracts
  drop constraint if exists contracts_partner_id_fkey;
alter table geomtl2027.contracts
  add constraint contracts_partner_id_fkey
  foreign key (partner_id) references geomtl2027.partners(id) on delete set null;

alter table geomtl2027.contacts
  drop constraint if exists contacts_partner_id_fkey;
alter table geomtl2027.contacts
  add constraint contacts_partner_id_fkey
  foreign key (partner_id) references geomtl2027.partners(id) on delete set null;

alter table geomtl2027.activations
  drop constraint if exists activations_partner_id_fkey;
alter table geomtl2027.activations
  add constraint activations_partner_id_fkey
  foreign key (partner_id) references geomtl2027.partners(id) on delete set null;

alter table geomtl2027.deliverables
  drop constraint if exists deliverables_partner_id_fkey;
alter table geomtl2027.deliverables
  add constraint deliverables_partner_id_fkey
  foreign key (partner_id) references geomtl2027.partners(id) on delete set null;

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
alter table geomtl2027.partners enable row level security;

create policy "Public : lecture partenaires publiés"
  on geomtl2027.partners for select
  using (public_visibility = true and status = 'published' and archived_at is null);

create policy "Auth : lecture tous les partenaires"
  on geomtl2027.partners for select
  using (auth.uid() is not null and geomtl2027.get_my_role() is not null);

create policy "Editor/Admin : création partenaire"
  on geomtl2027.partners for insert
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));

create policy "Editor/Admin : modification partenaire"
  on geomtl2027.partners for update
  using  (geomtl2027.get_my_role() in ('admin', 'editor'))
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression partenaire"
  on geomtl2027.partners for delete
  using (geomtl2027.get_my_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- VUE PUBLIQUE
-- ────────────────────────────────────────────────────────────
create or replace view geomtl2027.public_partners_view as
  select
    id, company_name, public_name, partner_type,
    website_url, description_fr, description_en,
    logo_url, logo_alt_text, display_order, featured, year
  from geomtl2027.partners
  where public_visibility = true and status = 'published' and archived_at is null
  order by display_order asc;

-- ────────────────────────────────────────────────────────────
-- SEED
-- ────────────────────────────────────────────────────────────
insert into geomtl2027.partners (
  company_name, public_name, partner_type, status, year,
  website_url, description_fr, description_en,
  logo_alt_text, public_visibility, display_order, featured,
  primary_contact_name, primary_contact_email,
  payment_status, payment_received_date,
  logo_received, company_name_confirmed, description_received,
  internal_owner_name, internal_owner_email
) values
(
  'Esri Canada', 'Esri Canada', 'Platinum', 'published', 2027,
  'https://www.esri.ca',
  'Leader mondial des SIG et solutions géospatiales.',
  'Global leader in GIS and geospatial solutions.',
  'Logo Esri Canada', true, 1, true,
  'Marie Dupont', 'marie.dupont@esri.ca',
  'paid', current_date - 200,
  true, true, true, 'Sophie Martin', 'sophie@geomtl.com'
),
(
  'Ville de Montréal', 'Ville de Montréal', 'Gold', 'invoiced', 2027,
  'https://montreal.ca',
  'La métropole du Québec, partenaire institutionnel fondateur.',
  'Quebec metropolis, founding institutional partner.',
  'Logo Ville de Montréal', false, 2, false,
  'Jean Tremblay', 'j.tremblay@montreal.ca',
  'pending', null,
  false, true, false, 'Marc Bouchard', 'marc@geomtl.com'
),
(
  'Microsoft Canada', 'Microsoft', 'Silver', 'ready_to_publish', 2027,
  'https://microsoft.com/ca',
  'Technologies cloud et IA pour le géospatial.',
  'Cloud and AI technologies for geospatial.',
  'Logo Microsoft', false, 3, false,
  'Lisa Wong', 'lwong@microsoft.com',
  'paid', current_date - 80,
  true, true, true, 'Sophie Martin', 'sophie@geomtl.com'
),
(
  'GeoAI Lab', 'GeoAI Lab', 'Bronze', 'contacted', 2027,
  'https://geoai.ca',
  'IA appliquée aux données géospatiales.',
  'AI applied to geospatial data.',
  null, false, 20, false,
  'Dr. Fatima Khalil', 'fkhalil@geoai.ca',
  'unpaid', null,
  false, false, false, 'Sophie Martin', 'sophie@geomtl.com'
);

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop view if exists geomtl2027.public_partners_view;
-- drop table if exists geomtl2027.partners cascade;
