'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { agendaItems } from '@/data/agenda';
import { SessionTypeBadge } from '@/components/ui/Badge';

export default function ProgramPreview() {
  const t = useTranslations('home');
  const locale = useLocale();

  // Show first 4 items from each day
  const previewItems = [
    ...agendaItems.filter(i => i.day === 1).slice(0, 4),
    ...agendaItems.filter(i => i.day === 2).slice(0, 3),
  ].slice(0, 6);

  return (
    <section className="section-spacing bg-deep-blue">
      <Container>
        <SectionTitle
          eyebrow={t('programEyebrow')}
          title={t('programTitle')}
        />

        <div className="space-y-3 mb-10">
          {previewItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="glass rounded-xl p-4 flex items-center gap-4 group hover:bg-white/5 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
            >
              {/* Day + Time */}
              <div className="text-right flex-shrink-0 w-24">
                <p className="text-xs text-mid-gray">
                  {locale === 'fr' ? `Jour ${item.day}` : `Day ${item.day}`}
                </p>
                <p className="text-sm font-mono text-light-gray/80">{item.time}</p>
              </div>

              {/* Divider */}
              <div
                className="w-0.5 h-10 flex-shrink-0 rounded-full"
                style={{
                  background: item.type === 'keynote'
                    ? 'linear-gradient(to bottom, #e91e8c, #ff6b35)'
                    : item.type === 'conference'
                    ? 'linear-gradient(to bottom, #5b9bd5, #3b7abf)'
                    : 'rgba(255,255,255,0.15)'
                }}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <SessionTypeBadge type={item.type} locale={locale} />
                  {item.speakerNames && item.speakerNames.length > 0 && (
                    <span className="text-xs text-mid-gray truncate">
                      {item.speakerNames.join(', ')}
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-white line-clamp-1">
                  {locale === 'fr' ? item.title.fr : item.title.en}
                </p>
              </div>

              {/* Room */}
              {item.room && (
                <div className="hidden sm:block text-xs text-mid-gray flex-shrink-0">
                  {locale === 'fr' ? item.room.fr : item.room.en}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/programmation`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-rose-geo font-semibold border border-rose-geo/30 hover:bg-rose-geo/10 hover:border-rose-geo/60 transition-all"
          >
            {t('programCta')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
