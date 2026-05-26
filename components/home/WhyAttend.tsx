'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';

const reasons = [
  {
    icon: '🎯',
    titleKey: 'networkTitle' as const,
    descKey: 'networkDesc' as const,
    color: '#e91e8c'
  },
  {
    icon: '🎓',
    titleKey: 'expertiseTitle' as const,
    descKey: 'expertiseDesc' as const,
    color: '#ff6b35'
  },
  {
    icon: '💡',
    titleKey: 'innovTitle' as const,
    descKey: 'innovDesc' as const,
    color: '#ffd60a'
  },
  {
    icon: '🛠️',
    titleKey: 'workshopTitle' as const,
    descKey: 'workshopDesc' as const,
    color: '#10b981'
  },
  {
    icon: '🏆',
    titleKey: 'awardTitle' as const,
    descKey: 'awardDesc' as const,
    color: '#e91e8c'
  },
  {
    icon: '🗺️',
    titleKey: 'mtlTitle' as const,
    descKey: 'mtlDesc' as const,
    color: '#ff6b35'
  }
];

export default function WhyAttend() {
  const t = useTranslations('home');
  const tWhy = useTranslations('why');

  return (
    <section className="section-spacing bg-deep-blue">
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
              className="glass rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${reason.color}15`, border: `1px solid ${reason.color}30` }}
              >
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {tWhy(reason.titleKey)}
              </h3>
              <p className="text-sm text-mid-gray leading-relaxed">
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
