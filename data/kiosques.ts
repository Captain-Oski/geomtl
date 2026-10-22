import type { KiosquePublic } from '@/lib/supabase/types';

// L'état des kiosques vient de la base (table geomtl2027.kiosques) et ne
// change que par l'admin (/admin/kiosques). Ce fichier ne sert qu'en repli :
// sans Supabase configuré (développement local), ou si la base est
// injoignable, tous les kiosques s'affichent disponibles.

export const KIOSQUES_REPLI: KiosquePublic[] = Array.from({ length: 26 }, (_, i) => ({
  numero: i + 1,
  statut: 'disponible',
  organisation_affichee: null,
  logo_url: null,
  site_url: null,
}));

// Réservations fictives pour vérifier le rendu en local seulement : ajouter
// ?apercu-kiosques à l'adresse de la page sur le serveur de développement.
// Jamais affichées sur le site en production.
const LOGO_EXEMPLE = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80"><rect width="200" height="80" rx="14" fill="#01CDA5"/><text x="100" y="53" font-family="Arial, sans-serif" font-size="34" font-weight="700" text-anchor="middle" fill="#141412">LOGO</text></svg>'
)}`;

export const KIOSQUES_APERCU: KiosquePublic[] = [
  { numero: 1, statut: 'reserve', organisation_affichee: 'Organisation exemple', logo_url: LOGO_EXEMPLE, site_url: 'https://example.com' },
  { numero: 12, statut: 'reserve', organisation_affichee: 'Partenaire Or exemple', logo_url: LOGO_EXEMPLE, site_url: null },
  { numero: 13, statut: 'reserve', organisation_affichee: 'Partenaire Or exemple', logo_url: LOGO_EXEMPLE, site_url: null },
  { numero: 22, statut: 'reserve', organisation_affichee: 'Exposant sans logo', logo_url: null, site_url: null },
];
