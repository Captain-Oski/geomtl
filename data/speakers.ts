export interface Speaker {
  id: string;
  slug: string;
  name: string;
  title: { fr: string; en: string };
  organization: string;
  bio: { fr: string; en: string };
  topics: { fr: string[]; en: string[] };
  featured: boolean;
  day: 1 | 2 | null;
  image: null;
  initials: string;
  color: string;
  sessionIds?: string[];
}

export const speakers: Speaker[] = [
  {
    id: "s001",
    slug: "sophie-tremblay",
    name: "Sophie Tremblay",
    title: {
      fr: "Directrice, données géospatiales",
      en: "Director, Geospatial Data"
    },
    organization: "Ville de Montréal",
    bio: {
      fr: "Sophie Tremblay dirige depuis 2019 la stratégie de données géospatiales de la Ville de Montréal. Pionnière de l'ouverture des données urbaines, elle a supervisé le déploiement de la plateforme données.montreal.ca et l'intégration du géospatial dans les processus décisionnels de la métropole. Elle est titulaire d'un doctorat en géographie de l'Université de Montréal et d'une maîtrise en gestion de l'information géographique de McGill.",
      en: "Sophie Tremblay has led the City of Montreal's geospatial data strategy since 2019. A pioneer of urban open data, she oversaw the deployment of the donnees.montreal.ca platform and the integration of geospatial into the metropolis's decision-making processes. She holds a PhD in Geography from the Université de Montréal and a Master's in Geographic Information Management from McGill."
    },
    topics: {
      fr: ["Données ouvertes", "Gouvernance urbaine", "Ville intelligente", "Infrastructure de données"],
      en: ["Open data", "Urban governance", "Smart city", "Data infrastructure"]
    },
    featured: true,
    day: 1,
    image: null,
    initials: "ST",
    color: "#e91e8c"
  },
  {
    id: "s002",
    slug: "marc-beauchamp",
    name: "Marc Beauchamp",
    title: {
      fr: "Chef scientifique, géomatique",
      en: "Chief Scientist, Geomatics"
    },
    organization: "Ministère de l'Environnement, de la Lutte contre les changements climatiques, de la Faune et des Parcs (MELCCFP)",
    bio: {
      fr: "Marc Beauchamp est chef scientifique au MELCCFP, où il supervise l'utilisation des technologies géospatiales pour le suivi des écosystèmes québécois. Ses travaux portent sur la détection de changements par télédétection, la modélisation des habitats fauniques et la cartographie des milieux humides. Auteur de plus de 40 publications scientifiques, il est reconnu comme l'un des experts les plus influents en géospatial environnemental au Canada.",
      en: "Marc Beauchamp is Chief Scientist at MELCCFP, where he oversees the use of geospatial technologies for monitoring Quebec's ecosystems. His work focuses on change detection via remote sensing, wildlife habitat modeling and wetland mapping. Author of more than 40 scientific publications, he is recognized as one of Canada's most influential experts in environmental geospatial."
    },
    topics: {
      fr: ["Télédétection", "Environnement", "Changements climatiques", "Biodiversité"],
      en: ["Remote sensing", "Environment", "Climate change", "Biodiversity"]
    },
    featured: true,
    day: 1,
    image: null,
    initials: "MB",
    color: "#ff6b35"
  },
  {
    id: "s003",
    slug: "amina-diallo",
    name: "Amina Diallo",
    title: {
      fr: "Fondatrice et PDG",
      en: "Founder & CEO"
    },
    organization: "GéoSud Analytics",
    bio: {
      fr: "Amina Diallo est la fondatrice de GéoSud Analytics, une entreprise montréalaise spécialisée dans l'analyse géospatiale par intelligence artificielle pour les marchés émergents d'Afrique subsaharienne et d'Amérique latine. Avant de fonder GéoSud, elle a travaillé pour l'ONU-Habitat et le Programme alimentaire mondial, où elle a développé des outils de cartographie humanitaire. Elle est lauréate du Prix Innovation 2025 de l'Association canadienne des sciences géomatiques.",
      en: "Amina Diallo is the founder of GéoSud Analytics, a Montreal company specializing in AI-powered geospatial analysis for emerging markets in Sub-Saharan Africa and Latin America. Before founding GéoSud, she worked for UN-Habitat and the World Food Programme, developing humanitarian mapping tools. She is the 2025 Innovation Award winner from the Canadian Association of Geomatics Sciences."
    },
    topics: {
      fr: ["IA géospatiale", "Développement international", "Cartographie humanitaire", "Startups"],
      en: ["Geospatial AI", "International development", "Humanitarian mapping", "Startups"]
    },
    featured: true,
    day: 2,
    image: null,
    initials: "AD",
    color: "#ffd60a"
  },
  {
    id: "s004",
    slug: "david-chen",
    name: "David Chen",
    title: {
      fr: "VP Produit",
      en: "VP Product"
    },
    organization: "Esri Canada",
    bio: {
      fr: "David Chen est vice-président Produit chez Esri Canada, où il dirige la feuille de route de la plateforme ArcGIS pour le marché canadien. Ingénieur logiciel de formation, il a rejoint Esri Canada en 2015 après des passages chez IBM et Oracle. Il est un conférencier régulier aux conférences ESRI User Conference et représente le Canada au comité technique international d'Esri. Spécialiste de l'intégration des données massives et des architectures cloud géospatiales.",
      en: "David Chen is VP Product at Esri Canada, where he leads the ArcGIS platform roadmap for the Canadian market. A software engineer by training, he joined Esri Canada in 2015 after stints at IBM and Oracle. He is a regular speaker at ESRI User Conferences and represents Canada on Esri's international technical committee. Specialist in big data integration and geospatial cloud architectures."
    },
    topics: {
      fr: ["ArcGIS", "Cloud géospatial", "Intégration de données", "Plateformes SIG"],
      en: ["ArcGIS", "Geospatial cloud", "Data integration", "GIS platforms"]
    },
    featured: true,
    day: 1,
    image: null,
    initials: "DC",
    color: "#e91e8c"
  },
  {
    id: "s005",
    slug: "isabelle-roy",
    name: "Isabelle Roy",
    title: {
      fr: "Professeure titulaire, département de géographie",
      en: "Full Professor, Department of Geography"
    },
    organization: "Université du Québec à Montréal (UQAM)",
    bio: {
      fr: "Isabelle Roy est professeure titulaire au département de géographie de l'UQAM et directrice du laboratoire de cartographie participative. Ses recherches portent sur la démocratie spatiale, la participation citoyenne dans la planification urbaine et l'utilisation des technologies géospatiales par les communautés marginalisées. Elle dirige actuellement un projet CRSH sur la cartographie collaborative dans les quartiers en transformation de Montréal.",
      en: "Isabelle Roy is a Full Professor in the Department of Geography at UQAM and director of the participatory cartography laboratory. Her research focuses on spatial democracy, citizen participation in urban planning and the use of geospatial technologies by marginalized communities. She currently leads a SSHRC project on collaborative mapping in Montreal's transforming neighborhoods."
    },
    topics: {
      fr: ["Cartographie participative", "Participation citoyenne", "Démocratie spatiale", "Recherche"],
      en: ["Participatory mapping", "Civic participation", "Spatial democracy", "Research"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "IR",
    color: "#ff6b35"
  },
  {
    id: "s006",
    slug: "jean-francois-leblanc",
    name: "Jean-François Leblanc",
    title: {
      fr: "Directeur général",
      en: "Executive Director"
    },
    organization: "Centre d'expertise et de recherche en géomatique (CERGQ)",
    bio: {
      fr: "Jean-François Leblanc dirige le CERGQ, principal centre québécois de recherche appliquée en géomatique, depuis 2018. Il a consacré sa carrière à tisser des ponts entre les milieux universitaires, gouvernementaux et industriels. Sous sa direction, le CERGQ a développé des partenariats avec plus de 30 organisations et obtenu plus de 15 M$ en financement de recherche. Il est l'initiateur du réseau québécois de référence spatiale.",
      en: "Jean-François Leblanc has led CERGQ, Quebec's main applied geomatics research center, since 2018. He has devoted his career to bridging academic, government and industrial sectors. Under his leadership, CERGQ has developed partnerships with more than 30 organizations and secured over $15M in research funding. He is the initiator of the Quebec spatial reference network."
    },
    topics: {
      fr: ["Recherche appliquée", "Partenariats", "Référence spatiale", "Politique géospatiale"],
      en: ["Applied research", "Partnerships", "Spatial reference", "Geospatial policy"]
    },
    featured: false,
    day: 1,
    image: null,
    initials: "JL",
    color: "#ffd60a"
  },
  {
    id: "s007",
    slug: "marie-laure-fontaine",
    name: "Marie-Laure Fontaine",
    title: {
      fr: "Cheffe de projet, télédétection",
      en: "Project Lead, Remote Sensing"
    },
    organization: "Agence spatiale canadienne",
    bio: {
      fr: "Marie-Laure Fontaine est cheffe de projet à l'Agence spatiale canadienne, responsable de l'exploitation des données du satellite RADARSAT pour les applications civiles et environnementales. Elle est l'une des architectes du programme national de surveillance des forêts par satellite et a représenté le Canada dans plusieurs missions de l'ESA. Docteure en sciences de la Terre de l'Université Laval.",
      en: "Marie-Laure Fontaine is a project lead at the Canadian Space Agency, responsible for exploiting RADARSAT satellite data for civilian and environmental applications. She is one of the architects of the national forest monitoring-by-satellite program and has represented Canada in several ESA missions. She holds a PhD in Earth Sciences from Université Laval."
    },
    topics: {
      fr: ["RADARSAT", "Surveillance forestière", "Observation de la Terre", "Satellites"],
      en: ["RADARSAT", "Forest monitoring", "Earth observation", "Satellites"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "MF",
    color: "#e91e8c"
  },
  {
    id: "s008",
    slug: "thomas-nguyen",
    name: "Thomas Nguyen",
    title: {
      fr: "Directeur technique",
      en: "Chief Technology Officer"
    },
    organization: "MapBox Canada",
    bio: {
      fr: "Thomas Nguyen est directeur technique de MapBox Canada, pionnier des cartes web modernes et des visualisations géospatiales interactives. Il a cofondé deux startups géospatiales avant de rejoindre MapBox, et ses contributions open source aux projets Leaflet et Maplibre ont été adoptées par des millions de développeurs. Passionné de design cartographique et de performance web.",
      en: "Thomas Nguyen is CTO of MapBox Canada, a pioneer in modern web maps and interactive geospatial visualizations. He co-founded two geospatial startups before joining MapBox, and his open source contributions to Leaflet and Maplibre projects have been adopted by millions of developers. Passionate about cartographic design and web performance."
    },
    topics: {
      fr: ["Cartographie web", "Open source", "Visualisation", "WebGL"],
      en: ["Web mapping", "Open source", "Visualization", "WebGL"]
    },
    featured: false,
    day: 1,
    image: null,
    initials: "TN",
    color: "#ff6b35"
  },
  {
    id: "s009",
    slug: "claire-bergeron",
    name: "Claire Bergeron",
    title: {
      fr: "Coordonnatrice, systèmes d'information géographique",
      en: "GIS Coordinator"
    },
    organization: "Société de transport de Montréal (STM)",
    bio: {
      fr: "Claire Bergeron est à la tête du département SIG de la STM depuis 2020, où elle supervise l'intégration des technologies géospatiales dans la planification des réseaux de transport, la maintenance préventive des infrastructures et l'analyse de la mobilité. Elle a piloté la migration vers une architecture SIG cloud et le déploiement d'outils d'analyse temps réel pour le réseau de bus.",
      en: "Claire Bergeron has headed the STM's GIS department since 2020, where she oversees the integration of geospatial technologies in transportation network planning, preventive maintenance and mobility analysis. She led the migration to a cloud GIS architecture and deployment of real-time analytics tools for the bus network."
    },
    topics: {
      fr: ["Transport", "Mobilité urbaine", "SIG temps réel", "Infrastructures"],
      en: ["Transportation", "Urban mobility", "Real-time GIS", "Infrastructure"]
    },
    featured: false,
    day: 1,
    image: null,
    initials: "CB",
    color: "#ffd60a"
  },
  {
    id: "s010",
    slug: "alain-parent",
    name: "Alain Parent",
    title: {
      fr: "Spécialiste LiDAR et photogrammétrie",
      en: "LiDAR and Photogrammetry Specialist"
    },
    organization: "Tetra Tech Canada",
    bio: {
      fr: "Alain Parent est un expert reconnu en acquisition et traitement de données LiDAR et photogrammétriques. Chez Tetra Tech Canada, il dirige des projets d'envergure nationale incluant les levés bathymétriques du Saint-Laurent, la cartographie des zones inondables et les modèles numériques de terrain haute résolution. Il est formateur certifié ASPRS et auteur de plusieurs standards nationaux.",
      en: "Alain Parent is a recognized expert in LiDAR and photogrammetric data acquisition and processing. At Tetra Tech Canada, he leads national-scale projects including Saint Lawrence bathymetric surveys, flood zone mapping and high-resolution digital terrain models. He is an ASPRS-certified trainer and author of several national standards."
    },
    topics: {
      fr: ["LiDAR", "Photogrammétrie", "Modèles numériques de terrain", "Bathymétrie"],
      en: ["LiDAR", "Photogrammetry", "Digital terrain models", "Bathymetry"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "AP",
    color: "#e91e8c"
  },
  {
    id: "s011",
    slug: "nadia-khalil",
    name: "Nadia Khalil",
    title: {
      fr: "Chercheuse principale, géospatial et santé",
      en: "Principal Researcher, Geospatial and Health"
    },
    organization: "Institut national de santé publique du Québec (INSPQ)",
    bio: {
      fr: "Nadia Khalil est chercheuse principale à l'INSPQ, spécialisée dans l'application des méthodes géospatiales à la surveillance épidémiologique et à l'analyse des déterminants sociaux de la santé. Ses travaux sur la cartographie des déserts alimentaires et des inégalités de santé en milieu urbain ont influencé plusieurs politiques publiques québécoises. Professeure associée à l'École de santé publique de l'Université de Montréal.",
      en: "Nadia Khalil is a Principal Researcher at INSPQ, specializing in the application of geospatial methods to epidemiological surveillance and analysis of social determinants of health. Her work on mapping food deserts and health inequalities in urban areas has influenced several Quebec public policies. Associate Professor at the École de santé publique de l'Université de Montréal."
    },
    topics: {
      fr: ["Géospatial et santé", "Épidémiologie spatiale", "Inégalités", "Politiques publiques"],
      en: ["Geospatial and health", "Spatial epidemiology", "Inequalities", "Public policy"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "NK",
    color: "#ff6b35"
  },
  {
    id: "s012",
    slug: "pierre-ouellet",
    name: "Pierre Ouellet",
    title: {
      fr: "Directeur, géomatique municipale",
      en: "Director, Municipal Geomatics"
    },
    organization: "Ville de Québec",
    bio: {
      fr: "Pierre Ouellet dirige depuis 15 ans les services de géomatique de la Ville de Québec, l'une des plus avancées au Canada en matière de jumeaux numériques urbains. Il est l'architecte du projet de jumeau numérique du Vieux-Québec, reconnu internationalement pour son intégration du patrimoine historique et des données 3D temps réel. Président sortant de l'Association québécoise des professionnels en géomatique.",
      en: "Pierre Ouellet has led the City of Quebec's geomatics services for 15 years, one of Canada's most advanced for urban digital twins. He is the architect of the Old Quebec digital twin project, internationally recognized for its integration of historical heritage and real-time 3D data. Outgoing President of the Quebec Association of Geomatics Professionals."
    },
    topics: {
      fr: ["Jumeaux numériques", "Patrimoine", "3D urbain", "Géomatique municipale"],
      en: ["Digital twins", "Heritage", "Urban 3D", "Municipal geomatics"]
    },
    featured: false,
    day: 1,
    image: null,
    initials: "PO",
    color: "#ffd60a"
  },
  {
    id: "s013",
    slug: "sarah-mackenzie",
    name: "Sarah MacKenzie",
    title: {
      fr: "Directrice nationale, données spatiales",
      en: "National Director, Spatial Data"
    },
    organization: "Ressources naturelles Canada",
    bio: {
      fr: "Sarah MacKenzie dirige le programme national d'infrastructure de données géospatiales à Ressources naturelles Canada. Elle pilote la stratégie géospatiale fédérale et coordonne les initiatives de partage de données entre les provinces et territoires. Ancienne présidente du Comité de gestion de l'information géographique (CGIG) du gouvernement fédéral.",
      en: "Sarah MacKenzie leads the national geospatial data infrastructure program at Natural Resources Canada. She drives the federal geospatial strategy and coordinates data sharing initiatives between provinces and territories. Former chair of the Geographic Information Management Committee (GIMC) of the federal government."
    },
    topics: {
      fr: ["Infrastructure nationale", "Politique fédérale", "Données ouvertes", "Normes géospatiales"],
      en: ["National infrastructure", "Federal policy", "Open data", "Geospatial standards"]
    },
    featured: false,
    day: 1,
    image: null,
    initials: "SM",
    color: "#e91e8c"
  },
  {
    id: "s014",
    slug: "felix-gagnon",
    name: "Félix Gagnon",
    title: {
      fr: "Fondateur",
      en: "Founder"
    },
    organization: "Drones Boréal",
    bio: {
      fr: "Félix Gagnon a fondé Drones Boréal en 2019, une entreprise spécialisée dans les levés par drones en environnements nordiques extrêmes. Avec une flotte de 40 appareils opérant en température arctique, Drones Boréal a réalisé plus de 2 000 missions dans 12 pays. Félix est un défenseur de la réglementation intelligente des drones et siège au conseil consultatif de Transports Canada pour l'aviation non habitée.",
      en: "Félix Gagnon founded Drones Boréal in 2019, a company specializing in drone surveys in extreme northern environments. With a fleet of 40 aircraft operating in arctic temperatures, Drones Boréal has completed more than 2,000 missions in 12 countries. Félix advocates for smart drone regulation and sits on Transport Canada's advisory board for unmanned aviation."
    },
    topics: {
      fr: ["Drones", "Environnements nordiques", "Levés aériens", "Réglementation"],
      en: ["Drones", "Northern environments", "Aerial surveys", "Regulation"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "FG",
    color: "#ff6b35"
  },
  {
    id: "s015",
    slug: "yasmine-benali",
    name: "Yasmine Benali",
    title: {
      fr: "Lead Data Scientist",
      en: "Lead Data Scientist"
    },
    organization: "Hydro-Québec",
    bio: {
      fr: "Yasmine Benali est lead data scientist à Hydro-Québec, où elle développe des modèles prédictifs géospatiaux pour l'optimisation du réseau électrique et la prévision des pannes. Ses algorithmes de détection d'anomalies intègrent des données satellitaires, météorologiques et topographiques pour anticiper les risques sur les 34 000 km de lignes d'Hydro-Québec. Elle est lauréate du Prix Femmes en STIM du CNRC 2024.",
      en: "Yasmine Benali is Lead Data Scientist at Hydro-Québec, where she develops geospatial predictive models for power grid optimization and outage forecasting. Her anomaly detection algorithms integrate satellite, meteorological and topographic data to anticipate risks across Hydro-Québec's 34,000 km of lines. She is the 2024 NRC Women in STEM Award winner."
    },
    topics: {
      fr: ["Machine learning", "Énergie", "Prédiction", "Réseaux intelligents"],
      en: ["Machine learning", "Energy", "Prediction", "Smart grids"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "YB",
    color: "#ffd60a"
  },
  {
    id: "s016",
    slug: "robert-cloutier",
    name: "Robert Cloutier",
    title: {
      fr: "Responsable SIG",
      en: "GIS Manager"
    },
    organization: "Cree Nation Government",
    bio: {
      fr: "Robert Cloutier travaille avec le gouvernement de la Nation crie depuis 2016 pour développer des outils géospatiaux culturellement adaptés servant à la gestion du territoire ancestral. Ses projets combinent savoirs autochtones traditionnels et technologies géospatiales modernes pour documenter les sites culturels, planifier la gestion des ressources et soutenir les négociations territoriales.",
      en: "Robert Cloutier has worked with the Cree Nation Government since 2016 to develop culturally adapted geospatial tools for managing ancestral territory. His projects combine traditional Indigenous knowledge and modern geospatial technologies to document cultural sites, plan resource management and support territorial negotiations."
    },
    topics: {
      fr: ["Savoirs autochtones", "Territoire ancestral", "Réconciliation", "Gouvernance des données"],
      en: ["Indigenous knowledge", "Ancestral territory", "Reconciliation", "Data governance"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "RC",
    color: "#e91e8c"
  },
  {
    id: "s017",
    slug: "emilie-poirier",
    name: "Émilie Poirier",
    title: {
      fr: "Architecte de solutions géospatiales",
      en: "Geospatial Solutions Architect"
    },
    organization: "Microsoft Canada",
    bio: {
      fr: "Émilie Poirier est architecte de solutions géospatiales chez Microsoft Canada, spécialisée dans l'intégration d'Azure Maps, de Planetary Computer et des services cognitifs pour les applications territoriales. Elle travaille avec les gouvernements et grandes entreprises pour construire des plateformes de données géospatiales cloud-native à grande échelle. Conférencière au Microsoft Build et à l'IGNITE.",
      en: "Émilie Poirier is a Geospatial Solutions Architect at Microsoft Canada, specializing in integrating Azure Maps, Planetary Computer and cognitive services for territorial applications. She works with governments and large enterprises to build large-scale cloud-native geospatial data platforms. Speaker at Microsoft Build and IGNITE."
    },
    topics: {
      fr: ["Azure", "Cloud géospatial", "Planetary Computer", "Architecture"],
      en: ["Azure", "Geospatial cloud", "Planetary Computer", "Architecture"]
    },
    featured: false,
    day: 1,
    image: null,
    initials: "EP",
    color: "#ff6b35"
  },
  {
    id: "s018",
    slug: "alexandre-moreau",
    name: "Alexandre Moreau",
    title: {
      fr: "Responsable national, cartographie",
      en: "National Manager, Cartography"
    },
    organization: "Statistique Canada",
    bio: {
      fr: "Alexandre Moreau dirige la division de cartographie et d'analyse géographique de Statistique Canada. Il supervise la production de l'Atlas du Canada et le développement des produits géospatiaux du recensement. Sous sa direction, Statistique Canada a adopté une approche entièrement ouverte pour la diffusion de ses données géographiques, devenant une référence mondiale en matière de données statistiques géospatiales.",
      en: "Alexandre Moreau leads Statistics Canada's Cartography and Geographic Analysis Division. He oversees production of the Atlas of Canada and development of census geospatial products. Under his leadership, Statistics Canada adopted a fully open approach to distributing its geographic data, becoming a world reference for geospatial statistical data."
    },
    topics: {
      fr: ["Cartographie statistique", "Recensement", "Atlas du Canada", "Données ouvertes"],
      en: ["Statistical cartography", "Census", "Atlas of Canada", "Open data"]
    },
    featured: false,
    day: 1,
    image: null,
    initials: "AM",
    color: "#ffd60a"
  },
  {
    id: "s019",
    slug: "lin-zhang",
    name: "Lin Zhang",
    title: {
      fr: "Professeure associée, intelligence artificielle géospatiale",
      en: "Associate Professor, Geospatial Artificial Intelligence"
    },
    organization: "McGill University",
    bio: {
      fr: "Lin Zhang est professeure associée à l'École d'urbanisme de McGill, où elle dirige le Laboratoire d'intelligence géospatiale. Ses recherches portent sur l'application du deep learning à l'analyse des images satellitaires, la détection automatique du changement d'utilisation des terres et la prédiction de l'expansion urbaine. Ses publications dans Nature Cities et Science of the Total Environment ont été citées plus de 2 000 fois.",
      en: "Lin Zhang is Associate Professor at McGill's School of Urban Planning, where she leads the Geospatial Intelligence Lab. Her research focuses on applying deep learning to satellite image analysis, automatic land use change detection and urban expansion prediction. Her publications in Nature Cities and Science of the Total Environment have been cited over 2,000 times."
    },
    topics: {
      fr: ["Deep learning", "Analyse d'images", "Urbanisme", "Détection de changements"],
      en: ["Deep learning", "Image analysis", "Urban planning", "Change detection"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "LZ",
    color: "#e91e8c"
  },
  {
    id: "s020",
    slug: "hugo-desrochers",
    name: "Hugo Desrochers",
    title: {
      fr: "Cofondateur et directeur technique",
      en: "Co-founder & CTO"
    },
    organization: "TerraMétrique",
    bio: {
      fr: "Hugo Desrochers a cofondé TerraMétrique, une startup québécoise qui développe des solutions de jumeaux numériques pour les infrastructures municipales. Ancien ingénieur chez Bentley Systems, il a levé 8 M$ pour développer une plateforme permettant aux villes de gérer leurs actifs d'infrastructure à travers des représentations 3D dynamiques connectées aux capteurs IoT. TerraMétrique est actuellement déployée dans 12 villes québécoises.",
      en: "Hugo Desrochers co-founded TerraMétrique, a Quebec startup developing digital twin solutions for municipal infrastructure. A former Bentley Systems engineer, he raised $8M to develop a platform enabling cities to manage their infrastructure assets through dynamic 3D representations connected to IoT sensors. TerraMétrique is currently deployed in 12 Quebec cities."
    },
    topics: {
      fr: ["Jumeaux numériques", "IoT", "Infrastructures", "Startup"],
      en: ["Digital twins", "IoT", "Infrastructure", "Startup"]
    },
    featured: false,
    day: 2,
    image: null,
    initials: "HD",
    color: "#ff6b35"
  }
];

export function getSpeakerBySlug(slug: string): Speaker | undefined {
  return speakers.find(s => s.slug === slug);
}

export function getFeaturedSpeakers(): Speaker[] {
  return speakers.filter(s => s.featured);
}

export function getSpeakersByDay(day: 1 | 2): Speaker[] {
  return speakers.filter(s => s.day === day);
}
