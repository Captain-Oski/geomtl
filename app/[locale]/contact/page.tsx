'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { EVENT_CONFIG } from '@/data/config';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { Phone } from '@phosphor-icons/react/dist/ssr/Phone';
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin';

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
      person: 'Clément Glogowski',
      role: locale === 'fr' ? 'Partenariats et exposants' : 'Partnerships & Exhibitors'
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
    <div className="min-h-screen bg-geo-cream pt-20">
      <div className="page-header-2027 py-16 sm:py-20">
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
              <div className="glass-2027 rounded-2xl p-10 text-center">
                <CheckCircle size={48} weight="light" className="mx-auto mb-4 text-geo-teal-dark" aria-hidden="true" />
                <h3 className="text-xl font-bold text-geo-ink mb-2">
                  {locale === 'fr' ? 'Message envoyé!' : 'Message sent!'}
                </h3>
                <p className="text-geo-ink-soft">
                  {t('successMessage')}
                </p>
                <button
                  onClick={() => { setSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 text-geo-teal-dark text-sm hover:underline"
                >
                  {locale === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-geo-ink-soft mb-1">{t('nameLabel')}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink placeholder:text-geo-ink-soft/50 border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-geo-ink-soft mb-1">{t('emailLabel')}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink placeholder:text-geo-ink-soft/50 border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-geo-ink-soft mb-1">{t('subjectLabel')}</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm bg-transparent"
                  >
                    <option value="" className="bg-geo-cream">{locale === 'fr' ? '-- Choisir un sujet --' : '-- Choose a subject --'}</option>
                    {subjects.map(s => (
                      <option key={s} value={s} className="bg-geo-cream">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-geo-ink-soft mb-1">{t('messageLabel')}</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink placeholder:text-geo-ink-soft/50 border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-geo-ink bg-gradient-geo-2027 hover:opacity-90 transition-all"
                >
                  {t('sendButton')}
                </button>
              </form>
            )}
          </div>

          {/* Info + team */}
          <div className="space-y-6">
            {/* General info */}
            <div className="glass-2027 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-geo-ink mb-4">
                {locale === 'fr' ? 'Coordonnées' : 'Contact details'}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-geo-ink-soft">
                  <EnvelopeSimple size={20} weight="light" className="text-geo-ink flex-shrink-0" aria-hidden="true" />
                  <a href={`mailto:${EVENT_CONFIG.email}`} className="hover:text-geo-ink transition-colors">
                    {EVENT_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-geo-ink-soft">
                  <Phone size={20} weight="light" className="text-geo-ink flex-shrink-0" aria-hidden="true" />
                  <a href={`tel:${EVENT_CONFIG.phone}`} className="hover:text-geo-ink transition-colors">
                    {EVENT_CONFIG.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-geo-ink-soft">
                  <MapPin size={20} weight="light" className="text-geo-ink flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{locale === 'fr' ? EVENT_CONFIG.address.fr : EVENT_CONFIG.address.en}</span>
                </div>
              </div>
            </div>

            {/* Team contacts */}
            <div className="glass-2027 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-geo-ink mb-4">{t('teamContacts')}</h3>
              <div className="space-y-4">
                {teamContacts.map(contact => (
                  <div key={contact.dept} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-geo-teal/15 border border-geo-teal-dark/25 flex items-center justify-center text-xs font-bold text-geo-teal-dark flex-shrink-0 mt-0.5">
                      {contact.person.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-geo-ink">{contact.dept}</p>
                      <p className="text-xs text-geo-ink-soft">{contact.person} · {contact.role}</p>
                      <a href={`mailto:${contact.email}`} className="text-xs text-geo-teal-dark/80 hover:text-geo-teal-dark">
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
