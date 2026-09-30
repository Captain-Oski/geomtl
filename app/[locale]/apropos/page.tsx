import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import type { Metadata } from 'next';
import { GlobeHemisphereWest } from '@phosphor-icons/react/dist/ssr/GlobeHemisphereWest';
import { Handshake } from '@phosphor-icons/react/dist/ssr/Handshake';
import { Lightbulb } from '@phosphor-icons/react/dist/ssr/Lightbulb';
import { Leaf } from '@phosphor-icons/react/dist/ssr/Leaf';
import { Translate } from '@phosphor-icons/react/dist/ssr/Translate';
import { Mountains } from '@phosphor-icons/react/dist/ssr/Mountains';
import { Target } from '@phosphor-icons/react/dist/ssr/Target';
import { Binoculars } from '@phosphor-icons/react/dist/ssr/Binoculars';
import { BookOpen } from '@phosphor-icons/react/dist/ssr/BookOpen';
import { Diamond } from '@phosphor-icons/react/dist/ssr/Diamond';
import { UsersThree } from '@phosphor-icons/react/dist/ssr/UsersThree';

export const metadata: Metadata = { title: 'À propos' };

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function AProposPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = locale === 'fr' ? [
    { Icon: GlobeHemisphereWest, title: 'Ouverture', desc: 'Nous croyons que les données géospatiales doivent être accessibles à tous, quel que soit leur niveau d\'expertise ou leurs moyens.' },
    { Icon: Handshake, title: 'Collaboration', desc: 'Le géospatial se construit à la croisée des secteurs. Nous facilitons les échanges entre le public, le privé, l\'académique et la société civile.' },
    { Icon: Lightbulb, title: 'Innovation', desc: 'Nous embrassons les nouvelles technologies tout en ancrant l\'innovation dans les besoins réels du territoire et des communautés.' },
    { Icon: Leaf, title: 'Responsabilité', desc: 'Le géospatial est un outil puissant. Nous nous engageons à l\'utiliser de manière éthique, inclusive et durable.' },
    { Icon: Translate, title: 'Bilinguisme', desc: 'GeoMTL se tient à Montréal, ville bilingue. Tous nos contenus sont disponibles en français et en anglais.' },
    { Icon: Mountains, title: 'Territoire', desc: 'Nous reconnaissons que Montréal est situé sur les terres non cédées des Kanien\'kehá:ka. Le territoire est notre raison d\'être.' },
  ] : [
    { Icon: GlobeHemisphereWest, title: 'Openness', desc: 'We believe geospatial data should be accessible to all, regardless of their level of expertise or means.' },
    { Icon: Handshake, title: 'Collaboration', desc: 'Geospatial is built at the crossroads of sectors. We facilitate exchanges between public, private, academic and civil society.' },
    { Icon: Lightbulb, title: 'Innovation', desc: 'We embrace new technologies while anchoring innovation in the real needs of the territory and communities.' },
    { Icon: Leaf, title: 'Responsibility', desc: 'Geospatial is a powerful tool. We are committed to using it ethically, inclusively and sustainably.' },
    { Icon: Translate, title: 'Bilingualism', desc: 'GeoMTL is held in Montreal, a bilingual city. All our content is available in French and English.' },
    { Icon: Mountains, title: 'Territory', desc: 'We acknowledge that Montreal is located on the unceded lands of the Kanien\'kehá:ka. Territory is our raison d\'être.' },
  ];

  const team = [
    { name: 'Martin Carpentier',       org: 'Jakarto',        role: locale === 'fr' ? 'Président et coordonnateur'                         : 'President & Coordinator',                         initials: 'MC', color: '#20FEFD' },
    { name: 'Joanie Desgroseilliers',  org: 'Hydro-Québec',   role: locale === 'fr' ? 'Secrétariat et opérations'                          : 'Secretariat & Operations',                        initials: 'JD', color: '#01CDA5' },
    { name: 'Adelmo Rodriguez',        org: 'K2 Geospatial',  role: locale === 'fr' ? 'Programmation, conférences, prix et bourses'         : 'Programming, Conferences, Awards & Grants',       initials: 'AR', color: '#1BC868' },
    { name: 'Martin Fafard',           org: 'Ville de Mascouche', role: locale === 'fr' ? 'Trésorerie'                                      : 'Treasurer',                                       initials: 'MF', color: '#D0DC00' },
    { name: 'Prosper Ravo',            org: 'Stantec',        role: locale === 'fr' ? 'Communications et Web'                               : 'Communications & Web',                            initials: 'PR', color: '#6A8C3A' },
    { name: 'Clément Glogowski',       org: 'Esri Canada',    role: locale === 'fr' ? 'Partenariats, exposants et expérience participants'  : 'Partnerships, Exhibitors & Attendee Experience',  initials: 'CG', color: '#00A383' },
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

      <Container className="py-12 space-y-16">
        {/* Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-geo-ink mb-4 flex items-center gap-2"><Target size={26} weight="light" aria-hidden="true" />{t('missionTitle')}</h2>
            <p className="text-geo-ink-soft leading-relaxed">
              {locale === 'fr'
                ? 'GeoMTL est la conférence de référence pour la communauté géospatiale du Québec et du Canada francophone. Notre mission est de rassembler chaque année les professionnels, chercheurs, décideurs et passionnés du géospatial pour partager des connaissances, créer des connexions et faire avancer le secteur.'
                : 'GeoMTL is the reference conference for the geospatial community in Quebec and French Canada. Our mission is to bring together geospatial professionals, researchers, decision-makers and enthusiasts every year to share knowledge, create connections and advance the sector.'}
            </p>
            <p className="text-geo-ink-soft leading-relaxed mt-4">
              {locale === 'fr'
                ? 'En 2027, GeoMTL rassemblera 350 professionnels au Centre de congrès de Saint-Hyacinthe pour deux journées intenses d\'apprentissage, de networking et de découverte. C\'est l\'événement géospatial majeur de l\'année pour le Canada francophone.'
                : 'In 2027, GeoMTL will bring together 350 professionals at the Centre de congrès de Saint-Hyacinthe for two intense days of learning, networking and discovery. It is the major geospatial event of the year for French Canada.'}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-geo-ink mb-4 flex items-center gap-2"><Binoculars size={26} weight="light" aria-hidden="true" />{t('visionTitle')}</h2>
            <p className="text-geo-ink-soft leading-relaxed">
              {locale === 'fr'
                ? 'Nous croyons que le géospatial est bien plus qu\'une technologie : c\'est un langage, une façon de comprendre et de prendre soin du territoire. Notre vision est un monde où les données géospatiales servent à prendre de meilleures décisions pour les communautés, les écosystèmes et les générations futures.'
                : 'We believe geospatial is much more than a technology: it is a language, a way of understanding and caring for the territory. Our vision is a world where geospatial data is used to make better decisions for communities, ecosystems and future generations.'}
            </p>
            <p className="text-geo-ink-soft leading-relaxed mt-4">
              {locale === 'fr'
                ? 'GeoMTL aspire à être le lieu où cette vision prend forme, où les idées deviennent des projets et où les projets deviennent des politiques et des pratiques.'
                : 'GeoMTL aspires to be the place where this vision takes shape, where ideas become projects and where projects become policies and practices.'}
            </p>
          </div>
        </section>

        {/* History */}
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-6 flex items-center gap-2"><BookOpen size={26} weight="light" aria-hidden="true" />{t('historyTitle')}</h2>
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-geo-teal-dark/60 via-geo-lime-dark/40 to-transparent" />
            <div className="space-y-6 pl-12">
              {[
                { year: '2024', fr: 'Première édition de GeoMTL — 300 participants, 20 conférenciers, Montréal', en: 'First GeoMTL edition — 300 attendees, 20 speakers, Montreal' },
                { year: '2025', fr: 'GeoMTL devient conférence bilingue — 500 participants, 35 conférenciers', en: 'GeoMTL becomes bilingual conference — 500 attendees, 35 speakers' },
                { year: '2026', fr: 'Expansion majeure — 750 participants, 50 conférenciers, 30 exposants, création des Prix GeoMTL', en: 'Major expansion — 750 attendees, 50 speakers, 30 exhibitors, GeoMTL Awards created' },
                { year: '2027', fr: 'GeoMTL 2027 — Objectif 1 000 participants, 60+ conférenciers, 50+ exposants', en: 'GeoMTL 2027 — Target: 1,000 attendees, 60+ speakers, 50+ exhibitors' },
              ].map(event => (
                <div key={event.year} className="relative">
                  <div className="absolute -left-12 top-1.5 w-5 h-5 rounded-full bg-geo-teal/25 border-2 border-geo-teal-dark flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-geo-teal-dark" />
                  </div>
                  <div className="glass-2027 rounded-xl p-4">
                    <span className="text-geo-teal-dark font-bold text-sm">{event.year}</span>
                    <p className="text-geo-ink text-sm mt-1">{locale === 'fr' ? event.fr : event.en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-6 flex items-center gap-2"><Diamond size={26} weight="light" aria-hidden="true" />{t('valuesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(value => (
              <div key={value.title} className="glass-2027 rounded-xl p-5">
                <value.Icon size={28} weight="light" className="text-geo-ink mb-3" aria-hidden="true" />
                <h3 className="font-bold text-geo-ink mb-2">{value.title}</h3>
                <p className="text-sm text-geo-ink-soft leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold text-geo-ink mb-6 flex items-center gap-2"><UsersThree size={26} weight="light" aria-hidden="true" />{t('teamTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map(member => (
              <div key={member.name} className="glass-2027 rounded-xl p-4 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black text-geo-ink flex-shrink-0"
                  style={{ background: `${member.color}20`, border: `1px solid ${member.color}40` }}
                >
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-geo-ink text-sm">{member.name}</p>
                  <p className="text-xs text-geo-ink-soft leading-snug">{member.role}</p>
                  <p className="text-xs mt-0.5 font-medium text-geo-teal-dark">{member.org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
