'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { partnerLevelBenefits, PARTNER_LEVELS_ORDER } from '@/data/partners';
import { Check } from '@phosphor-icons/react/dist/ssr/Check';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { FileText } from '@phosphor-icons/react/dist/ssr/FileText';
import { UsersThree } from '@phosphor-icons/react/dist/ssr/UsersThree';
import { Lightbulb } from '@phosphor-icons/react/dist/ssr/Lightbulb';
import { Megaphone } from '@phosphor-icons/react/dist/ssr/Megaphone';
import { ChatsCircle } from '@phosphor-icons/react/dist/ssr/ChatsCircle';
import { TrendUp } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { Handshake } from '@phosphor-icons/react/dist/ssr/Handshake';
import { Presentation } from '@phosphor-icons/react/dist/ssr/Presentation';
import { Leaf } from '@phosphor-icons/react/dist/ssr/Leaf';
import { Storefront } from '@phosphor-icons/react/dist/ssr/Storefront';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr/ArrowSquareOut';

const COURRIEL_PARTENARIATS = 'info@geomtl.com';

export default function DevenirPartenairePage() {
  const t = useTranslations('becomePartner');
  const locale = useLocale();
  const fr = locale === 'fr';
  const [formData, setFormData] = useState({
    name: '', org: '', email: '', message: ''
  });
  const [sent, setSent] = useState(false);

  // Pas de service d'envoi côté serveur : on ouvre le logiciel de courriel du visiteur, message prérempli.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sujet = fr ? `Partenariat GÉOMTL 2027 — ${formData.org}` : `GÉOMTL 2027 partnership — ${formData.org}`;
    const corps = [
      `${fr ? 'Nom' : 'Name'} : ${formData.name}`,
      `${fr ? 'Organisation' : 'Organization'} : ${formData.org}`,
      `${fr ? 'Courriel' : 'Email'} : ${formData.email}`,
      '',
      formData.message,
    ].join('\n');
    window.location.href = `mailto:${COURRIEL_PARTENARIATS}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    setSent(true);
  };

  const raisonsPartenaire = fr ? [
    { Icon: UsersThree, titre: 'Participer', texte: 'Faire partie de l\'événement de référence de l\'industrie géospatiale et favoriser son développement au Québec.' },
    { Icon: Lightbulb, titre: 'Inspirer', texte: 'Faire rayonner votre expertise et connaître les perspectives d\'avenir dans le domaine.' },
    { Icon: Megaphone, titre: 'Valoriser', texte: 'Profiter d\'une visibilité potentielle auprès de 4 000 personnes intéressées aux technologies géospatiales, dont plus de 200 entreprises.' },
    { Icon: ChatsCircle, titre: 'Échanger', texte: 'Faire des rencontres enrichissantes avec des passionnés dans le salon des exposants et au 5 à 7 réseautage.' },
  ] : [
    { Icon: UsersThree, titre: 'Participate', texte: 'Be part of the geospatial industry\'s reference event and support its development in Quebec.' },
    { Icon: Lightbulb, titre: 'Inspire', texte: 'Showcase your expertise and learn about the future of the field.' },
    { Icon: Megaphone, titre: 'Gain visibility', texte: 'Reach a potential audience of 4,000 people interested in geospatial technologies, including more than 200 companies.' },
    { Icon: ChatsCircle, titre: 'Connect', texte: 'Have meaningful conversations with enthusiasts in the exhibition hall and at the networking reception.' },
  ];

  const raisonsExposant = fr ? [
    { Icon: TrendUp, titre: 'Développement des affaires', texte: 'Élargir votre clientèle en rencontrant plus de 400 participants sur deux jours.' },
    { Icon: Megaphone, titre: 'Visibilité', texte: 'Développer votre notoriété auprès de la communauté et attirer de nouveaux talents.' },
    { Icon: Handshake, titre: 'Réseautage', texte: 'Échanger avec de futurs collaborateurs issus des nombreuses organisations géospatiales présentes.' },
    { Icon: Presentation, titre: 'Inspiration', texte: 'Présenter vos produits et services, et démontrer vos nouveautés.' },
  ] : [
    { Icon: TrendUp, titre: 'Business development', texte: 'Grow your client base by meeting more than 400 attendees over two days.' },
    { Icon: Megaphone, titre: 'Visibility', texte: 'Build your reputation in the community and attract new talent.' },
    { Icon: Handshake, titre: 'Networking', texte: 'Connect with future collaborators from the many geospatial organizations attending.' },
    { Icon: Presentation, titre: 'Inspiration', texte: 'Present your products and services, and demonstrate what\'s new.' },
  ];

  const kiosque = fr ? [
    'Un espace de 10 pi × 10 pi au cœur du salon, là où sont servies les pauses-café',
    'Une cloison arrière de 8 pi et deux cloisons latérales de 3 pi, en tissu',
    'Une table nappée de 6 pi et 2 chaises',
    'Wi-Fi gratuit du Centre de congrès',
    'Électricité (une prise de 15 A)',
  ] : [
    'A 10 ft × 10 ft space in the heart of the exhibition hall, where coffee breaks are served',
    'An 8 ft back wall and two 3 ft side walls, in fabric',
    'A 6 ft draped table and 2 chairs',
    'Free convention centre Wi-Fi',
    'Electricity (one 15 A outlet)',
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
          <div className="text-center mt-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-geo-noir bg-gradient-geo-2027 hover:opacity-90 transition-all shadow-geo-2027">
              <FileText size={20} weight="light" aria-hidden="true" />
              {t('downloadProspectus')}
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-12 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-8">
            {fr ? 'Pourquoi devenir partenaire?' : 'Why become a partner?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {raisonsPartenaire.map(({ Icon, titre, texte }) => (
              <div key={titre} className="glass-2027 rounded-2xl p-6">
                <Icon size={28} weight="light" className="text-geo-ink mb-3" aria-hidden="true" />
                <h3 className="font-bold text-geo-ink mb-2">{titre}</h3>
                <p className="text-sm text-geo-ink-soft leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-2">
            {fr ? 'Niveaux de partenariat' : 'Partnership Levels'}
          </h2>
          <p className="text-sm text-geo-ink-soft mb-8">
            {fr ? 'Quantités limitées : priorité aux premiers arrivés.' : 'Limited availability: first come, first served.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNER_LEVELS_ORDER.map((level, index) => {
              const data = fr
                ? partnerLevelBenefits[level].fr
                : partnerLevelBenefits[level].en;

              // Variables de la charte (et non des hex) pour suivre le thème
              const canaux = {
                or: '--rgb-geo-lime-dark',
                argent: '--rgb-geo-teal-dark',
                bronze: '--rgb-geo-olive',
                exposant: '--rgb-geo-ink-soft'
              };
              const color = `rgb(var(${canaux[level]}))`;

              return (
                <motion.div
                  key={level}
                  className="glass-2027 rounded-2xl p-6 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  style={{ borderTop: `2px solid rgb(var(${canaux[level]}) / 0.38)` }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color }}
                  >
                    {data.name}
                  </div>
                  <div className="text-2xl font-black text-geo-ink">{data.price}</div>
                  <div className="text-xs text-geo-ink-soft mb-4">{data.capacity}</div>
                  <ul className="space-y-2">
                    {data.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-geo-ink-soft">
                        <Check size={14} weight="light" color={color} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-8">
            {fr ? 'Pourquoi devenir exposant?' : 'Why become an exhibitor?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {raisonsExposant.map(({ Icon, titre, texte }) => (
              <div key={titre} className="glass-2027 rounded-2xl p-6">
                <Icon size={28} weight="light" className="text-geo-ink mb-3" aria-hidden="true" />
                <h3 className="font-bold text-geo-ink mb-2">{titre}</h3>
                <p className="text-sm text-geo-ink-soft leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="glass-2027 rounded-2xl p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-geo-ink mb-4 flex items-center gap-2">
                <Storefront size={24} weight="light" aria-hidden="true" />
                {fr ? 'Votre espace d\'exposition comprend' : 'Your exhibition space includes'}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {kiosque.map((element) => (
                  <li key={element} className="flex items-start gap-2 text-sm text-geo-ink-soft">
                    <Check size={14} weight="light" className="mt-1 flex-shrink-0 text-geo-ink" aria-hidden="true" />
                    {element}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-geo-ink-soft mt-4">
                {fr
                  ? 'Limite de 2 espaces par exposant. D\'autres aménagements sont possibles moyennant des frais supplémentaires : contactez-nous pour en discuter.'
                  : 'Limit of 2 spaces per exhibitor. Other setups are possible for an additional fee: contact us to discuss your project.'}
              </p>
            </div>
            <div className="glass-2027 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-geo-ink mb-3 flex items-center gap-2">
                <Leaf size={24} weight="light" aria-hidden="true" />
                {fr ? 'Environnement' : 'Environment'}
              </h3>
              <p className="text-sm text-geo-ink-soft leading-relaxed">
                {fr
                  ? 'Nous invitons partenaires et exposants à limiter les impressions papier, à privilégier le numérique et des approches durables, et à rapporter le matériel promotionnel non distribué.'
                  : 'We encourage partners and exhibitors to limit paper printing, favour digital and sustainable approaches, and take back any undistributed promotional material.'}
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-geo-ink mb-4">{t('contactTitle')}</h2>
            <p className="text-geo-ink-soft mb-8">
              {fr
                ? 'Vous souhaitez rejoindre GÉOMTL 2027 comme partenaire ou exposant? Écrivez à notre équipe partenariats.'
                : 'Want to join GÉOMTL 2027 as a partner or exhibitor? Write to our partnerships team.'}
            </p>

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
                  <a href={`mailto:${COURRIEL_PARTENARIATS}`} className="text-geo-teal-dark hover:underline">{COURRIEL_PARTENARIATS}</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="partenaire-nom" className="block text-sm font-medium text-geo-ink-soft mb-1">{t('nameLabel')}</label>
                  <input
                    id="partenaire-nom"
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink placeholder:text-geo-ink-soft/50 border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="partenaire-org" className="block text-sm font-medium text-geo-ink-soft mb-1">{t('orgLabel')}</label>
                  <input
                    id="partenaire-org"
                    type="text"
                    required
                    value={formData.org}
                    onChange={e => setFormData({ ...formData, org: e.target.value })}
                    className="w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink placeholder:text-geo-ink-soft/50 border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="partenaire-courriel" className="block text-sm font-medium text-geo-ink-soft mb-1">{t('emailLabel')}</label>
                  <input
                    id="partenaire-courriel"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink placeholder:text-geo-ink-soft/50 border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="partenaire-message" className="block text-sm font-medium text-geo-ink-soft mb-1">{t('messageLabel')}</label>
                  <textarea
                    id="partenaire-message"
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 glass-2027 rounded-xl text-geo-ink placeholder:text-geo-ink-soft/50 border border-geo-ink/10 focus:border-geo-teal-dark/50 focus:outline-none text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-geo-noir bg-gradient-geo-2027 hover:opacity-90 transition-all"
                >
                  {t('sendButton')}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass-2027 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-geo-ink mb-3">
                {fr ? 'Équipe partenariats' : 'Partnerships Team'}
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-geo-teal/15 border border-geo-teal-dark/30 flex items-center justify-center text-sm font-bold text-geo-teal-dark">
                  CG
                </div>
                <div>
                  <p className="text-geo-ink text-sm font-semibold">Clément Glogowski</p>
                  <p className="text-xs text-geo-ink-soft">
                    {fr ? 'Partenariats, exposants et expérience participants' : 'Partnerships, Exhibitors & Attendee Experience'}
                  </p>
                  <a href={`mailto:${COURRIEL_PARTENARIATS}`} className="text-xs text-geo-teal-dark/80 hover:text-geo-teal-dark">
                    {COURRIEL_PARTENARIATS}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-2027 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-geo-ink mb-3">
                {fr ? 'Un événement de l\'ACSG – Section Montréal' : 'An ACSG – Montréal Section event'}
              </h3>
              <p className="text-sm text-geo-ink-soft leading-relaxed">
                {fr
                  ? 'GÉOMTL est organisé par la section montréalaise de l\'Association canadienne des sciences géomatiques (ACSG), une association scientifique et technique sans but lucratif vouée à l\'avancement de la géomatique au Canada. Active depuis 1953, la section de Montréal présente cet événement depuis 1981 pour créer des occasions d\'affaires et d\'échanges en géomatique.'
                  : 'GÉOMTL is organized by the Montréal section of the ACSG (Canadian Institute of Geomatics), a non-profit scientific and technical association dedicated to advancing geomatics in Canada. Active since 1953, the Montréal section has presented this event since 1981 to create business and networking opportunities in geomatics.'}
              </p>
              <a
                href="https://acsg-montreal.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-geo-teal-dark hover:underline"
              >
                acsg-montreal.ca
                <ArrowSquareOut size={14} weight="light" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
