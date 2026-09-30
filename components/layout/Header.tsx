'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import GeoMTLLogo from '@/components/ui/GeoMTLLogo';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Programme, Conférenciers, Ateliers, Exposants et Partenaires restent
  // masqués de la navigation jusqu'au lancement public (octobre 2026,
  // RDV Géomatique AGMQ) — les pages existent toujours en coulisse
  // (état "Bientôt disponible") mais ne sont pas mises en avant.
  const navLinks = [
    { href: `/${locale}/devenir-partenaire`, label: t('becomePartner') },
    { href: `/${locale}/infos`, label: t('info') },
    { href: `/${locale}/actualites`, label: t('news') },
    { href: `/${locale}/apropos`, label: t('about') },
  ];

  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  const localizedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-geo-cream/90 backdrop-blur-md border-b border-geo-ink/10 shadow-card-2027'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center group text-geo-ink"
              aria-label="GeoMTL 2027 — Accueil"
            >
              <GeoMTLLogo
                height={28}
                showYear={true}
                className="transition-opacity duration-200 group-hover:opacity-70"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-geo-teal-dark bg-geo-teal/10'
                      : 'text-geo-ink-soft hover:text-geo-ink hover:bg-geo-ink/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Language switcher */}
              <Link
                href={localizedPath}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold tracking-wider text-geo-ink-soft hover:text-geo-ink border border-geo-ink/15 hover:border-geo-ink/30 rounded-lg transition-colors"
              >
                <span>{otherLocale.toUpperCase()}</span>
              </Link>

              {/* CTA */}
              <Link
                href={`/${locale}/billetterie`}
                className="hidden sm:flex items-center px-4 py-2 text-sm font-semibold text-geo-noir rounded-lg bg-gradient-geo-2027 hover:opacity-90 transition-all shadow-geo-2027"
              >
                {t('buyTicket')}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-geo-ink/5 transition-colors"
                aria-label="Menu"
              >
                <span
                  className={cn(
                    'block w-6 h-0.5 bg-geo-ink transition-transform duration-200',
                    mobileOpen && 'rotate-45 translate-y-2'
                  )}
                />
                <span
                  className={cn(
                    'block w-6 h-0.5 bg-geo-ink transition-opacity duration-200',
                    mobileOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'block w-6 h-0.5 bg-geo-ink transition-transform duration-200',
                    mobileOpen && '-rotate-45 -translate-y-2'
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-geo-cream/95 backdrop-blur-xl border-b border-geo-ink/10 lg:hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-geo-teal-dark bg-geo-teal/10'
                      : 'text-geo-ink-soft hover:text-geo-ink hover:bg-geo-ink/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-geo-ink/10 flex flex-col gap-3">
                <Link
                  href={localizedPath}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-geo-ink-soft hover:text-geo-ink"
                >
                  {otherLocale === 'fr' ? 'Version française' : 'English version'}
                </Link>
                <Link
                  href={`/${locale}/billetterie`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-center text-sm font-semibold text-geo-noir rounded-lg bg-gradient-geo-2027"
                >
                  {t('buyTicket')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
