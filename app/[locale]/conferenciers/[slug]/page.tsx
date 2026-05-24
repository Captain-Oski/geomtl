import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSpeakerBySlug, speakers } from '@/data/speakers';
import { agendaItems } from '@/data/agenda';
import { SessionTypeBadge } from '@/components/ui/Badge';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return speakers.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const speaker = getSpeakerBySlug(params.slug);
  if (!speaker) return {};
  return { title: speaker.name };
}

export default function SpeakerDetailPage({
  params
}: {
  params: { slug: string; locale: string };
}) {
  const speaker = getSpeakerBySlug(params.slug);
  if (!speaker) notFound();

  const locale = params.locale;
  const title = locale === 'fr' ? speaker.title.fr : speaker.title.en;
  const bio = locale === 'fr' ? speaker.bio.fr : speaker.bio.en;
  const topics = locale === 'fr' ? speaker.topics.fr : speaker.topics.en;

  const speakerSessions = agendaItems.filter(
    item => item.speakerIds?.includes(speaker.id)
  );

  return (
    <div className="min-h-screen bg-deep-blue pt-20">
      <div className="bg-deep-blue-mid border-b border-white/5 py-12">
        <Container>
          <Link
            href={`/${locale}/conferenciers`}
            className="inline-flex items-center gap-2 text-mid-gray hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {locale === 'fr' ? 'Retour aux conférenciers' : 'Back to speakers'}
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            {/* Large photo placeholder */}
            <div
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl flex items-center justify-center text-4xl font-black text-white flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${speaker.color}50, ${speaker.color}90)`,
                border: `2px solid ${speaker.color}50`
              }}
            >
              {speaker.initials}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{speaker.name}</h1>
              <p className="text-lg text-mid-gray mb-1">{title}</p>
              <p className="text-rose-geo font-semibold mb-4">{speaker.organization}</p>

              {speaker.day && (
                <span className="inline-block px-3 py-1 rounded-full text-sm glass border border-white/10 text-mid-gray mb-4">
                  {locale === 'fr' ? `Intervient le Jour ${speaker.day}` : `Speaks on Day ${speaker.day}`}
                </span>
              )}

              <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                  <Badge key={topic} variant="rose" size="sm">{topic}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">
                {locale === 'fr' ? 'Biographie' : 'Biography'}
              </h2>
              <p className="text-mid-gray leading-relaxed">{bio}</p>
            </div>

            {/* Sessions */}
            {speakerSessions.length > 0 && (
              <div className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  {locale === 'fr' ? 'Sessions' : 'Sessions'}
                </h2>
                <div className="space-y-4">
                  {speakerSessions.map(session => (
                    <div key={session.id} className="border-l-2 border-rose-geo/40 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <SessionTypeBadge type={session.type} locale={locale} />
                        <span className="text-xs text-mid-gray">
                          {locale === 'fr' ? `Jour ${session.day}` : `Day ${session.day}`} · {session.time}
                        </span>
                      </div>
                      <p className="text-white font-semibold text-sm">
                        {locale === 'fr' ? session.title.fr : session.title.en}
                      </p>
                      {session.room && (
                        <p className="text-xs text-mid-gray mt-1">
                          📍 {locale === 'fr' ? session.room.fr : session.room.en}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                {locale === 'fr' ? 'Sujets d\'expertise' : 'Topics'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                  <Badge key={topic} variant="orange" size="sm">{topic}</Badge>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                {locale === 'fr' ? 'Organisation' : 'Organization'}
              </h3>
              <p className="text-mid-gray text-sm">{speaker.organization}</p>
            </div>

            <Link
              href={`/${locale}/programmation`}
              className="block glass rounded-2xl p-6 hover:bg-white/5 transition-colors group"
            >
              <p className="text-sm font-semibold text-white group-hover:text-rose-geo transition-colors mb-1">
                {locale === 'fr' ? 'Voir le programme complet' : 'View the full program'}
              </p>
              <p className="text-xs text-mid-gray">
                {locale === 'fr' ? 'Toutes les sessions de GeoMTL 2027' : 'All GeoMTL 2027 sessions'}
              </p>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
