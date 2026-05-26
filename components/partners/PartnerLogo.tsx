import { Partner } from '@/data/partners';
import { PartnerLevelBadge } from '@/components/ui/Badge';

interface PartnerLogoProps {
  partner: Partner;
  locale: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PartnerLogo({ partner, locale, size = 'md' }: PartnerLogoProps) {
  const sector = locale === 'fr' ? partner.sector.fr : partner.sector.en;

  const sizeStyles = {
    sm: { container: 'p-3 gap-2', logo: 'w-8 h-8 text-xs', name: 'text-sm', sector: 'text-xs' },
    md: { container: 'p-4 gap-3', logo: 'w-12 h-12 text-sm', name: 'text-sm', sector: 'text-xs' },
    lg: { container: 'p-6 gap-4', logo: 'w-16 h-16 text-base', name: 'text-base', sector: 'text-sm' }
  };

  const styles = sizeStyles[size];

  return (
    <div className={`glass rounded-xl flex items-center ${styles.container}`}>
      <div
        className={`${styles.logo} rounded-xl flex items-center justify-center font-black text-white flex-shrink-0`}
        style={{
          background: `${partner.logoColor}20`,
          border: `1px solid ${partner.logoColor}40`
        }}
      >
        {partner.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className={`font-bold text-white ${styles.name} truncate`}>{partner.name}</p>
        <p className={`text-mid-gray ${styles.sector} truncate`}>{sector}</p>
        <div className="mt-1">
          <PartnerLevelBadge level={partner.level} locale={locale} />
        </div>
      </div>
    </div>
  );
}
