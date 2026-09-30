import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { EVENT_CONFIG } from '@/data/config';
import GeoMTLLogo from '@/components/ui/GeoMTLLogo';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  // Programme, Conférenciers, Ateliers, Exposants et Partenaires restent
  // masqués de la navigation jusqu'au lancement public (octobre 2026,
  // RDV Géomatique AGMQ).
  const navLinks = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/actualites`, label: tNav('news') },
    { href: `/${locale}/apropos`, label: tNav('about') },
  ];

  const participateLinks = [
    { href: `/${locale}/billetterie`, label: tNav('tickets') },
    { href: `/${locale}/devenir-partenaire`, label: tNav('becomePartner') },
  ];

  const resourceLinks = [
    { href: `/${locale}/infos`, label: tNav('info') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ];

  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <footer className="bg-geo-ink border-t border-geo-ink-soft">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} aria-label="GeoMTL 2027 — Accueil" className="text-white inline-flex">
              <GeoMTLLogo height={34} showYear={true} />
            </Link>
            <p className="text-geo-cream leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            <div className="flex gap-4 pt-2">
              {/* Social icons */}
              {[
                { label: 'Twitter / X', href: EVENT_CONFIG.social.twitter, icon: (
                  <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 18h18V6c0-1.657-1.343-3-3-3H6c-1.657 0-3 1.343-3 3v12m0 0h18M3 18V6m18 12V6M9 3v3m6-3v3"/>
                  </svg>
                )},
                { label: 'LinkedIn', href: EVENT_CONFIG.social.linkedin, icon: (
                  <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )},
                { label: 'Instagram', href: EVENT_CONFIG.social.instagram, icon: (
                  <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1"/>
                  </svg>
                )},
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg border border-geo-cream text-geo-cream hover:text-white hover:border-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('navigation')}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-geo-cream hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Participate */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('participate')}
            </h4>
            <ul className="space-y-2">
              {participateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-geo-cream hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('contact')}
            </h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a
                  href={`mailto:${EVENT_CONFIG.email}`}
                  className="hover:text-geo-cream transition-colors"
                >
                  {EVENT_CONFIG.email}
                </a>
              </li>
              <li>{EVENT_CONFIG.venue[locale as 'fr' | 'en']}</li>
              <li>{EVENT_CONFIG.city}</li>
              <li className="pt-4">
                <Link
                  href={`/${otherLocale}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-geo-cream rounded-lg hover:border-geo-cream text-geo-cream transition-colors"
                >
                  {otherLocale.toUpperCase()}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-geo-ink-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-geo-cream">{t('copyright')}</p>
          <div className="flex items-center gap-6 text-sm text-geo-cream">
            <Link href={`/${locale}/confidentialite`} className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}/conditions`} className="hover:text-white transition-colors">
              {t('terms')}
            </Link>
            <span>{t('madeIn')} 🏔️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
