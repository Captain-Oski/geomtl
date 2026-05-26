'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import { EVENT_CONFIG } from '@/data/config';

const faqs = {
  fr: [
    {
      q: 'Comment accéder au Palais des congrès de Montréal?',
      a: 'Le Palais des congrès est situé au cœur du centre-ville de Montréal, à 2 minutes à pied de la station de métro Place-d\'Armes (ligne Orange). Il est accessible par les stations Bonaventure (ligne Orange/Jaune) et Square-Victoria (ligne Orange).'
    },
    {
      q: 'Y a-t-il un stationnement sur place?',
      a: 'Oui, le Palais des congrès dispose d\'un stationnement souterrain accessible directement depuis l\'édifice. Des stationnements extérieurs sont également disponibles à proximité. Nous encourageons l\'utilisation du transport en commun ou du vélo.'
    },
    {
      q: 'Les repas sont-ils inclus dans le billet?',
      a: 'Le billet comprend les cafés de bienvenue, les pauses-café des deux journées, ainsi que les dîners du 14 et 15 octobre servis dans la zone d\'exposition. Les cocktails de bienvenue et de clôture sont également inclus.'
    },
    {
      q: 'Y a-t-il des accommodations recommandées près du lieu?',
      a: 'Nous avons négocié des tarifs préférentiels avec plusieurs hôtels à proximité. Consultez la section Hébergement de cette page pour les détails et les codes de réservation.'
    },
    {
      q: 'L\'événement est-il accessible aux personnes à mobilité réduite?',
      a: 'Oui, le Palais des congrès est entièrement accessible. Des ascenseurs, rampes d\'accès et espaces réservés sont disponibles dans toutes les salles. Contactez-nous à l\'avance pour tout besoin spécifique.'
    },
    {
      q: 'Puis-je transférer mon billet à un collègue?',
      a: 'Oui, les billets sont transférables. Connectez-vous à votre compte billetterie pour effectuer le transfert, au moins 72h avant l\'événement.'
    },
    {
      q: 'La conférence est-elle diffusée en ligne?',
      a: 'Certaines keynotes seront diffusées en direct et disponibles en rediffusion après l\'événement. Une formule hybride payante sera proposée pour les personnes ne pouvant pas se déplacer.'
    },
    {
      q: 'Comment soumettre une proposition de conférence?',
      a: 'L\'appel à propositions pour GeoMTL 2027 est ouvert jusqu\'au 15 mars 2027. Consultez la page Programmation pour les détails et le formulaire de soumission.'
    }
  ],
  en: [
    {
      q: 'How do I get to the Palais des congrès de Montréal?',
      a: 'The Palais des congrès is located in the heart of downtown Montreal, a 2-minute walk from Place-d\'Armes metro station (Orange line). It is also accessible from Bonaventure (Orange/Yellow line) and Square-Victoria (Orange line) stations.'
    },
    {
      q: 'Is there parking on site?',
      a: 'Yes, the Palais des congrès has underground parking accessible directly from the building. Outdoor parking is also available nearby. We encourage the use of public transit or cycling.'
    },
    {
      q: 'Are meals included in the ticket?',
      a: 'The ticket includes welcome coffees, coffee breaks on both days, and lunches on October 14 and 15 served in the exhibition area. Welcome and closing cocktails are also included.'
    },
    {
      q: 'Are there recommended accommodations near the venue?',
      a: 'We have negotiated preferential rates with several nearby hotels. See the Accommodation section of this page for details and booking codes.'
    },
    {
      q: 'Is the event accessible to people with reduced mobility?',
      a: 'Yes, the Palais des congrès is fully accessible. Elevators, ramps and reserved spaces are available in all rooms. Contact us in advance for any specific needs.'
    },
    {
      q: 'Can I transfer my ticket to a colleague?',
      a: 'Yes, tickets are transferable. Log in to your ticketing account to make the transfer, at least 72 hours before the event.'
    },
    {
      q: 'Will the conference be streamed online?',
      a: 'Some keynotes will be live-streamed and available for replay after the event. A paid hybrid format will be offered for those unable to attend in person.'
    },
    {
      q: 'How do I submit a conference proposal?',
      a: 'The call for proposals for GeoMTL 2027 is open until March 15, 2027. See the Programming page for details and the submission form.'
    }
  ]
};

