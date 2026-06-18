'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { EVENT_CONFIG } from '@/data/config';
import IsolineRipple from '@/components/ui/IsolineRipple';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0 } },
};

export default function Hero() {
  const t = useTranslations('home');
  const locale = useLocale();
  const tagline = locale === 'fr' ? EVENT_CONFIG.tagline.fr : EVENT_CONFIG.tagline.en;
  const dates   = locale === 'fr' ? EVENT_CONFIG.dates.fr   : EVENT_CONFIG.dates.en;
  const venue   = locale === 'fr' ? EVENT_CONFIG.venue.fr   : EVENT_CONFIG.venue.en;
  const microSlogans = locale === 'fr'
    ? EVENT_CONFIG.microSlogans.fr
    : EVENT_CONFIG.microSlogans.en;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-deep-blue">

      {/* ── Floating gradient orbs — overflow-hidden scoped ici ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: '55vw', height: '55vw',
            background: 'radial-gradient(circle, rgba(233,30,140,0.09) 0%, transparent 65%)',
            top: '-5%', right: '-8%',
            animation: 'float 11s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '40vw', height: '40vw',
            background: 'radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 65%)',
            bottom: '-8%', left: '-5%',
            animation: 'float 14s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '30vw', height: '30vw',
            background: 'radial-gradient(circle, rgba(18,60,120,0.18) 0%, transparent 65%)',
            top: '35%', left: '25%',
            animation: 'float 9s ease-in-out infinite 3s',
          }}
        />
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full text-center pt-28 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Date / venue pill */}
        <motion.div variants={itemVariants} className="px-4 sm:px-6 lg:px-8 mb-8">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-rose-geo/30 bg-rose-geo/8 text-rose-geo text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-geo animate-pulse flex-shrink-0" />
            {dates} · {venue}
          </span>
        </motion.div>

        {/* ── Logo hero full-width — isolignes animées GSAP ─── */}
        <motion.div variants={itemVariants} className="w-full mb-6">
          <IsolineRipple
            className="w-full h-auto"
            lineCount={22}
            amplitude={9}
            speed={1.1}
            vertPhase={0.42}
            showLogo={true}
            bgColor="none"
          />
        </motion.div>

        {/* Contenu centré sous le logo */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-light-gray/75 max-w-2xl mx-auto leading-relaxed mb-5 font-light tracking-wide"
          >
            {tagline}
          </motion.p>

          {/* Micro-slogans */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-5 gap-y-1.5 mb-12 text-xs sm:text-sm text-mid-gray"
          >
            {microSlogans.map((slogan, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline text-rose-geo/30">·</span>}
                <span className="italic">{slogan}</span>
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href={`/${locale}/billetterie`}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-base lg:text-lg
                         bg-gradient-to-r from-rose-geo to-orange-geo
                         hover:from-rose-geo-light hover:to-orange-geo-light
                         transition-all shadow-geo hover:shadow-geo-lg hover:scale-105 active:scale-100"
            >
              {t('heroCta1')}
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/devenir-partenaire`}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base lg:text-lg
                         border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10
                         transition-all backdrop-blur-sm"
            >
              {t('heroCta2')}
            </Link>
          </motion.div>

          {/* Key numbers strip */}
          <motion.div
            variants={fadeIn}
            className="pt-8 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { value: '1 000', label: locale === 'fr' ? 'participants' : 'attendees' },
              { value: '2',         label: locale === 'fr' ? 'jours' : 'days' },
              { value: '60+',       label: locale === 'fr' ? 'conférenciers' : 'speakers' },
              { value: '50+',       label: locale === 'fr' ? 'exposants' : 'exhibitors' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-mid-gray mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-mid-gray/60">
          {t('heroScroll')}
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-mid-gray/40 to-transparent"
          animate={{ scaleY: [0, 1, 0], y: [0, 0, 16] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
