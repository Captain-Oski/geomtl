'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { EVENT_CONFIG } from '@/data/config';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const teamContacts = [
    {
      dept: t('general'),
      email: 'info@geomtl.ca',
      person: 'Camille Dupont',
      role: locale === 'fr' ? 'Communications' : 'Communications'
    },
    {
      dept: t('press'),
      email: 'presse@geomtl.ca',
      person: 'Mathieu Larivée',
      role: locale === 'fr' ? 'Rédaction & médias' : 'Editorial & Media'
    },
    {
      dept: t('partnerships'),
      email: 'partenariats@geomtl.ca',
      person: 'Marie-Claude Villeneuve',
      role: locale === 'fr' ? 'Partenariats' : 'Partnerships'
    },
    {
      dept: t('programming'),
      email: 'programmation@geomtl.ca',
      person: 'Alexandre Jobin',
      role: locale === 'fr' ? 'Programmation' : 'Programming'
    }
  ];

  const subjects = locale === 'fr' ? [
    'Renseignements généraux',
    'Inscription et billetterie',
    'Partenariat et exposition',
    'Proposition de conférence',
    'Médias et presse',
    'Accessibilité',
    'Autre'
  ] : [
    'General information',
    'Registration and ticketing',
    'Partnership and exhibition',
    'Conference proposal',
    'Media and press',
    'Accessibility',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-deep-blue pt-20">
      <div className="bg-deep-blue-mid border-b border-white/5 py-16">
        <Container>
          <SectionTitle
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {sent ? (
              <div className="glass rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {locale === 'fr' ? 'Message envoyé!' : 'Message sent!'}
                </h3>
                <p className="text-mid-gray">
                  {t('successMessage')}
                </p>
                <button
                  onClick={() => { setSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 text-rose-geo text-sm hover:underline"
                >
                  {locale === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-mid-gray mb-1">{t('nameLabel')}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-mid-gray/50 border border-white/10 focus:border-rose-geo/50 focus:outline-none text-sm"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-mid-gray mb-1">{t('emailLabel')}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-mid-gray/50 border border-white/10 focus:border-rose-geo/50 focus:outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-mid-gray mb-1">{t('subjectLabel')}</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-white border border-white/10 focus:border-rose-geo/50 focus:outline-none text-sm bg-transparent"
                  >
                    <option value="" className="bg-deep-blue">{locale === 'fr' ? '-- Choisir un sujet --' : '-- Choose a subject --'}</option>
                    {subjects.map(s => (
                      <option key={s} value={s} className="bg-deep-blue">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-mid-gray mb-1">{t('messageLabel')}</label>
                  <textarea
                    rows={6}
                    required
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

          {/* Info + team */}
          <div className="space-y-6">
            {/* General info */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                {locale === 'fr' ? 'Coordonnées' : 'Contact details'}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-mid-gray">
                  <span className="text-lg">📧</span>
                  <a href={`mailto:${EVENT_CONFIG.email}`} className="hover:text-white transition-colors">
                    {EVENT_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-mid-gray">
                  <span className="text-lg">📞</span>
                  <a href={`tel:${EVENT_CONFIG.phone}`} className="hover:text-white transition-colors">
                    {EVENT_CONFIG.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-mid-gray">
                  <span className="text-lg">📍</span>
                  <span>{locale === 'fr' ? EVENT_CONFIG.address.fr : EVENT_CONFIG.address.en}</span>
                </div>
              </div>
            </div>

            {/* Team contacts */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">{t('teamContacts')}</h3>
              <div className="space-y-4">
                {teamContacts.map(contact => (
                  <div key={contact.dept} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-geo/15 border border-rose-geo/25 flex items-center justify-center text-xs font-bold text-rose-geo flex-shrink-0 mt-0.5">
                      {contact.person.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{contact.dept}</p>
                      <p className="text-xs text-mid-gray">{contact.person} · {contact.role}</p>
                      <a href={`mailto:${contact.email}`} className="text-xs text-rose-geo/80 hover:text-rose-geo">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
