import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsArticleBySlug, newsArticles } from '@/data/news';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return newsArticles.map(n => ({ slug: n.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const article = getNewsArticleBySlug(params.slug);
  if (!article) return {};
  const title = params.locale === 'fr' ? article.title.fr : article.title.en;
  return { title };
}

const categoryVariants: Record<string, 'rose' | 'orange' | 'yellow' | 'blue' | 'green' | 'gray'> = {
  event: 'rose',
  speakers: 'orange',
  sponsors: 'yellow',
  technology: 'blue',
  community: 'green'
};

const categoryLabels: Record<string, { fr: string; en: string }> = {
  event: { fr: 'Événement', en: 'Event' },
  speakers: { fr: 'Conférenciers', en: 'Speakers' },
  sponsors: { fr: 'Partenaires', en: 'Partners' },
  technology: { fr: 'Technologie', en: 'Technology' },
  community: { fr: 'Communauté', en: 'Community' }
};

export default function NewsArticlePage({
  params
}: {
  params: { slug: string; locale: string };
}) {
  const article = getNewsArticleBySlug(params.slug);
  if (!article) notFound();

  const locale = params.locale;
  const title = locale === 'fr' ? article.title.fr : article.title.en;
  const content = locale === 'fr' ? article.content.fr : article.content.en;
  const paragraphs = content.split('\n\n');
  const variant = categoryVariants[article.category] || 'gray';
  const categoryLabel = locale === 'fr'
    ? categoryLabels[article.category]?.fr
    : categoryLabels[article.category]?.en;

  // Related articles (same category, excluding current)
  const related = newsArticles
    .filter(a => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-deep-blue pt-20">
      {/* Hero banner */}
      <div
        className="border-b border-white/5 py-16"
        style={{
          background: `linear-gradient(135deg, ${article.imageColor}15 0%, #0a1628 60%)`
        }}
      >
        <Container size="md">
          <Link
            href={`/${locale}/actualites`}
            className="inline-flex items-center gap-2 text-mid-gray hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {locale === 'fr' ? 'Retour aux actualités' : 'Back to news'}
          </Link>

          <div className="mb-4">
            <Badge variant={variant} size="md">{categoryLabel}</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-mid-gray">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-rose-geo/20 border border-rose-geo/30 flex items-center justify-center text-xs font-bold text-rose-geo">
                {article.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <span className="text-white">{article.author.name}</span>
              <span>·</span>
              <span>{locale === 'fr' ? article.author.role.fr : article.author.role.en}</span>
            </div>
            <span>·</span>
            <span>{formatDate(article.date, locale)}</span>
            <span>·</span>
            <span>{article.readTime} {locale === 'fr' ? 'min de lecture' : 'min read'}</span>
          </div>
        </Container>
      </div>

      <Container size="md" className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article content */}
          <article className="lg:col-span-2">
            <div className="prose-geomtl space-y-5">
              {paragraphs.map((paragraph, i) => {
                // Check if it's a numbered list item (e.g., "1. Title")
                if (/^\d+\./.test(paragraph)) {
                  const lines = paragraph.split('\n');
                  const heading = lines[0];
                  const body = lines.slice(1).join('\n');
                  return (
                    <div key={i} className="border-l-2 border-rose-geo/40 pl-4 my-4">
                      <h3 className="text-lg font-bold text-white mb-2">{heading}</h3>
                      {body && <p className="text-mid-gray leading-relaxed text-sm">{body}</p>}
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-mid-gray leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {related.length > 0 && (
              <div className="glass rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                  {locale === 'fr' ? 'Articles connexes' : 'Related Articles'}
                </h3>
                <div className="space-y-4">
                  {related.map(rel => {
                    const relTitle = locale === 'fr' ? rel.title.fr : rel.title.en;
                    return (
                      <Link
                        key={rel.slug}
                        href={`/${locale}/actualites/${rel.slug}`}
                        className="block group"
                      >
                        <p className="text-sm font-semibold text-white group-hover:text-rose-geo transition-colors line-clamp-2">
                          {relTitle}
                        </p>
                        <p className="text-xs text-mid-gray mt-1">{formatDate(rel.date, locale)}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                GeoMTL 2027
              </h3>
              <p className="text-xs text-mid-gray mb-4">
                {locale === 'fr'
                  ? '3–5 octobre 2027 · Centre de congrès de Saint-Hyacinthe'
                  : 'October 3–5, 2027 · Centre de congrès de Saint-Hyacinthe'}
              </p>
              <Link
                href={`/${locale}/billetterie`}
                className="block w-full py-2.5 text-center text-sm font-bold text-white rounded-xl bg-gradient-to-r from-rose-geo to-orange-geo hover:opacity-90 transition-all"
              >
                {locale === 'fr' ? 'Participer' : 'Participate'}
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
