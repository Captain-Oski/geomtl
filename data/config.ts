export const EVENT_CONFIG = {
  name: "GÉOMTL 2027",
  dates: { fr: "3–5 octobre 2027", en: "October 3–5, 2027" },
  venue: { fr: "Centre de congrès de Saint-Hyacinthe", en: "Centre de congrès de Saint-Hyacinthe" },
  city: "Saint-Hyacinthe, QC",
  stats: { participants: 400, days: 2, speakers: 60, workshops: 20, exhibitors: 26, awards: 1 },
  tagline: {
    fr: "Comprendre le territoire, façonner l'avenir.",
    en: "Understanding the territory, shaping the future."
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
  // Événement Le Point de Vente. L'ancien site utilisait l'identifiant « geomtl2025 » :
  // vérifier dans le compte organisateur que l'événement 2027 porte bien « geomtl2027 ».
  ticketUrl: {
    fr: "https://lepointdevente.com/billets/geomtl2027",
    en: "https://lepointdevente.com/tickets/geomtl2027"
  },
  partnerUrl: "#devenir-partenaire",
  email: "info@geomtl.com",
  // Une adresse par sujet ; info@ reste l'adresse générale.
  courriels: {
    info: "info@geomtl.com",
    inscription: "inscription@geomtl.com",
    partenariat: "partenariat@geomtl.com",
    conferencier: "conferencier@geomtl.com"
  },
  // Adresse « action » du formulaire intégré Mailchimp (Forms > Embedded form,
  // balise <form>). Une fois remplie, les boutons « S'abonner » mènent à la page
  // /infolettre ; tant qu'elle est vide, ils ouvrent un courriel prérempli.
  mailchimpAction: "https://geomtl.us12.list-manage.com/subscribe/post?u=e8567f65db880b7495086d39a&amp;id=a5d830038f&amp;f_id=0002b7e0f0" as string | null,
  address: {
    fr: "1325, rue Daniel-Johnson Ouest, Saint-Hyacinthe, QC J2S 8S4",
    en: "1325 rue Daniel-Johnson Ouest, Saint-Hyacinthe, QC J2S 8S4"
  },
  social: {
    linkedin: "https://www.linkedin.com/company/geomtl"
  }
};

export const LOCALES = ['fr', 'en'] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'fr';
