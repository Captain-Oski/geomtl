-- ============================================================
-- Migration  : V008__types_partenaires
-- Description: Types de partenaire limités aux niveaux vendus (Or, Argent,
--              Bronze) plus la commandite de la soirée réseautage
--              (Networking), et ce même niveau dans les demandes du site.
-- Dépend de  : V004 (partners), V007 (demandes_kiosques)
-- Auteur     : GéoMTL
-- Date       : 2026-10-23
-- Rollback   : voir section ROLLBACK en bas
--
-- Notes :
--   - La fiche d'exemple en Platine (Esri, créée par V004) passe à Or.
--   - Les exposants ont leur propre table : les types Exhibitor et Other ne
--     sont plus permis. Si une fiche les utilise encore, l'ajout de la
--     contrainte échoue et rien n'est modifié.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- PARTENAIRES
-- ────────────────────────────────────────────────────────────
update geomtl2027.partners
  set partner_type = 'Gold'
  where partner_type = 'Platinum';

alter table geomtl2027.partners
  drop constraint if exists partners_partner_type_check;
alter table geomtl2027.partners
  add constraint partners_partner_type_check
  check (partner_type in ('Gold', 'Silver', 'Bronze', 'Networking'));

-- ────────────────────────────────────────────────────────────
-- DEMANDES DU SITE
-- ────────────────────────────────────────────────────────────
alter table geomtl2027.demandes_kiosques
  drop constraint if exists demandes_kiosques_niveau_check;
alter table geomtl2027.demandes_kiosques
  add constraint demandes_kiosques_niveau_check
  check (niveau in ('exposant', 'bronze', 'argent', 'or', 'soiree', 'a_determiner'));

-- ============================================================
-- ROLLBACK
-- ============================================================
-- alter table geomtl2027.demandes_kiosques drop constraint demandes_kiosques_niveau_check;
-- alter table geomtl2027.demandes_kiosques add constraint demandes_kiosques_niveau_check
--   check (niveau in ('exposant', 'bronze', 'argent', 'or', 'a_determiner'));
-- alter table geomtl2027.partners drop constraint partners_partner_type_check;
-- alter table geomtl2027.partners add constraint partners_partner_type_check
--   check (partner_type in ('Platinum', 'Gold', 'Silver', 'Bronze', 'Exhibitor', 'Other'));
