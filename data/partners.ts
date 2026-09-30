export type PartnerLevel = 'or' | 'argent' | 'bronze' | 'exposant';

export interface Partner {
  id: string;
  name: string;
  level: PartnerLevel;
  sector: { fr: string; en: string };
  description: { fr: string; en: string };
  website: string;
  logoColor: string;
}

export const partners: Partner[] = [
  {
    id: "p001",
    name: "Ressources naturelles Canada",
    level: "presentateur",
    sector: { fr: "Gouvernement fédéral", en: "Federal Government" },
    description: {
      fr: "Ministère fédéral responsable de l'exploitation et du développement durable des ressources naturelles du Canada, principal diffuseur de données géospatiales nationales.",
      en: "Federal department responsible for the sustainable development of Canada's natural resources, main provider of national geospatial data."
    },
    website: "https://www.nrcan.gc.ca",
    logoColor: "#e91e8c"
  },
  {
    id: "p002",
    name: "Esri Canada",
    level: "platine",
    sector: { fr: "Technologie géospatiale", en: "Geospatial Technology" },
    description: {
      fr: "Distributeur exclusif de la plateforme ArcGIS au Canada et leader des solutions SIG pour gouvernements, entreprises et organisations.",
      en: "Exclusive distributor of the ArcGIS platform in Canada and leader of GIS solutions for governments, businesses and organizations."
    },
    website: "https://www.esri.ca",
    logoColor: "#ff6b35"
  },
  {
    id: "p003",
    name: "Ville de Montréal",
    level: "platine",
    sector: { fr: "Gouvernement municipal", en: "Municipal Government" },
    description: {
      fr: "Métropole canadienne et hôte de GeoMTL 2027, pionnière de l'ouverture des données urbaines et de l'innovation géospatiale au Canada.",
      en: "Canadian metropolis and host of GeoMTL 2027, pioneer in open urban data and geospatial innovation in Canada."
    },
    website: "https://montreal.ca",
    logoColor: "#ffd60a"
  },
  {
    id: "p004",
    name: "Bentley Systems",
    level: "or",
    sector: { fr: "Logiciels d'infrastructure", en: "Infrastructure Software" },
    description: {
      fr: "Leader mondial des logiciels d'ingénierie pour les infrastructures, incluant les solutions de jumeaux numériques et de gestion d'actifs géospatiaux.",
      en: "Global leader in engineering software for infrastructure, including digital twin and geospatial asset management solutions."
    },
    website: "https://www.bentley.com",
    logoColor: "#e91e8c"
  },
  {
    id: "p005",
    name: "Microsoft Canada",
    level: "or",
    sector: { fr: "Technologie cloud", en: "Cloud Technology" },
    description: {
      fr: "Fournisseur de solutions cloud pour le géospatial, incluant Azure Maps, Planetary Computer et les services cognitifs pour l'analyse de données spatiales.",
      en: "Cloud solutions provider for geospatial, including Azure Maps, Planetary Computer and cognitive services for spatial data analysis."
    },
    website: "https://www.microsoft.com/en-ca",
    logoColor: "#ff6b35"
  },
  {
    id: "p006",
    name: "Trimble",
    level: "or",
    sector: { fr: "Instruments de mesure", en: "Measurement Instruments" },
    description: {
      fr: "Fournisseur mondial de technologies de positionnement, de mesure et de gestion des données géospatiales pour la construction, l'agriculture et la géomatique.",
      en: "Global provider of positioning, measurement and geospatial data management technologies for construction, agriculture and geomatics."
    },
    website: "https://www.trimble.com",
    logoColor: "#ffd60a"
  },
  {
    id: "p007",
    name: "Hexagon Geospatial",
    level: "argent",
    sector: { fr: "Solutions géospatiales", en: "Geospatial Solutions" },
    description: {
      fr: "Solutions intégrées pour la capture, l'analyse et la visualisation des données géospatiales, des capteurs aux plateformes d'entreprise.",
      en: "Integrated solutions for geospatial data capture, analysis and visualization, from sensors to enterprise platforms."
    },
    website: "https://www.hexagon.com",
    logoColor: "#e91e8c"
  },
  {
    id: "p008",
    name: "Gouvernement du Québec — MERN",
    level: "argent",
    sector: { fr: "Gouvernement provincial", en: "Provincial Government" },
    description: {
      fr: "Ministère de l'Énergie et des Ressources naturelles du Québec, responsable de la gestion du territoire et de l'information géographique provinciale.",
      en: "Quebec Ministry of Energy and Natural Resources, responsible for managing the territory and provincial geographic information."
    },
    website: "https://mern.gouv.qc.ca",
    logoColor: "#ff6b35"
  },
  {
    id: "p009",
    name: "Cégep Limoilou — Géomatique",
    level: "communaute",
    sector: { fr: "Formation", en: "Education" },
    description: {
      fr: "Programme de formation en géomatique du Cégep Limoilou, l'un des principaux programmes collégiaux en géospatial au Québec.",
      en: "Geomatics training program at Cégep Limoilou, one of Quebec's leading college programs in geospatial."
    },
    website: "https://www.cegeplimoilou.ca",
    logoColor: "#ffd60a"
  },
  {
    id: "p010",
    name: "Association canadienne des sciences géomatiques",
    level: "communaute",
    sector: { fr: "Association professionnelle", en: "Professional Association" },
    description: {
      fr: "L'association nationale qui représente les professionnels, chercheurs et étudiants en sciences géomatiques à travers le Canada.",
      en: "The national association representing geomatics science professionals, researchers and students across Canada."
    },
    website: "https://www.acsg-csca.ca",
    logoColor: "#e91e8c"
  },
  {
    id: "p011",
    name: "Tetra Tech Canada",
    level: "argent",
    sector: { fr: "Ingénierie et environnement", en: "Engineering and Environment" },
    description: {
      fr: "Firme de consultants en ingénierie et environnement, spécialisée dans les levés géospatiaux, la modélisation hydraulique et la gestion des risques naturels.",
      en: "Engineering and environmental consulting firm specializing in geospatial surveys, hydraulic modeling and natural risk management."
    },
    website: "https://www.tetratech.com",
    logoColor: "#ff6b35"
  },
  {
    id: "p012",
    name: "Géoinfo Québec",
    level: "communaute",
    sector: { fr: "Association provinciale", en: "Provincial Association" },
    description: {
      fr: "Regroupement des professionnels en géomatique du Québec, organisant des événements de formation et de réseautage à travers la province.",
      en: "Association of geomatics professionals in Quebec, organizing training and networking events throughout the province."
    },
    website: "https://geoinfo.qc.ca",
    logoColor: "#ffd60a"
  }
];

