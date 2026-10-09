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
import { Microphone } from '@phosphor-icons/react/dist/ssr/Microphone';
import { Martini } from '@phosphor-icons/react/dist/ssr/Martini';
import { Ticket } from '@phosphor-icons/react/dist/ssr/Ticket';
import { Television } from '@phosphor-icons/react/dist/ssr/Television';
import { IdentificationBadge } from '@phosphor-icons/react/dist/ssr/IdentificationBadge';
import { cn } from '@/lib/utils';

const COURRIEL_PARTENARIATS = 'info@geomtl.com';

// Gradation décroissante Or > Argent > Bronze > Exposant : crèmes de plus en plus clairs
// et globe de la marque recoloré du plus intense au plus pâle (mêmes réglages que /demo).
// Fonds fixes, indépendants du thème, assortis au fond de chaque image.
const NIVEAUX_VISUELS: Record<string, { globe?: string; fond: string; accent: string }> = {
  or: { globe: '/images/brand/cartes/or.webp', fond: 'bg-[#E6E1CF]', accent: '#00735F' },
  argent: { globe: '/images/brand/cartes/argent.webp', fond: 'bg-[#ECE9DD]', accent: '#0E6F80' },
  bronze: { globe: '/images/brand/cartes/bronze.webp', fond: 'bg-[#F2F0E7] ring-1 ring-inset ring-black/10', accent: '#4F7A1E' },
  exposant: { fond: 'bg-[#F8F7F2] ring-1 ring-inset ring-black/10', accent: '#5A5A52' },
};

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

  const avantages57 = fr ? [
    { Icon: Microphone, titre: 'Mot d\'accueil', texte: '5 minutes au micro pour lancer la soirée.' },
    { Icon: Martini, titre: 'Cocktail signature', texte: 'Un cocktail créé à votre nom, servi toute la soirée.' },
    { Icon: Ticket, titre: 'La tournée est sur vous', texte: 'Des coupons de consommation à vos couleurs remis aux participants.' },
    { Icon: Television, titre: 'Écrans à votre image', texte: 'Votre logo et votre vidéo en boucle dans la salle.' },
    { Icon: Megaphone, titre: '« Présenté par »', texte: 'Votre nom dans le programme, l\'app et l\'infolettre.' },
    { Icon: IdentificationBadge, titre: '2 passes incluses', texte: '2 passes d\'accès à la conférence pour votre équipe.' },
  ] : [
    { Icon: Microphone, titre: 'Welcome remarks', texte: '5 minutes at the mic to kick off the evening.' },
    { Icon: Martini, titre: 'Signature cocktail', texte: 'A cocktail named after you, served all evening.' },
    { Icon: Ticket, titre: 'The round is on you', texte: 'Drink tickets in your colours handed to attendees.' },
    { Icon: Television, titre: 'Screens in your image', texte: 'Your logo and video looping in the room.' },
    { Icon: Megaphone, titre: '“Presented by”', texte: 'Your name in the program, the app and the newsletter.' },
    { Icon: IdentificationBadge, titre: '2 included passes', texte: '2 conference passes for your team.' },
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

              const visuel = NIVEAUX_VISUELS[level];
              const color = visuel.accent;

              return (
                <motion.div
                  key={level}
                  className={cn(
                    'relative h-full rounded-2xl',
                    level === 'or' && 'p-[2px] bg-gradient-geo-2027 shadow-geo-2027',
                    level === 'argent' && 'p-px bg-gradient-geo-2027'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  {/* À cheval sur le bord, hors du flux : les noms des niveaux restent alignés */}
                  {level === 'or' && (
                    <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-geo-2027 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-geo-noir shadow-sm">
                      {fr ? 'Partenaire principal' : 'Lead partner'}
                    </span>
                  )}
                  <div
                    className={cn(
                      'relative h-full overflow-hidden p-6',
                      visuel.fond,
                      visuel.globe && 'pb-44',
                      level === 'or' ? 'rounded-[14px]' : level === 'argent' ? 'rounded-[15px]' : 'rounded-2xl'
                    )}
                  >
                    {visuel.globe && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={visuel.globe}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full object-cover object-top [mask-image:linear-gradient(to_bottom,transparent,black_45%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
                      />
                    )}
                    {level === 'bronze' && (
                      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-geo-2027" />
                    )}

                    <div className="relative">
                      <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>
                        {data.name}
                      </div>
                      <div
                        className={cn(
                          'text-3xl font-black',
                          level === 'or'
                            ? 'bg-gradient-to-r from-[#00735F] to-[#4F7A1E] bg-clip-text text-transparent'
                            : 'text-geo-noir'
                        )}
                      >
                        {data.price}
                      </div>
                      <div className="text-xs mb-4 text-[#5A5A52]">{data.capacity}</div>
                      <ul className="space-y-2">
                        {data.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#4A4A44]">
                            <Check size={14} weight={level === 'exposant' ? 'light' : 'bold'} color={color} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-8 rounded-3xl p-[2px] bg-gradient-geo-2027 shadow-geo-2027"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Fond crème fixe avec le globe standard de la charte, quel que soit le thème */}
            <div className="relative overflow-hidden rounded-[22px] bg-[#F4F3EE] px-6 py-8 sm:px-10 sm:py-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/cartes/cinq-a-sept.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#F4F3EE] from-35% via-[#F4F3EE]/60 via-55% to-transparent to-80%" />

              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-gradient-geo-2027 px-3 py-1 text-xs font-bold uppercase tracking-wider text-geo-noir">
                      {fr ? 'À la carte' : 'À la carte'}
                    </span>
                    <span className="rounded-full border border-geo-noir/20 bg-white/50 px-3 py-1 text-xs font-semibold text-geo-noir">
                      {fr ? 'Exclusif · 1 seul partenaire' : 'Exclusive · 1 partner only'}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-3xl sm:text-4xl font-bold leading-tight text-geo-noir">
                    {fr ? 'Le 5@7 réseautage, ' : 'The networking 5@7, '}
                    <span className="text-[#00735F]">{fr ? 'présenté par vous' : 'presented by you'}</span>
                  </h3>
                  <p className="mt-3 font-semibold text-geo-noir">
                    {fr ? 'Lundi 4 octobre 2027, de 17 h à 19 h' : 'Monday, October 4, 2027, 5 to 7 pm'}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4A4A44] max-w-lg">
                    {fr
                      ? 'Le moment le plus convivial du congrès : plus de 400 professionnels réunis autour d\'un verre. Votre organisation en est l\'hôte, du premier mot au dernier toast.'
                      : 'The most convivial moment of the conference: more than 400 professionals gathered over drinks. Your organization is the host, from the first word to the last toast.'}
                  </p>
                  <p className="mt-6 font-display text-5xl font-black bg-gradient-to-r from-[#00735F] to-[#4F7A1E] bg-clip-text text-transparent">
                    {fr ? '3 000 $' : '$3,000'}
                  </p>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {avantages57.map(({ Icon, titre, texte }) => (
                    <li key={titre} className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-md">
                      <Icon size={26} weight="light" className="text-[#00735F]" aria-hidden="true" />
                      <p className="mt-2 text-sm font-semibold text-geo-noir">{titre}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#4A4A44]">{texte}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
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
          </div>
        </section>
      </Container>
    </div>
  );
}
