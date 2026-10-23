import type { MetadataRoute } from 'next';
import { siteEnConstruction } from '@/lib/acces-comite';
import { URL_SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (siteEnConstruction()) {
    // Google et Bing restent autorisés pour lire le noindex et retirer les
    // pages déjà indexées ; tous les autres robots (IA comprises) sont bloqués.
    return {
      rules: [
        { userAgent: ['Googlebot', 'Bingbot'], allow: '/' },
        { userAgent: '*', disallow: '/' },
      ],
    };
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/login', '/auth', '/api'] },
    sitemap: `${URL_SITE}/sitemap.xml`,
  };
}
