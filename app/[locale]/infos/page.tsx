'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { EVENT_CONFIG } from '@/data/config';
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin';
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr/CalendarBlank';
import { Clock } from '@phosphor-icons/react/dist/ssr/Clock';
import { GlobeHemisphereWest } from '@phosphor-icons/react/dist/ssr/GlobeHemisphereWest';
import { Path } from '@phosphor-icons/react/dist/ssr/Path';
import { Car } from '@phosphor-icons/react/dist/ssr/Car';
import { Bus } from '@phosphor-icons/react/dist/ssr/Bus';
import { Train } from '@phosphor-icons/react/dist/ssr/Train';
import { Bicycle } from '@phosphor-icons/react/dist/ssr/Bicycle';
import { Bed } from '@phosphor-icons/react/dist/ssr/Bed';
import { Star } from '@phosphor-icons/react/dist/ssr/Star';
import { Wheelchair } from '@phosphor-icons/react/dist/ssr/Wheelchair';
import { Question } from '@phosphor-icons/react/dist/ssr/Question';
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown';

const faqs = {
  fr: [
    {
      q: 'Comment accéder au Centre de congrès de Saint-Hyacinthe?',
      a: 'Le Centre de congrès est situé au 1325, rue Daniel-Johnson Ouest, Saint-Hyacinthe. Accessible par l\'autoroute 20 (sortie Saint-Hyacinthe). Un stationnement extérieur gratuit et un stationnement intérieur gratuit pour les clients de l\'hôtel Sheraton sont disponibles sur place.'
    },
    {
      q: 'Y a-t-il un stationnement sur place?',
      a: 'Oui, le stationnement extérieur est gratuit pour tous les participants. Les clients séjournant au Sheraton Saint-Hyacinthe bénéficient également du stationnement intérieur gratuit.'
    },
    {
      q: 'Les repas sont-ils inclus dans le billet?',
      a: 'Le billet comprend les cafés de bienvenue, les pauses-café des deux journées, ainsi que les dîners du 4 et 5 octobre servis dans la zone d\'exposition. Le cocktail dinatoire du lundi soir est également inclus.'
    },
    {
      q: 'Y a-t-il des accommodations recommandées près du lieu?',
      a: 'Le Sheraton Saint-Hyacinthe est attenant au Centre de congrès — pas besoin de sortir à l\'extérieur. Un bloc de chambres est réservé au tarif de groupe de 219 $/nuit. Réservez au 450-250-5555 ou au 1-833-250-8555 en mentionnant « GEOMTL2027 » avant le 2 septembre 2027.'
    },
    {
      q: 'L\'événement est-il accessible aux personnes à mobilité réduite?',
      a: 'Oui, le Centre de congrès de Saint-Hyacinthe est entièrement accessible. Des ascenseurs, rampes d\'accès et espaces réservés sont disponibles dans toutes les salles. Contactez-nous à l\'avance pour tout besoin spécifique.'
    },
    {
      q: 'Puis-je transférer mon billet à un collègue?',
      a: 'Oui, les billets sont transférables. Connectez-vous à votre compte billetterie pour effectuer le transfert, au moins 72h avant l\'événement.'
    },
    {
      q: 'La conférence est-elle diffusée en ligne?',
      a: 'Certaines keynotes seront diffusées en direct. Aucune rediffusion ne sera offerte après l\'événement. Une formule hybride payante sera proposée pour les personnes ne pouvant pas se déplacer.'
    },
    {
      q: 'Comment soumettre une proposition de conférence?',
      a: 'L\'appel à propositions pour GÉOMTL 2027 est ouvert jusqu\'au 15 mars 2027. Consultez la page Programmation pour les détails et le formulaire de soumission.'
    }
  ],
  en: [
    {
      q: 'How do I get to the Centre de congrès de Saint-Hyacinthe?',
      a: 'The convention centre is located at 1325 rue Daniel-Johnson Ouest, Saint-Hyacinthe. Take Highway 20 to the Saint-Hyacinthe exit. Free outdoor parking and free indoor parking for Sheraton hotel guests are available on site.'
    },
    {
      q: 'Is there parking on site?',
      a: 'Yes, free outdoor parking is available for all attendees. Guests staying at the Sheraton Saint-Hyacinthe also have access to free indoor parking.'
    },
    {
      q: 'Are meals included in the ticket?',
      a: 'The ticket includes welcome coffees, coffee breaks on both days, and lunches on October 4 and 5 served in the exhibition area. The Monday evening cocktail dinner is also included.'
    },
    {
      q: 'Are there recommended accommodations near the venue?',
      a: 'The Sheraton Saint-Hyacinthe is directly connected to the convention centre — no need to go outside. A room block is reserved at the group rate of $219/night. Book at 1-833-250-8555 with the code "GEOMTL2027" before September 2, 2027.'
    },
    {
      q: 'Is the event accessible to people with reduced mobility?',
      a: 'Yes, the Centre de congrès de Saint-Hyacinthe is fully accessible. Elevators, ramps and reserved spaces are available in all rooms. Contact us in advance for any specific needs.'
    },
    {
      q: 'Can I transfer my ticket to a colleague?',
      a: 'Yes, tickets are transferable. Log in to your ticketing account to make the transfer, at least 72 hours before the event.'
    },
    {
      q: 'Will the conference be streamed online?',
      a: 'Some keynotes will be live-streamed. No replays will be available after the event. A paid hybrid format will be offered for those unable to attend in person.'
    },
    {
      q: 'How do I submit a conference proposal?',
      a: 'The call for proposals for GÉOMTL 2027 is open until March 15, 2027. See the Programming page for details and the submission form.'
    }
  ]
};

