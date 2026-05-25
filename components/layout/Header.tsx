'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import GeoMTLLogo from '@/components/ui/GeoMTLLogo';

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

  const navLinks = [
    { href: `/${locale}/programmation`, label: t('programme') },
    { href: `/${locale}/conferenciers`, label: t('speakers') },
    { href: `/${locale}/ateliers`, label: t('workshops') },
    { href: `/${locale}/exposants`, label: t('exhibitors') },
    { href: `/${locale}/partenaires`, label: t('partners') },
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
            ? 'bg-deep-blue/90 backdrop-blur-md border-b border-white/5 shadow-card'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center group"
              aria-label="GeoMTL 2027 — Accueil"
            >
              <GeoMTLLogo
                variant="color"
                height={28}
                showYear={true}
                className="transition-opacity duration-200 group-hover:opacity-80"
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
                      ? 'text-rose-geo bg-rose-geo/10'
                      : 'text-mid-gray hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <Link
                href={localizedPath}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold tracking-wider text-mid-gray hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
              >
                <span>{otherLocale.toUpperCase()}</span>
              </Link>

              {/* CTA */}
              <Link
                href={`/${locale}/billetterie`}
                className="hidden sm:flex items-center px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-rose-geo to-orange-geo hover:from-rose-geo-light hover:to-orange-geo-light transition-all shadow-geo hover:shadow-geo-lg"
              >
                {t('buyTicket')}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Menu"
              >
                <span
                  className={cn(
                    'block w-6 h-0.5 bg-white transition-transform duration-200',
                    mobileOpen && 'rotate-45 translate-y-2'
                  )}
                />
                <span
                  className={cn(
                    'block w-6 h-0.5 bg-white transition-opacity duration-200',
                    mobileOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'block w-6 h-0.5 bg-white transition-transform duration-200',
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
            className="fixed top-16 left-0 right-0 z-40 bg-deep-blue/95 backdrop-blur-xl border-b border-white/5 lg:hidden"
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
                      ? 'text-rose-geo bg-rose-geo/10'
                      : 'text-mid-gray hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <Link
                  href={localizedPath}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-mid-gray hover:text-white"
                >
                  {otherLocale === 'fr' ? 'Version française' : 'English version'}
                </Link>
                <Link
                  href={`/${locale}/billetterie`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-center text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-rose-geo to-orange-geo"
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
