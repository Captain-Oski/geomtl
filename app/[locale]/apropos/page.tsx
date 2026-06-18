import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import type { Metadata } from 'next';

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
    { icon: '🌍', title: 'Ouverture', desc: 'Nous croyons que les données géospatiales doivent être accessibles à tous, quel que soit leur niveau d\'expertise ou leurs moyens.' },
    { icon: '🤝', title: 'Collaboration', desc: 'Le géospatial se construit à la croisée des secteurs. Nous facilitons les échanges entre le public, le privé, l\'académique et la société civile.' },
    { icon: '💡', title: 'Innovation', desc: 'Nous embrassons les nouvelles technologies tout en ancrant l\'innovation dans les besoins réels du territoire et des communautés.' },
    { icon: '🌿', title: 'Responsabilité', desc: 'Le géospatial est un outil puissant. Nous nous engageons à l\'utiliser de manière éthique, inclusive et durable.' },
    { icon: '🗣️', title: 'Bilinguisme', desc: 'GeoMTL se tient à Montréal, ville bilingue. Tous nos contenus sont disponibles en français et en anglais.' },
    { icon: '🏔️', title: 'Territoire', desc: 'Nous reconnaissons que Montréal est situé sur les terres non cédées des Kanien\'kehá:ka. Le territoire est notre raison d\'être.' },
  ] : [
    { icon: '🌍', title: 'Openness', desc: 'We believe geospatial data should be accessible to all, regardless of their level of expertise or means.' },
    { icon: '🤝', title: 'Collaboration', desc: 'Geospatial is built at the crossroads of sectors. We facilitate exchanges between public, private, academic and civil society.' },
    { icon: '💡', title: 'Innovation', desc: 'We embrace new technologies while anchoring innovation in the real needs of the territory and communities.' },
    { icon: '🌿', title: 'Responsibility', desc: 'Geospatial is a powerful tool. We are committed to using it ethically, inclusively and sustainably.' },
    { icon: '🗣️', title: 'Bilingualism', desc: 'GeoMTL is held in Montreal, a bilingual city. All our content is available in French and English.' },
    { icon: '🏔️', title: 'Territory', desc: 'We acknowledge that Montreal is located on the unceded lands of the Kanien\'kehá:ka. Territory is our raison d\'être.' },
  ];

  const team = [
    { name: 'Martin Carpentier',       org: 'Jakarto',        role: locale === 'fr' ? 'Président et coordonnateur'                         : 'President & Coordinator',                         initials: 'MC', color: '#e91e8c' },
    { name: 'Joanie Desgroseilliers',  org: 'Hydro-Québec',   role: locale === 'fr' ? 'Secrétariat et opérations'                          : 'Secretariat & Operations',                        initials: 'JD', color: '#ff6b35' },
    { name: 'Adelmo Rodriguez',        org: 'K2 Geospatial',  role: locale === 'fr' ? 'Programmation, conférences, prix et bourses'         : 'Programming, Conferences, Awards & Grants',       initials: 'AR', color: '#ffd60a' },
    { name: 'Martin Fafard',           org: 'Ville de Mascouche', role: locale === 'fr' ? 'Trésorerie'                                      : 'Treasurer',                                       initials: 'MF', color: '#10b981' },
    { name: 'Prosper Ravo',            org: 'Stantec',        role: locale === 'fr' ? 'Communications et Web'                               : 'Communications & Web',                            initials: 'PR', color: '#5b9bd5' },
    { name: 'Clément Glogowski',       org: 'Esri Canada',    role: locale === 'fr' ? 'Partenariats, exposants et expérience participants'  : 'Partnerships, Exhibitors & Attendee Experience',  initials: 'CG', color: '#a78bfa' },
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

      <Container className="py-12 space-y-16">
        {/* Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">🎯 {t('missionTitle')}</h2>
            <p className="text-mid-gray leading-relaxed">
              {locale === 'fr'
                ? 'GeoMTL est la conférence de référence pour la communauté géospatiale du Québec et du Canada francophone. Notre mission est de rassembler chaque année les professionnels, chercheurs, décideurs et passionnés du géospatial pour partager des connaissances, créer des connexions et faire avancer le secteur.'
                : 'GeoMTL is the reference conference for the geospatial community in Quebec and French Canada. Our mission is to bring together geospatial professionals, researchers, decision-makers and enthusiasts every year to share knowledge, create connections and advance the sector.'}
            </p>
            <p className="text-mid-gray leading-relaxed mt-4">
              {locale === 'fr'
                ? 'En 2027, GeoMTL rassemblera 350 professionnels au Centre de congrès de Saint-Hyacinthe pour deux journées intenses d\'apprentissage, de networking et de découverte. Avec 60+ conférenciers, 20 ateliers pratiques, 26 exposants et 5 prix, c\'est l\'événement géospatial majeur de l\'année pour le Canada francophone.'
                : 'In 2027, GeoMTL will bring together 350 professionals at the Centre de congrès de Saint-Hyacinthe for two intense days of learning, networking and discovery. With 60+ speakers, 20 practical workshops, 26 exhibitors and 5 awards, it is the major geospatial event of the year for French Canada.'}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">🔭 {t('visionTitle')}</h2>
            <p className="text-mid-gray leading-relaxed">
              {locale === 'fr'
                ? 'Nous croyons que le géospatial est bien plus qu\'une technologie : c\'est un langage, une façon de comprendre et de prendre soin du territoire. Notre vision est un monde où les données géospatiales servent à prendre de meilleures décisions pour les communautés, les écosystèmes et les générations futures.'
                : 'We believe geospatial is much more than a technology: it is a language, a way of understanding and caring for the territory. Our vision is a world where geospatial data is used to make better decisions for communities, ecosystems and future generations.'}
            </p>
            <p className="text-mid-gray leading-relaxed mt-4">
              {locale === 'fr'
                ? 'GeoMTL aspire à être le lieu où cette vision prend forme, où les idées deviennent des projets et où les projets deviennent des politiques et des pratiques.'
                : 'GeoMTL aspires to be the place where this vision takes shape, where ideas become projects and where projects become policies and practices.'}
            </p>
          </div>
        </section>

        {/* History */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">📖 {t('historyTitle')}</h2>
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-rose-geo/60 via-orange-geo/40 to-transparent" />
            <div className="space-y-6 pl-12">
              {[
                { year: '2024', fr: 'Première édition de GeoMTL — 300 participants, 20 conférenciers, Montréal', en: 'First GeoMTL edition — 300 attendees, 20 speakers, Montreal' },
                { year: '2025', fr: 'GeoMTL devient conférence bilingue — 500 participants, 35 conférenciers', en: 'GeoMTL becomes bilingual conference — 500 attendees, 35 speakers' },
                { year: '2026', fr: 'Expansion majeure — 750 participants, 50 conférenciers, 30 exposants, création des Prix GeoMTL', en: 'Major expansion — 750 attendees, 50 speakers, 30 exhibitors, GeoMTL Awards created' },
                { year: '2027', fr: 'GeoMTL 2027 — Objectif 1 000 participants, 60+ conférenciers, 50+ exposants', en: 'GeoMTL 2027 — Target: 1,000 attendees, 60+ speakers, 50+ exhibitors' },
              ].map(event => (
                <div key={event.year} className="relative">
                  <div className="absolute -left-12 top-1.5 w-5 h-5 rounded-full bg-rose-geo/30 border-2 border-rose-geo flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-geo" />
                  </div>
                  <div className="glass rounded-xl p-4">
                    <span className="text-rose-geo font-bold text-sm">{event.year}</span>
                    <p className="text-white text-sm mt-1">{locale === 'fr' ? event.fr : event.en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">💎 {t('valuesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(value => (
              <div key={value.title} className="glass rounded-xl p-5">
                <span className="text-2xl mb-3 block">{value.icon}</span>
                <h3 className="font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-mid-gray leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">👥 {t('teamTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map(member => (
              <div key={member.name} className="glass rounded-xl p-4 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                  style={{ background: `${member.color}20`, border: `1px solid ${member.color}40` }}
                >
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white text-sm">{member.name}</p>
                  <p className="text-xs text-mid-gray leading-snug">{member.role}</p>
                  <p className="text-xs mt-0.5" style={{ color: member.color + 'cc' }}>{member.org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
