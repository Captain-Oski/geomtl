'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { Handshake } from '@phosphor-icons/react/dist/ssr/Handshake';
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap';
import { Lightbulb } from '@phosphor-icons/react/dist/ssr/Lightbulb';
import { Wrench } from '@phosphor-icons/react/dist/ssr/Wrench';
import { Trophy } from '@phosphor-icons/react/dist/ssr/Trophy';
import { MapTrifold } from '@phosphor-icons/react/dist/ssr/MapTrifold';

const reasons = [
  {
    Icon: Handshake,
    titleKey: 'networkTitle' as const,
    descKey: 'networkDesc' as const,
    color: '#20FEFD'
  },
  {
    Icon: GraduationCap,
    titleKey: 'expertiseTitle' as const,
    descKey: 'expertiseDesc' as const,
    color: '#01CDA5'
  },
  {
    Icon: Lightbulb,
    titleKey: 'innovTitle' as const,
    descKey: 'innovDesc' as const,
    color: '#1BC868'
  },
  {
    Icon: Wrench,
    titleKey: 'workshopTitle' as const,
    descKey: 'workshopDesc' as const,
    color: '#D0DC00'
  },
  {
    Icon: Trophy,
    titleKey: 'awardTitle' as const,
    descKey: 'awardDesc' as const,
    color: '#01CDA5'
  },
  {
    Icon: MapTrifold,
    titleKey: 'mtlTitle' as const,
    descKey: 'mtlDesc' as const,
    color: '#1BC868'
  }
];

export default function WhyAttend() {
  const t = useTranslations('home');
  const tWhy = useTranslations('why');

  return (
    <section className="section-spacing bg-geo-cream">
      <Container>
        <SectionTitle
          eyebrow={t('whyEyebrow')}
          title={t('whyTitle')}
          subtitle={t('whySubtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.titleKey}
              className="glass-2027 rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-geo-cream border border-geo-ink/10 text-geo-ink">
                <reason.Icon size={26} weight="light" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-geo-ink mb-2">
                {tWhy(reason.titleKey)}
              </h3>
              <p className="text-sm text-geo-ink-soft leading-relaxed">
                {tWhy(reason.descKey)}
              </p>
              <div
                className="mt-4 h-0.5 w-8 rounded-full"
                style={{ background: reason.color }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
