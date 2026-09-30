'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { partners } from '@/data/partners';

export default function PartnersSection() {
  const t = useTranslations('home');
  const tPartners = useTranslations('partners');
  const locale = useLocale();

  if (partners.length === 0) return null;

  const topPartners = partners.filter(p => p.level === 'or' || p.level === 'argent');
  const otherPartners = partners.filter(p => p.level === 'bronze' || p.level === 'exposant');

  return (
    <section className="section-spacing bg-geo-cream-dark relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(208, 220, 0, 0.08) 0%, transparent 60%)'
        }}
      />

      <Container>
        <SectionTitle
          eyebrow={t('partnersEyebrow')}
          title={t('partnersTitle')}
        />

        {/* Top partners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {topPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="glass-2027 rounded-2xl p-6 flex items-center gap-4 group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black text-geo-ink flex-shrink-0"
                style={{ background: `${partner.logoColor}20`, border: `1px solid ${partner.logoColor}40` }}
              >
                {partner.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-geo-ink text-sm">{partner.name}</p>
                <p className="text-xs text-geo-ink-soft mt-0.5">
                  {locale === 'fr' ? partner.sector.fr : partner.sector.en}
                </p>
                <span
                  className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${partner.logoColor}20`, color: partner.logoColor }}
                >
                  {tPartners(`levels.${partner.level}`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other partners */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {otherPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="glass-2027 rounded-xl px-4 py-3 flex items-center gap-3 text-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-geo-ink"
                style={{ background: `${partner.logoColor}25` }}
              >
                {partner.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-geo-ink/80 font-medium">{partner.name}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/devenir-partenaire`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-geo-ink bg-gradient-geo-2027 hover:opacity-90 transition-all shadow-geo-2027"
          >
            {t('partnersCta')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
