import BoutonInfolettre from '@/components/ui/BoutonInfolettre';
import { cn } from '@/lib/utils';

export default function CarteInfolettre({ locale, className }: { locale: string; className?: string }) {
  const fr = locale === 'fr';

  return (
    <div className={cn('glass-2027 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5', className)}>
      <div>
        <h2 className="text-xl font-bold text-geo-ink mb-1">
          {fr ? 'Ne manquez aucune nouvelle' : 'Never miss an update'}
        </h2>
        <p className="text-sm text-geo-ink-soft">
          {fr
            ? 'Recevez les annonces de GÉOMTL 2027 par courriel : programme, inscriptions et nouveautés.'
            : 'Get GÉOMTL 2027 announcements by email: program, registration and news.'}
        </p>
      </div>
      <BoutonInfolettre locale={locale} className="flex-shrink-0 self-start sm:self-auto" />
    </div>
  );
}
