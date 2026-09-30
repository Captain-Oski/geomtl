import { notFound } from 'next/navigation';

// Les fiches conférenciers ne sont pas encore publiées (lancement prévu
// octobre 2026, RDV Géomatique AGMQ). Aucune donnée maquette n'est
// chargée ici — toute URL de ce type renvoie un 404 tant que la section
// n'est pas réactivée avec de vraies confirmations.
export function generateStaticParams() {
  return [];
}

export const dynamicParams = false;

export default function SpeakerDetailPage() {
  notFound();
}