const hotels = {
  fr: [
    { name: 'Hôtel W Montréal', stars: 5, distance: '5 min à pied', price: 'à partir de 299 $/nuit', code: 'GEOMTL27' },
    { name: 'Fairmont Le Reine Elizabeth', stars: 5, distance: '8 min à pied', price: 'à partir de 249 $/nuit', code: 'GEO2027' },
    { name: 'Hôtel Le Germain Montréal', stars: 4, distance: '10 min à pied', price: 'à partir de 189 $/nuit', code: 'GEOMTL' }
  ],
  en: [
    { name: 'W Montréal Hotel', stars: 5, distance: '5 min walk', price: 'from $299/night', code: 'GEOMTL27' },
    { name: 'Fairmont The Queen Elizabeth', stars: 5, distance: '8 min walk', price: 'from $249/night', code: 'GEO2027' },
    { name: 'Hôtel Le Germain Montréal', stars: 4, distance: '10 min walk', price: 'from $189/night', code: 'GEOMTL' }
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

      <Container className="py-12 space-y-16">
        {/* Venue */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">📍 {t('venueTitle')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                {locale === 'fr' ? 'Palais des congrès de Montréal' : 'Palais des congrès de Montréal'}
              </h3>
              <p className="text-mid-gray mb-4">{address}</p>
              <div className="w-full h-48 rounded-xl overflow-hidden" style={{
                background: 'linear-gradient(135deg, #0f2040 0%, #122035 50%, #0a1628 100%)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-geo/20 border border-rose-geo/40 flex items-center justify-center text-2xl">📍</div>
                  <p className="text-white font-semibold">Palais des congrès</p>
                  <p className="text-mid-gray text-sm">Montréal, QC</p>
                  <a
                    href="https://maps.google.com/?q=Palais+des+congrès+de+Montréal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-rose-geo hover:underline"
                  >
                    {locale === 'fr' ? 'Voir sur Google Maps →' : 'View on Google Maps →'}
                  </a>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                {locale === 'fr' ? 'Infos pratiques' : 'Practical info'}
              </h3>
              <ul className="space-y-3 text-sm text-mid-gray">
                <li className="flex items-start gap-3">
                  <span className="text-lg">🗓</span>
                  <div>
                    <p className="text-white font-semibold">{locale === 'fr' ? 'Dates' : 'Dates'}</p>
                    <p>{locale === 'fr' ? '14 et 15 octobre 2027' : 'October 14 and 15, 2027'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">⏰</span>
                  <div>
                    <p className="text-white font-semibold">{locale === 'fr' ? 'Horaires' : 'Hours'}</p>
                    <p>{locale === 'fr' ? 'Jour 1 : 8h00–19h00 · Jour 2 : 8h30–20h00' : 'Day 1: 8:00am–7:00pm · Day 2: 8:30am–8:00pm'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🌐</span>
                  <div>
                    <p className="text-white font-semibold">{locale === 'fr' ? 'Langues' : 'Languages'}</p>
                    <p>{locale === 'fr' ? 'Français et anglais' : 'French and English'}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Transport */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🚇 {t('transportTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: '🚇',
                title: t('metro'),
                desc: locale === 'fr'
                  ? 'Station Place-d\'Armes (ligne Orange), 2 min à pied. Stations Bonaventure et Square-Victoria à proximité.'
                  : 'Place-d\'Armes station (Orange line), 2 min walk. Bonaventure and Square-Victoria stations nearby.'
              },
              {
                icon: '🚌',
                title: t('bus'),
                desc: locale === 'fr'
                  ? 'Nombreuses lignes d\'autobus desservent le centre-ville. Arrêts à moins de 5 minutes à pied.'
                  : 'Many bus lines serve downtown. Stops within 5 minutes walk.'
              },
              {
                icon: '🚲',
                title: t('bike'),
                desc: locale === 'fr'
                  ? 'Stations BIXI à proximité immédiate. Supports à vélo disponibles sur place.'
                  : 'BIXI stations nearby. Bike racks available on site.'
              },
              {
                icon: '🚗',
                title: t('car'),
                desc: locale === 'fr'
                  ? 'Accès par l\'autoroute Ville-Marie (A-720). Stationnement souterrain sur place (tarif journalier 25 $).'
                  : 'Access via Ville-Marie Expressway (A-720). Underground parking on site (daily rate $25).'
              }
            ].map(item => (
              <div key={item.title} className="glass rounded-2xl p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-mid-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accommodation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🏨 {t('accomTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotelList.map(hotel => (
              <div key={hotel.name} className="glass rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-white text-base">{hotel.name}</h3>
                  <span className="text-yellow-geo text-sm">{'⭐'.repeat(hotel.stars)}</span>
                </div>
                <p className="text-mid-gray text-sm mb-1">📍 {hotel.distance}</p>
                <p className="text-orange-geo font-semibold text-sm mb-3">{hotel.price}</p>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs text-mid-gray">{locale === 'fr' ? 'Code :' : 'Code:'}</span>
                  <span className="text-xs font-mono font-bold text-rose-geo">{hotel.code}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">♿ {t('accessTitle')}</h2>
          <div className="glass rounded-2xl p-6">
            <p className="text-mid-gray leading-relaxed">
              {locale === 'fr'
                ? 'Le Palais des congrès de Montréal est entièrement accessible aux personnes à mobilité réduite. Toutes les salles sont équipées d\'ascenseurs, de rampes d\'accès, de places réservées au premier rang et de boucles magnétiques. Des services d\'interprétation en langue des signes québécoise (LSQ) et en American Sign Language (ASL) sont disponibles sur demande pour les keynotes principales. Contactez-nous à accessibilite@geomtl.ca pour tout besoin spécifique.'
                : 'The Palais des congrès de Montréal is fully accessible to people with reduced mobility. All rooms are equipped with elevators, ramps, reserved seating in the front row and hearing loops. Quebec Sign Language (LSQ) and American Sign Language (ASL) interpretation services are available upon request for main keynotes. Contact us at accessibility@geomtl.ca for any specific needs.'}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">❓ {t('faqTitle')}</h2>
          <div className="space-y-3">
            {faqList.map((faq, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                  <span className={`text-mid-gray transition-transform duration-200 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-mid-gray text-sm leading-relaxed">{faq.a}</p>
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
