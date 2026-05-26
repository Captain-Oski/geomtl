export const EVENT_CONFIG = {
  name: "GeoMTL 2027",
  dates: { fr: "14–15 octobre 2027", en: "October 14–15, 2027" },
  venue: { fr: "Palais des congrès de Montréal", en: "Palais des congrès de Montréal" },
  city: "Montréal, QC",
  stats: { participants: 1000, days: 2, speakers: 60, workshops: 20, exhibitors: 50, awards: 5 },
  tagline: {
    fr: "La géomatique comme système nerveux du territoire.",
    en: "Geomatics as the nervous system of the territory."
  },
  microSlogans: {
    fr: [
      "Voir le territoire autrement.",
      "Connecter les données, les idées et les décisions.",
      "Là où le géospatial devient une expérience collective."
    ],
    en: [
      "See the territory differently.",
      "Connect data, ideas, and decisions.",
      "Where geospatial becomes a collective experience."
    ]
  },
  ticketUrl: "#billetterie",
  partnerUrl: "#devenir-partenaire",
  email: "info@geomtl.ca",
  phone: "+1 (514) 555-0200",
  address: {
    fr: "1001, place Jean-Paul-Riopelle, Montréal, QC H2Z 1H5",
    en: "1001 Place Jean-Paul-Riopelle, Montréal, QC H2Z 1H5"
  },
  social: {
    twitter: "https://twitter.com/geomtl",
    linkedin: "https://linkedin.com/company/geomtl",
    instagram: "https://instagram.com/geomtl",
    youtube: "https://youtube.com/@geomtl"
  }
};

export const LOCALES = ['fr', 'en'] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'fr';
