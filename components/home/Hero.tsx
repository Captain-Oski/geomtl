'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { EVENT_CONFIG } from '@/data/config';
import GeoMTLLogo from '@/components/ui/GeoMTLLogo';
import GlobeTrame, { type IdeaKey, type ReglagesGlobe } from '@/components/home/GlobeTrame';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { cn } from '@/lib/utils';

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

interface HeroProps {
  // Options utilisées par la page /demo ; l'accueil n'en passe aucune.
  reglages?: Partial<ReglagesGlobe>;
  onIdee?: (idee: IdeaKey) => void;
  masquerTexte?: boolean;
}

// Fond et texte suivent le thème (clair / sombre) via les couleurs geo-*.
export default function Hero({ reglages, onIdee, masquerTexte = false }: HeroProps) {
  const t = useTranslations('home');
  const locale = useLocale();
  const tagline = locale === 'fr' ? EVENT_CONFIG.tagline.fr : EVENT_CONFIG.tagline.en;
  const dates = locale === 'fr' ? EVENT_CONFIG.dates.fr : EVENT_CONFIG.dates.en;
  const venue = locale === 'fr' ? EVENT_CONFIG.venue.fr : EVENT_CONFIG.venue.en;
  const button =
    'inline-flex items-center rounded-lg px-6 py-3 text-sm sm:text-base font-semibold transition-colors bg-geo-ink text-geo-cream hover:bg-geo-ink/85';

  return (
    <section className="relative overflow-hidden bg-geo-cream">
      {/* Visuel de la charte : globe en trame de points (Studio Le Séisme), animé */}
      <GlobeTrame
        reglages={reglages}
        onIdee={onIdee}
        className="absolute inset-x-0 bottom-0 top-56 sm:top-0 w-full h-[calc(100%-14rem)] sm:h-full pointer-events-none select-none"
      />

      <motion.div
        className={cn(
          'relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-12 lg:pb-16 min-h-[88svh] flex flex-col',
          masquerTexte && 'invisible'
        )}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.div variants={itemVariants} className="flex items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-16 font-semibold text-base sm:text-lg leading-snug text-geo-ink">
            <p>
              {dates}
              <br />
              {venue}
            </p>
            <p className="max-w-xs">{tagline}</p>
          </div>
          <span className="flex-shrink-0 rounded-md px-3 py-1 font-display text-xl sm:text-2xl lg:text-3xl font-bold bg-geo-ink text-geo-cream">
            2027
          </span>
        </motion.div>

        <div className="mt-auto pt-16">
          <h1 className="sr-only">GÉOMTL 2027</h1>
          <motion.div variants={itemVariants}>
            <GeoMTLLogo showYear={false} className="w-full h-auto text-geo-ink" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Link href={`/${locale}/billetterie`} className={cn('group gap-2', button)}>
              {t('heroCta1')}
              <ArrowRight size={18} weight="light" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href={`/${locale}/devenir-partenaire`} className={button}>
              {t('heroCta2')}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
