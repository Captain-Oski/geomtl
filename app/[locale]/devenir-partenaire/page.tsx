import { setRequestLocale } from 'next-intl/server';
import DevenirPartenaire from '@/components/partners/DevenirPartenaire';
import { getKiosquesPublics } from '@/lib/data/kiosques';

// Filet de sécurité : l'admin rafraîchit le plan à chaque changement d'état
// d'un kiosque ; sinon la page se régénère au plus toutes les 5 minutes.
export const revalidate = 300;

export default async function DevenirPartenairePage(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const kiosques = await getKiosquesPublics();
  return <DevenirPartenaire kiosques={kiosques} />;
}
