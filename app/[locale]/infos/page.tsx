'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import { Question } from '@phosphor-icons/react/dist/ssr/Question';
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr/ArrowSquareOut';
import CarteInfolettre from '@/components/ui/CarteInfolettre';
import { lienInfolettre } from '@/lib/infolettre';
import NotesBillets from '@/components/billetterie/NotesBillets';

const LIEN = 'font-semibold text-geo-teal-dark hover:underline';
const COURRIEL_CONFERENCIERS = EVENT_CONFIG.courriels.conferencier;

// Réservation individuelle au tarif négocié, jusqu'à la date de relâche du bloc
const HOTEL = {
  nom: 'Sheraton Saint-Hyacinthe',
  etoiles: 4,
  groupe: 'GéoMontréal congrès 2027',
  telephones: [
    { affiche: '450-250-5555', tel: '+14502505555' },
    { affiche: '1-833-250-8555', tel: '+18332508555' }
  ],
  reservation: 'https://app.marriott.com/reslink?id=1792699166193&key=GRP&app=resvlink'
};

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
      a: (
        <>
          {'Ce qui est inclus varie selon le forfait. Consultez la description de chaque billet sur la page '}
          <Link href="/fr/billetterie" className={LIEN}>Billetterie</Link>.
        </>
      )
    },
    {
      q: 'Y a-t-il des accommodations recommandées près du lieu?',
      a: (
        <>
          {`Le Sheraton Saint-Hyacinthe est attenant au Centre de congrès : pas besoin de sortir à l'extérieur. Chaque participant réserve sa chambre directement auprès de l'hôtel, avant la date de relâche du 2 septembre 2027, en mentionnant le nom du groupe « ${HOTEL.groupe} » pour obtenir le tarif négocié de 219 $/nuit : `}
          <a href={HOTEL.reservation} target="_blank" rel="noopener noreferrer" className={LIEN}>en ligne</a>
          {` ou au ${HOTEL.telephones.map((n) => n.affiche).join(' ou au ')}.`}
        </>
      )
    },
    {
      q: 'Puis-je transférer mon billet à un collègue?',
      a: (
        <>
          <p>Non. Les billets sont nominatifs et non transférables. Voici les conditions indiquées sous les billets :</p>
          <NotesBillets fr className="mt-3" />
        </>
      )
    },
    {
      q: 'La conférence est-elle diffusée en ligne?',
      a: 'Non, la conférence ne sera pas diffusée en ligne. GÉOMTL 2027 se tient uniquement en présentiel, au Centre de congrès de Saint-Hyacinthe.'
    },
    {
      q: 'Comment soumettre une proposition de conférence?',
      a: (
        <>
          <a href={lienInfolettre('fr')} className={LIEN}>Inscrivez-vous à l&apos;infolettre</a>
          {' pour recevoir tous les détails de l\'appel de propositions dès leur publication. Pour toute question d\'ici là, écrivez à '}
          <a href={`mailto:${COURRIEL_CONFERENCIERS}`} className={LIEN}>{COURRIEL_CONFERENCIERS}</a>.
        </>
      )
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
      a: (
        <>
          {'What is included depends on the package. See the description of each ticket on the '}
          <Link href="/en/billetterie" className={LIEN}>Tickets</Link>
          {' page.'}
        </>
      )
    },
    {
      q: 'Are there recommended accommodations near the venue?',
      a: (
        <>
          {`The Sheraton Saint-Hyacinthe is directly connected to the convention centre: no need to go outside. Each attendee books their room directly with the hotel, before the September 2, 2027 release date, mentioning the group name "${HOTEL.groupe}" to get the negotiated rate of $219/night: `}
          <a href={HOTEL.reservation} target="_blank" rel="noopener noreferrer" className={LIEN}>online</a>
          {` or by calling ${HOTEL.telephones.map((n) => n.affiche).join(' or ')}.`}
        </>
      )
    },
    {
      q: 'Can I transfer my ticket to a colleague?',
      a: (
        <>
          <p>No. Tickets are issued in the attendee&apos;s name and are non-transferable. Here are the conditions listed under the tickets:</p>
          <NotesBillets fr={false} className="mt-3" />
        </>
      )
    },
    {
      q: 'Will the conference be streamed online?',
      a: 'No, the conference will not be streamed online. GÉOMTL 2027 is held in person only, at the Centre de congrès de Saint-Hyacinthe.'
    },
    {
      q: 'How do I submit a conference proposal?',
      a: (
        <>
          <a href={lienInfolettre('en')} className={LIEN}>Subscribe to the newsletter</a>
          {' to receive all the details of the call for proposals as soon as they are published. For any questions in the meantime, write to '}
          <a href={`mailto:${COURRIEL_CONFERENCIERS}`} className={LIEN}>{COURRIEL_CONFERENCIERS}</a>.
        </>
      )
    }
  ]
};

