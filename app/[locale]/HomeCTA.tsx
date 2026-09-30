'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight';

export default function HomeCTA() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Visuel de la charte : dégradé cyan → citron en trame de points */}
      <Image
        src="/images/brand/degrade-trame.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover pointer-events-none select-none"
      />

      <div className="relative z-10 px-4 max-w-3xl mx-auto">
        <motion.div
          className="rounded-2xl bg-white/55 backdrop-blur-md border border-white/60 px-6 py-10 sm:px-12 sm:py-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-geo-ink mb-3">
            GeoMTL 2027
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-geo-ink font-display mb-4 leading-tight text-balance">
            {t('ctaTitle')}
          </h2>
          <p className="text-base sm:text-lg text-geo-ink mb-8 leading-relaxed">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href={`/${locale}/billetterie`}
              className="group inline-flex items-center gap-2 rounded-lg bg-geo-ink px-6 py-3 font-semibold text-white hover:bg-geo-ink/85 transition-colors"
            >
              {t('ctaButton')}
              <ArrowRight size={18} weight="light" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/devenir-partenaire`}
              className="inline-flex items-center rounded-lg bg-geo-ink px-6 py-3 font-semibold text-white hover:bg-geo-ink/85 transition-colors"
            >
              {t('heroCta2')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
