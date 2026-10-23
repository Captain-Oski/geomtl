import type { MetadataRoute } from 'next';
import { siteEnConstruction } from '@/lib/acces-comite';
import { URL_SITE } from '@/lib/site';

// Pages publiques présentes dans la navigation. Les pages encore masquées
// (programmation, conférenciers, ateliers, exposants, partenaires,
// actualités, prix) s'ajouteront ici quand elles seront lancées.
const PAGES = ['', '/billetterie', '/devenir-partenaire', '/infos', '/apropos', '/confidentialite', '/conditions'];
const LANGUES = ['fr', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (siteEnConstruction()) return [];

  return PAGES.flatMap((page) => {
    const versions = { fr: `${URL_SITE}/fr${page}`, en: `${URL_SITE}/en${page}` };
    return LANGUES.map((langue) => ({
      url: versions[langue],
      alternates: { languages: versions },
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.7,
    }));
  });
}
