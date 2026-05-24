'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function HomeCTA() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="py-24 bg-deep-blue-mid relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(233, 30, 140, 0.08) 0%, rgba(255, 107, 53, 0.04) 50%, transparent 80%)'
        }}
      />
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-geo/40 to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase gradient-text mb-4">
            GeoMTL 2027
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-mid-gray mb-8 leading-relaxed">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/billetterie`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-rose-geo to-orange-geo hover:from-rose-geo-light hover:to-orange-geo-light transition-all shadow-geo hover:shadow-geo-lg hover:scale-105 active:scale-100"
            >
              {t('ctaButton')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/devenir-partenaire`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
            >
              {locale === 'fr' ? 'Devenir partenaire' : 'Become a partner'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