export default function InfosPage() {
  const t = useTranslations('info');
  const locale = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqList = locale === 'fr' ? faqs.fr : faqs.en;
  const fr = locale === 'fr';
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
        <CarteInfolettre locale={locale} />
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
                    <p>{locale === 'fr' ? 'Jour 1 : 8h30–16h45, puis soirée réseautage dès 18h · Jour 2 : 8h30–16h45' : 'Day 1: 8:30am–4:45pm, then networking evening from 6pm · Day 2: 8:30am–4:45pm'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GlobeHemisphereWest size={20} weight="light" className="text-geo-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    {/* Environ 95 % des allocutions sont en français */}
                    <p className="text-geo-ink font-semibold">{locale === 'fr' ? 'Langue' : 'Language'}</p>
                    <p>{locale === 'fr' ? 'Français' : 'French'}</p>
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
          <div className="glass-2027 rounded-2xl p-6 max-w-3xl">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-geo-ink text-base">{HOTEL.nom}</h3>
              <span className="flex gap-0.5 text-geo-lime-dark" aria-label={`${HOTEL.etoiles} / 5`}>{Array.from({ length: HOTEL.etoiles }, (_, i) => <Star key={i} size={14} weight="fill" aria-hidden="true" />)}</span>
            </div>
            <p className="text-geo-ink-soft text-sm mb-1 flex items-center gap-1.5"><MapPin size={16} weight="light" className="flex-shrink-0" aria-hidden="true" />{fr ? 'Sur place (attenant au Centre de congrès)' : 'On site (connected to the convention centre)'}</p>
            <p className="text-geo-teal-dark font-semibold text-sm mb-3">{fr ? 'Tarif négocié : 219 $/nuit' : 'Negotiated rate: $219/night'}</p>
            <p className="text-geo-ink-soft text-sm leading-relaxed mb-4">
              {fr
                ? 'Réservation individuelle : chaque participant réserve sa chambre directement auprès de l\'hôtel, en ligne ou par téléphone, et mentionne le nom du groupe pour obtenir le tarif négocié.'
                : 'Individual booking: each attendee books their room directly with the hotel, online or by phone, and mentions the group name to get the negotiated rate.'}
            </p>
            <dl className="grid gap-3 sm:grid-cols-3 text-sm mb-5">
              <div className="p-3 rounded-lg bg-geo-ink/5 border border-geo-ink/10">
                <dt className="text-xs text-geo-ink-soft">{fr ? 'Nom du groupe' : 'Group name'}</dt>
                <dd className="font-bold text-geo-teal-dark">{HOTEL.groupe}</dd>
              </div>
              <div className="p-3 rounded-lg bg-geo-ink/5 border border-geo-ink/10">
                <dt className="text-xs text-geo-ink-soft">{fr ? 'Téléphone' : 'Phone'}</dt>
                {HOTEL.telephones.map((n) => (
                  <dd key={n.tel}><a href={`tel:${n.tel}`} className="font-semibold text-geo-ink hover:underline">{n.affiche}</a></dd>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-geo-ink/5 border border-geo-ink/10">
                <dt className="text-xs text-geo-ink-soft">{fr ? 'Réserver avant le' : 'Book before'}</dt>
                <dd className="font-semibold text-geo-ink">{fr ? '2 septembre 2027' : 'September 2, 2027'}</dd>
              </div>
            </dl>
            <a
              href={HOTEL.reservation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-geo-2027 px-5 py-2.5 text-sm font-bold text-geo-noir transition-opacity hover:opacity-90"
            >
              {fr ? 'Réserver en ligne' : 'Book online'}
              <ArrowSquareOut size={16} weight="light" aria-hidden="true" />
            </a>
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
                    <div className="text-geo-ink-soft text-sm leading-relaxed">{faq.a}</div>
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
