export const EVENT_CONFIG = {
  name: "GeoMTL 2027",
  dates: { fr: "3–5 octobre 2027", en: "October 3–5, 2027" },
  venue: { fr: "Centre de congrès de Saint-Hyacinthe", en: "Centre de congrès de Saint-Hyacinthe" },
  city: "Saint-Hyacinthe, QC",
  stats: { participants: 350, days: 2, speakers: 60, workshops: 20, exhibitors: 26, awards: 5 },
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
    fr: "1325, rue Daniel-Johnson Ouest, Saint-Hyacinthe, QC J2S 8S4",
    en: "1325 rue Daniel-Johnson Ouest, Saint-Hyacinthe, QC J2S 8S4"
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
