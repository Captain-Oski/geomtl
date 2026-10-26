'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { EVENT_CONFIG } from '@/data/config';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import BoutonInfolettre from '@/components/ui/BoutonInfolettre';

const champ =
  'w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink placeholder:text-geo-ink-soft/50 border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm';

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const fr = locale === 'fr';
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const { info, inscription, partenariat, conferencier } = EVENT_CONFIG.courriels;

  // Chaque sujet est envoyé à l'adresse de l'équipe concernée
  const subjects: { nom: string; courriel: string }[] = fr ? [
    { nom: 'Renseignements généraux', courriel: info },
    { nom: 'Inscription et billetterie', courriel: inscription },
    { nom: 'Partenariat et exposition', courriel: partenariat },
    { nom: 'Proposition de conférence', courriel: conferencier },
    { nom: 'Médias et presse', courriel: info },
    { nom: 'Accessibilité', courriel: info },
    { nom: 'Autre', courriel: info }
  ] : [
    { nom: 'General information', courriel: info },
    { nom: 'Registration and ticketing', courriel: inscription },
    { nom: 'Partnership and exhibition', courriel: partenariat },
    { nom: 'Conference proposal', courriel: conferencier },
    { nom: 'Media and press', courriel: info },
    { nom: 'Accessibility', courriel: info },
    { nom: 'Other', courriel: info }
  ];
  const destinataire = subjects.find((s) => s.nom === formData.subject)?.courriel ?? info;

  const coordonnees = [
    { libelle: fr ? 'Renseignements généraux' : 'General information', courriel: info },
    { libelle: fr ? 'Inscriptions' : 'Registration', courriel: inscription },
    { libelle: fr ? 'Partenariats et exposants' : 'Partners and exhibitors', courriel: partenariat },
    { libelle: fr ? 'Conférenciers' : 'Speakers', courriel: conferencier },
  ];

  // Pas de service d'envoi côté serveur : on ouvre le logiciel de courriel du visiteur, message prérempli.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sujet = `GÉOMTL 2027 - ${formData.subject || (fr ? 'Message' : 'Message')}`;
    const corps = [
      `${fr ? 'Nom' : 'Name'} : ${formData.name}`,
      `${fr ? 'Courriel' : 'Email'} : ${formData.email}`,
      '',
      formData.message,
    ].join('\n');
    window.location.href = `mailto:${destinataire}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-28">
      <h2 className="text-2xl font-bold text-geo-ink mb-2 flex items-center gap-2">
        <EnvelopeSimple size={26} weight="light" aria-hidden="true" />
        {t('title')}
      </h2>
      <p className="text-geo-ink-soft mb-6">{t('subtitle')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {sent ? (
            <div className="glass-2027 rounded-2xl p-8 text-center">
              <EnvelopeSimple size={40} weight="light" className="mx-auto mb-4 text-geo-teal-dark" aria-hidden="true" />
              <p className="text-geo-ink font-semibold">
                {fr
                  ? 'Votre logiciel de courriel s\'est ouvert avec votre message prérempli : il ne reste qu\'à l\'envoyer.'
                  : 'Your email app has opened with your message pre-filled: just send it.'}
              </p>
              <p className="text-sm text-geo-ink-soft mt-3">
                {fr ? 'Rien ne s\'est ouvert? Écrivez-nous directement à ' : 'Nothing opened? Write to us directly at '}
                <a href={`mailto:${destinataire}`} className="text-geo-teal-dark hover:underline">{destinataire}</a>.
              </p>
              <button
                onClick={() => { setSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                className="mt-6 text-geo-teal-dark text-sm hover:underline"
              >
                {fr ? 'Écrire un autre message' : 'Write another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-nom" className="block text-sm font-medium text-geo-ink-soft mb-1">{t('nameLabel')}</label>
                  <input
                    id="contact-nom"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className={champ}
                  />
                </div>
                <div>
                  <label htmlFor="contact-courriel" className="block text-sm font-medium text-geo-ink-soft mb-1">{t('emailLabel')}</label>
                  <input
                    id="contact-courriel"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={champ}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-sujet" className="block text-sm font-medium text-geo-ink-soft mb-1">{t('subjectLabel')}</label>
                <select
                  id="contact-sujet"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className={`${champ} bg-transparent`}
                >
                  <option value="" className="bg-geo-cream">{fr ? '-- Choisir un sujet --' : '-- Choose a subject --'}</option>
                  {subjects.map(({ nom }) => (
                    <option key={nom} value={nom} className="bg-geo-cream">{nom}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-geo-ink-soft mb-1">{t('messageLabel')}</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className={`${champ} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-bold text-geo-noir bg-gradient-geo-2027 hover:opacity-90 transition-all"
              >
                {t('sendButton')}
              </button>
            </form>
          )}
        </div>

        <div className="glass-2027 rounded-2xl p-6 h-fit">
          <h3 className="text-lg font-bold text-geo-ink mb-4">{fr ? 'Coordonnées' : 'Contact details'}</h3>
          <ul className="space-y-4 text-sm">
            {coordonnees.map(({ libelle, courriel }) => (
              <li key={courriel} className="flex items-start gap-3">
                <EnvelopeSimple size={20} weight="light" className="text-geo-ink flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-geo-ink">{libelle}</p>
                  <a href={`mailto:${courriel}`} className="text-geo-ink-soft hover:text-geo-ink transition-colors">
                    {courriel}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-geo-ink/10 pt-6">
            <h3 className="text-lg font-bold text-geo-ink mb-2">{fr ? 'Infolettre' : 'Newsletter'}</h3>
            <p className="text-sm text-geo-ink-soft mb-4">
              {fr
                ? 'Recevez les annonces de GÉOMTL 2027 : programme, inscriptions et nouveautés.'
                : 'Get GÉOMTL 2027 announcements: program, registration and news.'}
            </p>
            <BoutonInfolettre locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
