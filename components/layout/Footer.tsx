import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { EVENT_CONFIG } from '@/data/config';
import GeoMTLLogo from '@/components/ui/GeoMTLLogo';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/programmation`, label: tNav('programme') },
    { href: `/${locale}/conferenciers`, label: tNav('speakers') },
    { href: `/${locale}/ateliers`, label: tNav('workshops') },
    { href: `/${locale}/actualites`, label: tNav('news') },
    { href: `/${locale}/apropos`, label: tNav('about') },
  ];

  const participateLinks = [
    { href: `/${locale}/billetterie`, label: tNav('tickets') },
    { href: `/${locale}/devenir-partenaire`, label: tNav('becomePartner') },
    { href: `/${locale}/exposants`, label: tNav('exhibitors') },
    { href: `/${locale}/prix`, label: tNav('awards') },
    { href: `/${locale}/galerie`, label: tNav('gallery') },
  ];

  const resourceLinks = [
    { href: `/${locale}/infos`, label: tNav('info') },
    { href: `/${locale}/partenaires`, label: tNav('partners') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ];

  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <footer className="bg-deep-blue border-t border-white/5">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} aria-label="GeoMTL 2027 — Accueil">
              <GeoMTLLogo variant="color" height={34} showYear={true} />
            </Link>
            <p className="text-mid-gray leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            <div className="flex gap-4 pt-2">
              {/* Social icons */}
              {[
                { label: 'Twitter / X', href: EVENT_CONFIG.social.twitter, icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )},
                { label: 'LinkedIn', href: EVENT_CONFIG.social.linkedin, icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )},
                { label: 'Instagram', href: EVENT_CONFIG.social.instagram, icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )},
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg border border-white/10 text-mid-gray hover:text-white hover:border-white/20 transition-colors"
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
                    className="text-mid-gray hover:text-white text-sm transition-colors"
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
                    className="text-mid-gray hover:text-white text-sm transition-colors"
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
            <ul className="space-y-2 text-sm text-mid-gray">
              <li>
                <a
                  href={`mailto:${EVENT_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {EVENT_CONFIG.email}
                </a>
              </li>
              <li>{EVENT_CONFIG.venue[locale as 'fr' | 'en']}</li>
              <li>{EVENT_CONFIG.city}</li>
              <li className="pt-4">
                <Link
                  href={`/${otherLocale}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-colors"
                >
                  {otherLocale === 'fr' ? '🇫🇷 Version française' : '🇬🇧 English version'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-mid-gray">{t('copyright')}</p>
          <div className="flex items-center gap-6 text-sm text-mid-gray">
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
