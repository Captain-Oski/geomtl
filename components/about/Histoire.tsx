import Link from 'next/link';
import { EDITIONS } from '@/data/galerie';
import { BookOpen } from '@phosphor-icons/react/dist/ssr/BookOpen';
import { Trophy } from '@phosphor-icons/react/dist/ssr/Trophy';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { cn } from '@/lib/utils';

// Faits vérifiés : acsg-montreal.ca, acsg-champlain.ca, cartovista.com, k2geospatial.com,
// leseisme.com, afigeo.asso.fr, gogeomatics.ca, liste officielle des lauréats GAÏA.
type Texte = { fr: string; en: string };
interface Jalon {
  annee: number;
  titre: Texte;
  repere?: Texte;
  texte: Texte;
  gaia?: string;
  aVenir?: boolean;
}

const JALONS: Jalon[] = [
  {
    annee: 2019,
    titre: { fr: 'Naissance de GéoMTL', en: 'GéoMTL is born' },
    repere: { fr: 'Novembre · Palais des congrès de Montréal', en: 'November · Palais des congrès de Montréal' },
    texte: {
      fr: 'Le congrès prend le nom GéoMTL et une identité signée Studio Le Séisme, avec les personnages géants de l\'illustrateur Ty Dale. Organisé avec l\'ACSG-Champlain et l\'AGMQ, il réunit plus de 400 participants autour de 80 conférences et 4 plénières.',
      en: 'The conference becomes GéoMTL, with a visual identity by Studio Le Séisme featuring giant characters by illustrator Ty Dale. Organized with ACSG-Champlain and AGMQ, it brings together more than 400 attendees for 80 talks and 4 plenaries.',
    },
    gaia: 'Luc Lévesque, Ville de Montréal',
  },
  {
    annee: 2023,
    titre: { fr: '21e édition', en: '21st edition' },
    repere: { fr: '18 et 19 octobre · Palais des congrès de Montréal', en: 'October 18–19 · Palais des congrès de Montréal' },
    texte: {
      fr: 'Deux jours de conférences, un salon des exposants et un 5 à 7 réseautage, avec Jakarto comme commanditaire principal. Des bourses soutiennent la relève.',
      en: 'Two days of talks, an exhibition hall and a networking reception, with Jakarto as lead sponsor. Scholarships support the next generation.',
    },
    gaia: 'Francis Roy, Université Laval',
  },
  {
    annee: 2025,
    titre: { fr: '22e édition · La géomatique en mouvement', en: '22nd edition · Geomatics in motion' },
    repere: { fr: '8 et 9 octobre · Centre de congrès de Saint-Hyacinthe', en: 'October 8–9 · Centre de congrès de Saint-Hyacinthe' },
    texte: {
      fr: 'Le congrès s\'installe à Saint-Hyacinthe. Au programme : LiDAR, drones, intelligence artificielle, BIM et villes intelligentes.',
      en: 'The conference moves to Saint-Hyacinthe, with LiDAR, drones, artificial intelligence, BIM and smart cities on the program.',
    },
    gaia: 'Ivan Pagé, Géolocation',
  },
  {
    annee: 2027,
    titre: { fr: '23e édition', en: '23rd edition' },
    repere: { fr: '4 et 5 octobre · Centre de congrès de Saint-Hyacinthe', en: 'October 4–5 · Centre de congrès de Saint-Hyacinthe' },
    texte: {
      fr: 'GÉOMTL revient à Saint-Hyacinthe avec une nouvelle identité, signée elle aussi par Studio Le Séisme : « Comprendre le territoire, façonner l\'avenir ».',
      en: 'GÉOMTL returns to Saint-Hyacinthe with a new identity, also by Studio Le Séisme: “Understanding the territory, shaping the future”.',
    },
    aVenir: true,
  },
];

export default function Histoire({ locale, titre }: { locale: string; titre: string }) {
  const fr = locale === 'fr';

  return (
    <section>
      <h2 className="text-2xl font-bold text-geo-ink mb-3 flex items-center gap-2">
        <BookOpen size={26} weight="light" aria-hidden="true" />
        {titre}
      </h2>
      <p className="max-w-3xl text-geo-ink-soft leading-relaxed">
        {fr
          ? 'Depuis 1981, la section Montréal de l\'ACSG organise le grand rendez-vous de la géomatique au Québec. En 2019, il devient GéoMTL.'
          : 'Since 1981, the ACSG Montréal section has organized Quebec\'s major geomatics gathering. In 2019, it became GéoMTL.'}
      </p>

      <ol className="relative mt-8 space-y-6 pl-10">
        <div aria-hidden="true" className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-geo-teal-dark/60 via-geo-lime-dark/50 to-geo-teal-dark/60" />
        {JALONS.map((jalon) => {
          const photos = EDITIONS.find((e) => e.annee === jalon.annee)?.photos.slice(0, 3) ?? [];
          return (
            <li key={jalon.annee} className="relative">
              <div
                aria-hidden="true"
                className={cn(
                  'absolute -left-10 top-6 h-6 w-6 rounded-full border-2 flex items-center justify-center',
                  jalon.aVenir ? 'border-transparent bg-gradient-geo-2027' : 'border-geo-teal-dark bg-geo-cream'
                )}
              >
                <div className={cn('h-2 w-2 rounded-full', jalon.aVenir ? 'bg-geo-noir' : 'bg-geo-teal-dark')} />
              </div>

              <div
                className={cn(
                  'rounded-2xl p-5 sm:p-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center',
                  jalon.aVenir ? 'border-2 border-geo-teal-dark/50 bg-geo-teal/10' : 'glass-2027'
                )}
              >
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-3xl font-bold text-geo-teal-dark">{jalon.annee}</span>
                    <h3 className="text-lg font-bold text-geo-ink">{fr ? jalon.titre.fr : jalon.titre.en}</h3>
                  </div>
                  {jalon.repere && (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-geo-ink-soft">
                      {fr ? jalon.repere.fr : jalon.repere.en}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-geo-ink-soft max-w-2xl">{fr ? jalon.texte.fr : jalon.texte.en}</p>
                  {jalon.gaia && (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-geo-ink">
                      <Trophy size={14} weight="light" aria-hidden="true" />
                      {fr ? 'Prix GAÏA' : 'GAÏA Prize'} : {jalon.gaia}
                    </p>
                  )}
                </div>

                {photos.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      {photos.map((photo) => (
                        <a
                          key={photo.src}
                          href={photo.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block h-20 w-full overflow-hidden rounded-lg sm:h-24 lg:w-36"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.src}
                            alt={fr ? photo.alt.fr : photo.alt.en}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </a>
                      ))}
                    </div>
                    <Link
                      href={`/${locale}/galerie#edition-${jalon.annee}`}
                      className="group inline-flex items-center gap-1 self-end text-xs font-semibold text-geo-teal-dark hover:underline"
                    >
                      {fr ? `Voir la galerie ${jalon.annee}` : `See the ${jalon.annee} gallery`}
                      <ArrowRight size={14} weight="light" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
