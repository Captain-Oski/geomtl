import { notFound } from 'next/navigation';

// Toute adresse inconnue sous /fr ou /en affiche la 404 du site, avec son
// en-tête et son pied de page (sinon, Next passe à la 404 racine, sans eux).
export default function AdresseInconnue() {
  notFound();
}
