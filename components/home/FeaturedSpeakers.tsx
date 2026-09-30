'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { getFeaturedSpeakers } from '@/data/speakers';
import Badge from '@/components/ui/Badge';

export default function FeaturedSpeakers() {
  const t = useTranslations('home');
  const locale = useLocale();
  const featured = getFeaturedSpeakers();

  return (
    <section className="section-spacing bg-geo-cream-dark">
      <Container>
        <SectionTitle
          eyebrow={t('featuredSpeakersEyebrow')}
          title={t('featuredSpeakersTitle')}
          subtitle={t('featuredSpeakersSubtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featured.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/${locale}/conferenciers/${speaker.slug}`}
                className="block glass-2027 rounded-2xl p-6 card-hover group"
              >
                {/* Photo placeholder */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-geo-ink mb-4 transition-transform duration-200 group-hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${speaker.color}40, ${speaker.color}80)`, border: `2px solid ${speaker.color}40` }}
                  >
                    {speaker.initials}
                  </div>
                  <h3 className="font-bold text-geo-ink text-base group-hover:text-geo-teal-dark transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-geo-ink-soft mt-1 line-clamp-2">
                    {locale === 'fr' ? speaker.title.fr : speaker.title.en}
                  </p>
                  <p className="text-xs text-geo-teal-dark/80 mt-1 font-medium">
                    {speaker.organization}
                  </p>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 justify-center mt-4">
                  {(locale === 'fr' ? speaker.topics.fr : speaker.topics.en).slice(0, 2).map((topic) => (
                    <Badge key={topic} variant="rose" size="sm">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/conferenciers`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-geo-teal-dark font-semibold border border-geo-teal-dark/30 hover:bg-geo-teal/10 hover:border-geo-teal-dark/60 transition-all"
          >
            {t('featuredSpeakersCta')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
