import { getRequestConfig } from 'next-intl/server';

const messagesByLocale = {
  fr: () => import('./messages/fr.json'),
  en: () => import('./messages/en.json')
} as const;

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = (locale ?? 'fr') as keyof typeof messagesByLocale;
  return {
    locale: resolvedLocale,
    messages: (await messagesByLocale[resolvedLocale]()).default
  };
});