const hotels = {
  fr: [
    { name: 'Sheraton Saint-Hyacinthe', stars: 4, distance: 'Sur place (attenant au Centre de congrès)', price: 'à partir de 219 $/nuit', code: 'GEOMTL2027' }
  ],
  en: [
    { name: 'Sheraton Saint-Hyacinthe', stars: 4, distance: 'On site (connected to the convention centre)', price: 'from $219/night', code: 'GEOMTL2027' }
  ]
};

export default function InfosPage() {
  const t = useTranslations('info');
  const locale = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqList = locale === 'fr' ? faqs.fr : faqs.en;
  const hotelList = locale === 'fr' ? hotels.fr : hotels.en;
  const address = locale === 'fr' ? EVENT_CONFIG.address.fr : EVENT_CONFIG.address.en;

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

      <Container className="py-12 space-y-16">
        {/* Venue */}
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-6 flex items-center gap-2"><MapPin size={26} weight="light" aria-hidden="true" />{t('venueTitle')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-2027 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-geo-ink mb-2">
                Centre de congrès de Saint-Hyacinthe
              </h3>
              <p className="text-geo-ink-soft mb-4">{address}</p>
              <div className="w-full h-48 rounded-xl overflow-hidden" style={{
                background: 'linear-gradient(135deg, #141412 0%, #1D1D1A 50%, #2A2A26 100%)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-geo-teal/20 border border-geo-teal-dark/40 flex items-center justify-center text-white"><MapPin size={24} weight="light" aria-hidden="true" /></div>
                  <p className="text-white font-semibold">Centre de congrès de Saint-Hyacinthe</p>
                  <p className="text-white/60 text-sm">Saint-Hyacinthe, QC</p>
                  <a
                    href="https://maps.google.com/?q=Centre+de+congrès+de+Saint-Hyacinthe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-geo-teal hover:underline"
                  >
                    {locale === 'fr' ? 'Voir sur Google Maps →' : 'View on Google Maps →'}
                  </a>
                </div>
              </div>
            </div>
            <div className="glass-2027 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-geo-ink mb-4">
                {locale === 'fr' ? 'Infos pratiques' : 'Practical info'}
              </h3>
              <ul className="space-y-3 text-sm text-geo-ink-soft">
                <li className="flex items-start gap-3">
                  <CalendarBlank size={20} weight="light" className="text-geo-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-geo-ink font-semibold">{locale === 'fr' ? 'Dates' : 'Dates'}</p>
                    <p>{locale === 'fr' ? EVENT_CONFIG.dates.fr : EVENT_CONFIG.dates.en}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={20} weight="light" className="text-geo-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-geo-ink font-semibold">{locale === 'fr' ? 'Horaires' : 'Hours'}</p>
                    <p>{locale === 'fr' ? 'Jour 1 : 8h00–19h00 · Jour 2 : 8h30–17h00' : 'Day 1: 8:00am–7:00pm · Day 2: 8:30am–5:00pm'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GlobeHemisphereWest size={20} weight="light" className="text-geo-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-geo-ink font-semibold">{locale === 'fr' ? 'Langues' : 'Languages'}</p>
                    <p>{locale === 'fr' ? 'Français et anglais' : 'French and English'}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Transport */}
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-6 flex items-center gap-2"><Path size={26} weight="light" aria-hidden="true" />{t('transportTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                Icon: Car,
                title: t('car'),
                desc: locale === 'fr'
                  ? 'Accès par l\'autoroute 20, sortie Saint-Hyacinthe. Stationnement extérieur gratuit sur place. Stationnement intérieur gratuit pour les clients du Sheraton.'
                  : 'Take Highway 20, Saint-Hyacinthe exit. Free outdoor parking on site. Free indoor parking for Sheraton hotel guests.'
              },
              {
                Icon: Bus,
                title: t('bus'),
                desc: locale === 'fr'
                  ? 'Orléans Express relie Montréal à Saint-Hyacinthe. Des navettes peuvent être organisées depuis la gare d\'autobus. Le réseau STH dessert la ville localement.'
                  : 'Orléans Express connects Montreal to Saint-Hyacinthe. Shuttles can be arranged from the bus station. The STH network serves the city locally.'
              },
              {
                Icon: Train,
                title: locale === 'fr' ? 'Train' : 'Train',
                desc: locale === 'fr'
                  ? 'VIA Rail dessert Saint-Hyacinthe depuis Montréal (gare centrale). La gare de Saint-Hyacinthe est à environ 2 km du Centre de congrès.'
                  : 'VIA Rail serves Saint-Hyacinthe from Montreal (Central Station). Saint-Hyacinthe train station is about 2 km from the convention centre.'
              },
              {
                Icon: Bicycle,
                title: t('bike'),
                desc: locale === 'fr'
                  ? 'Des supports à vélo sont disponibles sur place. Le réseau cyclable de Saint-Hyacinthe permet d\'accéder au Centre de congrès.'
                  : 'Bike racks are available on site. Saint-Hyacinthe\'s cycling network provides access to the convention centre.'
              }
            ].map(item => (
              <div key={item.title} className="glass-2027 rounded-2xl p-5">
                <item.Icon size={30} weight="light" className="text-geo-ink mb-3" aria-hidden="true" />
                <h3 className="font-bold text-geo-ink text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-geo-ink-soft leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accommodation */}
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-6 flex items-center gap-2"><Bed size={26} weight="light" aria-hidden="true" />{t('accomTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotelList.map(hotel => (
              <div key={hotel.name} className="glass-2027 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-geo-ink text-base">{hotel.name}</h3>
                  <span className="flex gap-0.5 text-geo-lime-dark" aria-label={`${hotel.stars} / 5`}>{Array.from({ length: hotel.stars }, (_, i) => <Star key={i} size={14} weight="fill" aria-hidden="true" />)}</span>
                </div>
                <p className="text-geo-ink-soft text-sm mb-1 flex items-center gap-1.5"><MapPin size={16} weight="light" className="flex-shrink-0" aria-hidden="true" />{hotel.distance}</p>
                <p className="text-geo-teal-dark font-semibold text-sm mb-3">{hotel.price}</p>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-geo-ink/5 border border-geo-ink/10">
                  <span className="text-xs text-geo-ink-soft">{locale === 'fr' ? 'Code :' : 'Code:'}</span>
                  <span className="text-xs font-mono font-bold text-geo-teal-dark">{hotel.code}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-6 flex items-center gap-2"><Wheelchair size={26} weight="light" aria-hidden="true" />{t('accessTitle')}</h2>
          <div className="glass-2027 rounded-2xl p-6">
            <p className="text-geo-ink-soft leading-relaxed">
              {locale === 'fr'
                ? 'Le Centre de congrès de Saint-Hyacinthe est entièrement accessible aux personnes à mobilité réduite. Toutes les salles sont équipées d\'ascenseurs, de rampes d\'accès, de places réservées au premier rang et de boucles magnétiques. Des services d\'interprétation en langue des signes québécoise (LSQ) et en American Sign Language (ASL) sont disponibles sur demande pour les keynotes principales. Contactez-nous à info@geomtl.com pour tout besoin spécifique.'
                : 'The Centre de congrès de Saint-Hyacinthe is fully accessible to people with reduced mobility. All rooms are equipped with elevators, ramps, reserved seating in the front row and hearing loops. Quebec Sign Language (LSQ) and American Sign Language (ASL) interpretation services are available upon request for main keynotes. Contact us at info@geomtl.com for any specific needs.'}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-6 flex items-center gap-2"><Question size={26} weight="light" aria-hidden="true" />{t('faqTitle')}</h2>
          <div className="space-y-3">
            {faqList.map((faq, index) => (
              <div key={index} className="glass-2027 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-geo-ink/5 transition-colors"
                >
                  <span className="text-geo-ink font-semibold text-sm pr-4">{faq.q}</span>
                  <span className={`text-geo-ink-soft transition-transform duration-200 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <CaretDown size={16} weight="light" aria-hidden="true" />
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-geo-ink-soft text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
