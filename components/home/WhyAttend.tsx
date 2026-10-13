'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { Handshake } from '@phosphor-icons/react/dist/ssr/Handshake';
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap';
import { Lightbulb } from '@phosphor-icons/react/dist/ssr/Lightbulb';
import { Storefront } from '@phosphor-icons/react/dist/ssr/Storefront';
import { Trophy } from '@phosphor-icons/react/dist/ssr/Trophy';
import { Plant } from '@phosphor-icons/react/dist/ssr/Plant';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';

// Tuiles pleines vert citron, comme la maquette du studio (section
// « Pourquoi participer ? »). Le citron reste clair en mode sombre : texte en
// geo-noir dans les deux thèmes.
const reasons = [
  { Icon: Handshake, titleKey: 'networkTitle' as const, descKey: 'networkDesc' as const },
  { Icon: GraduationCap, titleKey: 'expertiseTitle' as const, descKey: 'expertiseDesc' as const },
  { Icon: Lightbulb, titleKey: 'innovTitle' as const, descKey: 'innovDesc' as const },
  { Icon: Storefront, titleKey: 'vitrineTitle' as const, descKey: 'vitrineDesc' as const },
  {
    Icon: Trophy,
    titleKey: 'awardTitle' as const,
    descKey: 'awardDesc' as const,
    lien: { href: '/prix', externe: false, ctaKey: 'awardCta' as const }
  },
  {
    Icon: Plant,
    titleKey: 'releveTitle' as const,
    descKey: 'releveDesc' as const,
    lien: { href: 'https://acsg-montreal.ca/bourses/', externe: true, ctaKey: 'releveCta' as const }
  }
];

export default function WhyAttend() {
  const t = useTranslations('home');
  const tWhy = useTranslations('why');
  const locale = useLocale();

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
              className="relative rounded-2xl bg-geo-lime p-6 text-geo-noir group hover:scale-[1.02] transition-transform duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-geo-noir/20">
                <reason.Icon size={26} weight="light" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                {tWhy(reason.titleKey)}
              </h3>
              <p className="text-sm text-geo-noir/80 leading-relaxed">
                {tWhy(reason.descKey)}
              </p>
              {'lien' in reason && reason.lien && (
                // after:inset-0 rend toute la carte cliquable
                <Link
                  href={reason.lien.externe ? reason.lien.href : `/${locale}${reason.lien.href}`}
                  {...(reason.lien.externe && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-geo-noir/40 underline-offset-4 hover:decoration-geo-noir focus-visible:outline-geo-noir after:absolute after:inset-0 after:rounded-2xl"
                >
                  {tWhy(reason.lien.ctaKey)}
                  {reason.lien.externe ? (
                    <ArrowUpRight size={16} weight="light" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  ) : (
                    <ArrowRight size={16} weight="light" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  )}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