export function getPartnersByLevel(level: PartnerLevel): Partner[] {
  return partners.filter(p => p.level === level);
}

export const PARTNER_LEVELS_ORDER: PartnerLevel[] = ['or', 'argent', 'bronze', 'exposant'];

export const partnerLevelBenefits = {
  or: {
    fr: {
      name: "Or",
      price: "20 000 $",
      capacity: "1 disponible",
      benefits: [
        "6 passes d'accès incluses",
        "2 kiosques d'exposition",
        "25 minutes de scène principale",
        "2 accès aux plénières",
        "Meilleur emplacement",
        "Priorité au renouvellement",
        "Visibilité maximale"
      ]
    },
    en: {
      name: "Gold",
      price: "$20,000",
      capacity: "1 available",
      benefits: [
        "6 included passes",
        "2 exhibition booths",
        "25 minutes main stage time",
        "2 plenary access",
        "Prime location",
        "Renewal priority",
        "Maximum visibility"
      ]
    }
  },
  argent: {
    fr: {
      name: "Argent",
      price: "11 995 $",
      capacity: "4 disponibles",
      benefits: [
        "4 passes d'accès incluses",
        "1 kiosque d'exposition",
        "4 x 5 minutes en salles",
        "Accès à 4 salles partenaires",
        "1 vitrine d'exposition",
        "Kiosques centraux",
        "Accès aux activations partenaires"
      ]
    },
    en: {
      name: "Silver",
      price: "$11,995",
      capacity: "4 available",
      benefits: [
        "4 included passes",
        "1 exhibition booth",
        "4 x 5-min sessions",
        "Access to 4 partner rooms",
        "1 showcase display",
        "Central booth location",
        "Partner activity access"
      ]
    }
  },
  bronze: {
    fr: {
      name: "Bronze",
      price: "6 995 $",
      capacity: "4 disponibles",
      benefits: [
        "2 passes d'accès incluses",
        "1 kiosque d'exposition",
        "Accès aux pauses/lounges",
        "1 vitrine d'exposition",
        "Kiosques stratégiques",
        "Visibilité standard",
        "Accès au réseautage"
      ]
    },
    en: {
      name: "Bronze",
      price: "$6,995",
      capacity: "4 available",
      benefits: [
        "2 included passes",
        "1 exhibition booth",
        "Lounge access",
        "1 showcase display",
        "Strategic booth location",
        "Standard visibility",
        "Networking access"
      ]
    }
  },
  exposant: {
    fr: {
      name: "Exposant",
      price: "3 495 $",
      capacity: "16 disponibles",
      benefits: [
        "2 passes d'accès incluses",
        "1 kiosque d'exposition",
        "Vitrine si disponible",
        "Salon d'exposition",
        "Accès aux activations",
        "Visibilité d'exposition"
      ]
    },
    en: {
      name: "Exhibitor",
      price: "$3,495",
      capacity: "16 available",
      benefits: [
        "2 included passes",
        "1 exhibition booth",
        "Showcase if available",
        "Exhibition hall access",
        "Activity access",
        "Exhibition visibility"
      ]
    }
  }
};
