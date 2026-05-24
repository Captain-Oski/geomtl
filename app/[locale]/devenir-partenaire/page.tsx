'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { partnerLevelBenefits, PARTNER_LEVELS_ORDER } from '@/data/partners';

export default function DevenirPartenairePage() {
  const t = useTranslations('becomePartner');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '', org: '', email: '', message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-deep-blue pt-20">
      <div className="bg-deep-blue-mid border-b border-white/5 py-16">
        <Container>
          <SectionTitle
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
          <div className="text-center mt-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-geo to-orange-geo hover:opacity-90 transition-all shadow-geo">
              📄 {t('downloadProspectus')}
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Benefits table */}
        <h2 className="text-2xl font-bold text-white mb-8">
          {locale === 'fr' ? 'Niveaux de partenariat' : 'Partnership Levels'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
          {PARTNER_LEVELS_ORDER.map((level, index) => {
            const data = locale === 'fr'
              ? partnerLevelBenefits[level].fr
              : partnerLevelBenefits[level].en;

            const colors = {
              presentateur: '#e91e8c',
              platine: '#a78bfa',
              or: '#ffd60a',
              argent: '#94a3b8',
              communaute: '#10b981'
            };
            const color = colors[level];

            return (
              <motion.div
                key={level}
                className="glass rounded-2xl p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                style={{ borderTop: `2px solid ${color}60` }}
              >
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color }}
                >
                  {data.name}
                </div>
                <div className="text-2xl font-black text-white mb-4">{data.price}</div>
                <ul className="space-y-2">
                  {data.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-mid-gray">
                      <span style={{ color }} className="mt-0.5 flex-shrink-0">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{t('contactTitle')}</h2>
            <p className="text-mid-gray mb-8">
              {locale === 'fr'
                ? 'Vous souhaitez rejoindre GeoMTL 2027 comme partenaire? Contactez notre équipe partenariats.'
                : 'Want to join GeoMTL 2027 as a partner? Contact our partnerships team.'}
            </p>

            {sent ? (
              <div className="glass rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-white font-semibold">
                  {locale === 'fr' ? 'Message envoyé! Nous vous répondrons sous 48h.' : 'Message sent! We\'ll reply within 48h.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-mid-gray mb-1">{t('nameLabel')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-mid-gray/50 border border-white/10 focus:border-rose-geo/50 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mid-gray mb-1">{t('orgLabel')}</label>
                  <input
                    type="text"
                    required
                    value={formData.org}
                    onChange={e => setFormData({ ...formData, org: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-mid-gray/50 border border-white/10 focus:border-rose-geo/50 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mid-gray mb-1">{t('emailLabel')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-mid-gray/50 border border-white/10 focus:border-rose-geo/50 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mid-gray mb-1">{t('messageLabel')}</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-mid-gray/50 border border-white/10 focus:border-rose-geo/50 focus:outline-none text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-geo to-orange-geo hover:opacity-90 transition-all"
                >
                  {t('sendButton')}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                {locale === 'fr' ? 'Équipe partenariats' : 'Partnerships Team'}
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Marie-Claude Villeneuve', role: locale === 'fr' ? 'Directrice partenariats' : 'Partnerships Director', email: 'partenariats@geomtl.ca' },
                  { name: 'Gabriel Fortier', role: locale === 'fr' ? 'Chargé de compte' : 'Account Manager', email: 'gfortier@geomtl.ca' }
                ].map(person => (
                  <div key={person.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-geo/20 border border-rose-geo/30 flex items-center justify-center text-sm font-bold text-rose-geo">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{person.name}</p>
                      <p className="text-xs text-mid-gray">{person.role}</p>
                      <a href={`mailto:${person.email}`} className="text-xs text-rose-geo/80 hover:text-rose-geo">
                        {person.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                {locale === 'fr' ? 'Pourquoi être partenaire?' : 'Why be a partner?'}
              </h3>
              <ul className="space-y-2 text-sm text-mid-gray">
                {(locale === 'fr' ? [
                  'Visibilité auprès de 1 000 décideurs et professionnels',
                  'Leads qualifiés dans le secteur géospatial',
                  'Association à un événement de référence national',
                  'Accès à une communauté engagée et en croissance',
                  'Contenu co-développé avec votre expertise'
                ] : [
                  'Visibility to 1,000 decision-makers and professionals',
                  'Qualified leads in the geospatial sector',
                  'Association with a national reference event',
                  'Access to an engaged and growing community',
                  'Content co-developed with your expertise'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-geo mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
