export interface NewsArticle {
  id: string;
  slug: string;
  title: { fr: string; en: string };
  excerpt: { fr: string; en: string };
  content: { fr: string; en: string };
  date: string;
  category: 'event' | 'speakers' | 'sponsors' | 'technology' | 'community';
  author: { name: string; role: { fr: string; en: string } };
  image: null;
  imageColor: string;
  readTime: number; // minutes
  featured: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "n007",
    slug: "hackathon-geomtl-2027",
    title: {
      fr: "Un hackathon géospatial à GÉOMTL 2027",
      en: "A geospatial hackathon at GÉOMTL 2027"
    },
    excerpt: {
      fr: "GÉOMTL 2027 accueillera un hackathon géospatial. Le thème, l'horaire et les modalités d'inscription seront dévoilés prochainement.",
      en: "GÉOMTL 2027 will host a geospatial hackathon. The theme, schedule and registration details will be announced soon."
    },
    content: {
      fr: "GÉOMTL 2027 accueillera un hackathon géospatial. Développeurs, analystes, étudiants et passionnés de géomatique pourront former des équipes et relever un défi concret à partir de données géospatiales.\n\nLe thème, l'horaire et les modalités d'inscription seront annoncés prochainement sur ce site.\n\nPour toute question, écrivez-nous à info@geomtl.ca.",
      en: "GÉOMTL 2027 will host a geospatial hackathon. Developers, analysts, students and geomatics enthusiasts will be able to form teams and take on a concrete challenge using geospatial data.\n\nThe theme, schedule and registration details will be announced soon on this website.\n\nFor any questions, write to us at info@geomtl.ca."
    },
    date: "2026-10-08",
    category: "event",
    author: {
      name: "Équipe GÉOMTL",
      role: { fr: "Organisation", en: "Organization" }
    },
    image: null,
    imageColor: "#20FEFD",
    readTime: 1,
    featured: true
  },
  {
    id: "n001",
    slug: "geomtl-2027-ouverture-inscriptions",
    title: {
      fr: "GÉOMTL 2027 : les inscriptions sont ouvertes!",
      en: "GÉOMTL 2027: Registration is open!"
    },
    excerpt: {
      fr: "C'est officiel : GÉOMTL 2027 ouvre ses portes les 4 et 5 octobre au Centre de congrès de Saint-Hyacinthe. Billets en vente dès maintenant avec tarif anticipé jusqu'au 30 juin.",
      en: "It's official: GÉOMTL 2027 opens its doors October 4–5 at the Centre de congrès de Saint-Hyacinthe. Tickets on sale now with early bird pricing until June 30."
    },
    content: {
      fr: "Après deux années de préparation intense, nous sommes ravis d'annoncer l'ouverture des inscriptions pour GÉOMTL 2027. Cette quatrième édition de la conférence géospatiale de référence du Québec se tiendra les 4 et 5 octobre 2027 au Centre de congrès de Saint-Hyacinthe.\n\nGÉOMTL 2027 rassemblera plus de 400 professionnels, chercheurs, décideurs et passionnés du géospatial dans un événement unique mêlant conférences de haut niveau, ateliers pratiques, exposition et réseautage.\n\nCette année, nous avons voulu pousser encore plus loin notre ambition en proposant un programme qui reflète la diversité et la richesse du secteur géospatial : des données ouvertes aux jumeaux numériques, de l'intelligence artificielle à la participation citoyenne, en passant par l'environnement et les savoirs autochtones.\n\nLes billets à tarif anticipé (425 $ + taxes) sont disponibles jusqu'au 30 juin 2027. Après cette date, le tarif standard s'appliquera (495 $ + taxes).\n\nNe manquez pas cette opportunité de faire partie de la plus grande rassemblement géospatial du Québec. Inscrivez-vous dès maintenant sur notre billetterie en ligne.",
      en: "After two years of intense preparation, we are thrilled to announce the opening of registration for GÉOMTL 2027. This fourth edition of Quebec's reference geospatial conference will take place October 4–5, 2027 at the Centre de congrès de Saint-Hyacinthe.\n\nGÉOMTL 2027 will bring together more than 400 professionals, researchers, decision-makers and geospatial enthusiasts in a unique event combining high-level talks, hands-on workshops, an exhibition and networking.\n\nThis year, we pushed our ambitions even further by offering a program that reflects the diversity and richness of the geospatial sector: from open data to digital twins, from artificial intelligence to civic participation, through environment and Indigenous knowledge.\n\nEarly bird tickets ($425 + taxes) are available until June 30, 2027. After this date, the standard rate applies ($495 + taxes).\n\nDon't miss this opportunity to be part of Quebec's largest geospatial gathering. Register now on our online ticketing platform."
    },
    date: "2027-03-15",
    category: "event",
    author: {
      name: "Équipe GÉOMTL",
      role: { fr: "Organisation", en: "Organization" }
    },
    image: null,
    imageColor: "#01CDA5",
    readTime: 3,
    featured: true
  },
  {
    id: "n005",
    slug: "prix-gaia-geomtl-2027",
    title: {
      fr: "Le prix GAÏA sera remis à GÉOMTL 2027",
      en: "The GAÏA Prize will be presented at GÉOMTL 2027"
    },
    excerpt: {
      fr: "Décerné depuis 1993 par l'ACSG, le prix GAÏA reconnaît un apport remarquable à la géomatique au Québec. Le lauréat 2027 sera dévoilé lors du congrès.",
      en: "Awarded by the ACSG since 1993, the GAÏA Prize recognizes a remarkable contribution to geomatics in Quebec. The 2027 laureate will be revealed at the conference."
    },
    content: {
      fr: "Depuis 1993, le prix GAÏA est décerné par les sections Montréal et Champlain de l'Association canadienne des sciences géomatiques (ACSG) à un lauréat du milieu de l'entreprise privée, gouvernemental ou de l'éducation, pour reconnaître son apport remarquable dans le domaine de la géomatique au Québec.\n\nLors de GÉOMTL 2025, à Saint-Hyacinthe, le prix a été remis à Ivan Pagé, de Géolocation. Le lauréat 2027 sera dévoilé lors de GÉOMTL 2027, les 4 et 5 octobre au Centre de congrès de Saint-Hyacinthe.\n\nPour découvrir les lauréats précédents depuis 1993, consultez la page du prix GAÏA sur notre site.",
      en: "Since 1993, the GAÏA Prize has been awarded by the Montréal and Champlain sections of the ACSG (Canadian Institute of Geomatics) to a laureate from private industry, government or education, to recognize a remarkable contribution to geomatics in Quebec.\n\nAt GÉOMTL 2025 in Saint-Hyacinthe, the prize was presented to Ivan Pagé of Géolocation. The 2027 laureate will be revealed at GÉOMTL 2027, on October 4–5 at the Centre de congrès de Saint-Hyacinthe.\n\nTo discover the past laureates since 1993, visit the GAÏA Prize page on our website."
    },
    date: "2027-05-20",
    category: "event",
    author: {
      name: "Équipe GÉOMTL",
      role: { fr: "Organisation", en: "Organization" }
    },
    image: null,
    imageColor: "#1BC868",
    readTime: 2,
    featured: false
  }
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find(n => n.slug === slug);
}

export function getFeaturedNews(): NewsArticle[] {
  return newsArticles.filter(n => n.featured);
}

export function getNewsByCategory(category: string): NewsArticle[] {
  if (category === 'all') return newsArticles;
  return newsArticles.filter(n => n.category === category);
}
