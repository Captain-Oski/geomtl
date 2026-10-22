// Réservations des kiosques du salon des exposants (plan interactif de la page
// Devenir partenaire). Un kiosque absent de cette liste est affiché comme
// disponible ; un kiosque listé est affiché comme indisponible, avec le logo de
// l'organisation.
//
// Pour réserver un kiosque : ajouter une entrée avec son numéro, puis déposer le
// logo dans public/images/exposants/ (SVG ou PNG sur fond transparent, de
// préférence plus large que haut). Un partenaire Or occupe deux kiosques : une
// entrée par numéro.

export interface ReservationKiosque {
  organisation: string;
  logo?: string; // chemin public, par exemple /images/exposants/nom.svg
  site?: string;
}

export const RESERVATIONS_KIOSQUES: Partial<Record<number, ReservationKiosque>> = {
  // 12: { organisation: 'Nom de l\'organisation', logo: '/images/exposants/nom.svg', site: 'https://exemple.com' },
};

// Réservations fictives pour vérifier le rendu en local seulement : ajouter
// ?apercu-kiosques à l'adresse de la page sur le serveur de développement.
// Jamais affichées sur le site en production.
const LOGO_EXEMPLE = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80"><rect width="200" height="80" rx="14" fill="#01CDA5"/><text x="100" y="53" font-family="Arial, sans-serif" font-size="34" font-weight="700" text-anchor="middle" fill="#141412">LOGO</text></svg>'
)}`;

export const RESERVATIONS_APERCU: Partial<Record<number, ReservationKiosque>> = {
  1: { organisation: 'Organisation exemple', logo: LOGO_EXEMPLE, site: 'https://example.com' },
  12: { organisation: 'Partenaire Or exemple', logo: LOGO_EXEMPLE },
  13: { organisation: 'Partenaire Or exemple', logo: LOGO_EXEMPLE },
  22: { organisation: 'Exposant sans logo' },
};
