'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { newsArticles } from '@/data/news';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

type NewsCategory = 'all' | 'event' | 'speakers' | 'sponsors' | 'technology' | 'community';

const categoryVariants: Record<string, 'rose' | 'orange' | 'yellow' | 'blue' | 'green' | 'gray'> = {
  event: 'rose',
  speakers: 'orange',
  sponsors: 'yellow',
  technology: 'blue',
  community: 'green'
};

export default function ActualitesPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');

  const categories: NewsCategory[] = ['all', 'event', 'speakers', 'sponsors', 'technology', 'community'];

  const filtered = newsArticles.filter(
    article => activeCategory === 'all' || article.category === activeCategory
  );

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

      <Container className="py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => {
            const labelKey = `categories.${cat}` as any;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                  activeCategory === cat
                    ? 'bg-geo-teal/15 text-geo-teal-dark border border-geo-teal-dark/40'
                    : 'glass-2027 text-geo-ink-soft hover:text-geo-ink border border-geo-ink/10'
                )}
              >
                {t(labelKey)}
              </button>
            );
          })}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, index) => {
            const title = locale === 'fr' ? article.title.fr : article.title.en;
            const excerpt = locale === 'fr' ? article.excerpt.fr : article.excerpt.en;
            const variant = categoryVariants[article.category] || 'gray';

            return (
              <motion.article
                key={article.id}
                className="glass-2027 rounded-2xl overflow-hidden card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                {/* Colored header */}
                <div
                  className="h-40 flex items-end justify-start p-5"
                  style={{ background: `linear-gradient(135deg, ${article.imageColor}30 0%, ${article.imageColor}10 100%)`, borderBottom: `1px solid ${article.imageColor}20` }}
                >
                  <Badge variant={variant} size="sm">
                    {t(`categories.${article.category}` as any)}
                  </Badge>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-geo-ink-soft mb-3">
                    <span>{formatDate(article.date, locale)}</span>
                    <span>·</span>
                    <span>{article.readTime} min</span>
                    <span>·</span>
                    <span>{article.author.name}</span>
                  </div>

                  <h2 className="text-base font-bold text-geo-ink mb-2 leading-snug line-clamp-2">
                    {title}
                  </h2>
                  <p className="text-sm text-geo-ink-soft leading-relaxed line-clamp-3 mb-4">
                    {excerpt}
                  </p>

                  <Link
                    href={`/${locale}/actualites/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-geo-teal-dark text-sm font-semibold hover:gap-3 transition-all"
                  >
                    {t('readMore')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
