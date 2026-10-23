import { EVENT_CONFIG } from '@/data/config';
import { cn } from '@/lib/utils';

// Conditions affichées sous les forfaits de la billetterie, reprises telles quelles dans la FAQ
export default function NotesBillets({ fr, className }: { fr: boolean; className?: string }) {
  const courriel = EVENT_CONFIG.courriels.inscription;
  const lien = (
    <a href={`mailto:${courriel}`} className="font-semibold text-geo-teal-dark hover:underline">
      {courriel}
    </a>
  );

  return (
    <ul className={cn('space-y-3 text-sm text-geo-ink-soft leading-relaxed list-disc pl-5 marker:text-geo-teal-dark', className)}>
      <li>{fr ? 'Les montants affichés n\'incluent pas les frais et taxes applicables.' : 'Prices shown do not include applicable fees and taxes.'}</li>
      <li>{fr ? 'Aucun échange et aucun remboursement.' : 'No exchanges and no refunds.'}</li>
      <li>
        {fr
          ? 'Un rabais de 100,00 $ applicable seulement sur le forfait 2 jours est offert aux membres de l\'ACSG. Écrivez-nous à l\'adresse '
          : 'ACSG members get a $100.00 discount, applicable only to the 2-day package. Email us at '}
        {lien}
        {fr ? ' et nous vous enverrons un code promotionnel.' : ' and we will send you a promo code.'}
      </li>
      <li>
        {fr
          ? 'Le forfait Étudiant est offert uniquement aux étudiants inscrits à temps plein. Preuve d\'études à temps plein obligatoire. Écrivez-nous à l\'adresse '
          : 'The Student package is available only to full-time students. Proof of full-time enrolment is required. Email us at '}
        {lien}
        {fr ? ' et nous vous enverrons un code promotionnel.' : ' and we will send you a promo code.'}
      </li>
    </ul>
  );
}
