-- ============================================================
-- V010 : adresse civique et téléphone de l'organisation
-- ============================================================
-- But        : le formulaire « Devenir partenaire ou exposant » demande
--              l'adresse civique et le téléphone de l'organisation ; ils
--              sont repris dans la fiche Partenaire ou Exposant de l'admin
--              quand le comité accepte la demande.
-- Dépend de  : V004 (partners), V005 (exhibitors), V007 (demandes_kiosques)
-- Auteur     : GéoMTL
-- Date       : 2026-10-26
-- Rollback   : voir section ROLLBACK en bas
--
-- Notes :
--   - Colonnes facultatives en base : les demandes et fiches existantes n'ont
--     pas ces informations. Le formulaire et la route du site les exigent pour
--     toute nouvelle demande.
--   - Aucune vue publique ne les expose (coordonnées réservées au comité).
-- ============================================================

alter table geomtl2027.demandes_kiosques
  add column if not exists organisation_adresse text
    check (organisation_adresse is null or char_length(organisation_adresse) between 5 and 300),
  add column if not exists organisation_telephone text
    check (organisation_telephone is null or char_length(organisation_telephone) between 7 and 40);

alter table geomtl2027.partners
  add column if not exists company_address text,
  add column if not exists company_phone text;

alter table geomtl2027.exhibitors
  add column if not exists company_address text,
  add column if not exists company_phone text;

-- ============================================================
-- ROLLBACK
-- ============================================================
-- alter table geomtl2027.demandes_kiosques drop column if exists organisation_adresse, drop column if exists organisation_telephone;
-- alter table geomtl2027.partners drop column if exists company_address, drop column if exists company_phone;
-- alter table geomtl2027.exhibitors drop column if exists company_address, drop column if exists company_phone;
