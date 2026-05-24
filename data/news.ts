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
    id: "n001",
    slug: "geomtl-2027-ouverture-inscriptions",
    title: {
      fr: "GeoMTL 2027 : les inscriptions sont ouvertes!",
      en: "GeoMTL 2027: Registration is open!"
    },
    excerpt: {
      fr: "C'est officiel : GeoMTL 2027 ouvre ses portes les 14 et 15 octobre au Palais des congrès de Montréal. Billets en vente dès maintenant avec tarif anticipé jusqu'au 30 juin.",
      en: "It's official: GeoMTL 2027 opens its doors on October 14 and 15 at the Palais des congrès de Montréal. Tickets on sale now with early bird pricing until June 30."
    },
    content: {
      fr: "Après deux années de préparation intense, nous sommes ravis d'annoncer l'ouverture des inscriptions pour GeoMTL 2027. Cette quatrième édition de la conférence géospatiale de référence du Québec se tiendra les 14 et 15 octobre 2027 au Palais des congrès de Montréal.\n\nGeoMTL 2027 rassemblera plus de 1 000 professionnels, chercheurs, décideurs et passionnés du géospatial dans un événement unique mêlant conférences de haut niveau, ateliers pratiques, exposition et réseautage.\n\nCette année, nous avons voulu pousser encore plus loin notre ambition en proposant un programme qui reflète la diversité et la richesse du secteur géospatial : des données ouvertes aux jumeaux numériques, de l'intelligence artificielle à la participation citoyenne, en passant par l'environnement et les savoirs autochtones.\n\nLes billets à tarif anticipé (395 $ + taxes) sont disponibles jusqu'au 30 juin 2027. Après cette date, le tarif standard s'appliquera (495 $ + taxes). Des tarifs de groupe sont également disponibles pour les organisations souhaitant inscrire 5 participants ou plus.\n\nNe manquez pas cette opportunité de faire partie de la plus grande rassemblement géospatial du Québec. Inscrivez-vous dès maintenant sur notre billetterie en ligne.",
      en: "After two years of intense preparation, we are thrilled to announce the opening of registration for GeoMTL 2027. This fourth edition of Quebec's reference geospatial conference will take place on October 14 and 15, 2027 at the Palais des congrès de Montréal.\n\nGeoMTL 2027 will bring together more than 1,000 professionals, researchers, decision-makers and geospatial enthusiasts in a unique event combining high-level talks, hands-on workshops, an exhibition and networking.\n\nThis year, we pushed our ambitions even further by offering a program that reflects the diversity and richness of the geospatial sector: from open data to digital twins, from artificial intelligence to civic participation, through environment and Indigenous knowledge.\n\nEarly bird tickets ($395 + taxes) are available until June 30, 2027. After this date, the standard rate applies ($495 + taxes). Group rates are also available for organizations wishing to register 5 or more participants.\n\nDon't miss this opportunity to be part of Quebec's largest geospatial gathering. Register now on our online ticketing platform."
    },
    date: "2027-03-15",
    category: "event",
    author: {
      name: "Équipe GeoMTL",
      role: { fr: "Organisation", en: "Organization" }
    },
    image: null,
    imageColor: "#e91e8c",
    readTime: 3,
    featured: true
  },
  {
    id: "n002",
    slug: "conferenciers-vedettes-2027",
    title: {
      fr: "Découvrez nos conférenciers vedettes pour 2027",
      en: "Discover our featured speakers for 2027"
    },
    excerpt: {
      fr: "Sophie Tremblay, Amina Diallo, Marc Beauchamp et David Chen rejoignent la liste des conférenciers vedettes de GeoMTL 2027. Un plateau d'exception pour une édition record.",
      en: "Sophie Tremblay, Amina Diallo, Marc Beauchamp and David Chen join the lineup of featured speakers at GeoMTL 2027. An exceptional lineup for a record edition."
    },
    content: {
      fr: "Nous sommes fiers de vous présenter les quatre conférenciers vedettes qui ouvriront et ponctueront GeoMTL 2027. Chacun représente une facette différente du géospatial d'aujourd'hui et de demain.\n\nSophie Tremblay, directrice des données géospatiales de la Ville de Montréal, donnera la keynote d'ouverture sur l'infrastructure de données géospatiales comme bien commun numérique. Son expérience de terrain dans la métropole québécoise apportera une perspective unique sur les défis et réussites de l'open data urbain.\n\nAmina Diallo, fondatrice de GéoSud Analytics et lauréate du Prix Innovation 2025, présentera une keynote passionnante sur l'IA géospatiale et ses implications éthiques pour les communautés du monde entier. Son parcours entre Montréal, l'Afrique de l'Ouest et l'Amérique latine lui confère une vision globale rarement vue dans nos conférences.\n\nMarc Beauchamp, chef scientifique au MELCCFP, abordera les enjeux de surveillance environnementale par satellite dans le contexte de la crise climatique. Ses travaux sur la forêt boréale québécoise sont d'une pertinence cruciale pour notre compréhension collective du territoire.\n\nEnfin, David Chen de Esri Canada présentera l'évolution des plateformes SIG vers des architectures cloud-native, avec des exemples concrets de déploiements à l'échelle nationale.\n\nLe programme complet sera dévoilé le 1er juin 2027. D'ici là, nous continuerons à annoncer les conférenciers qui enrichiront ces deux journées exceptionnelles.",
      en: "We are proud to present the four featured speakers who will open and punctuate GeoMTL 2027. Each represents a different facet of geospatial today and tomorrow.\n\nSophie Tremblay, Director of Geospatial Data at the City of Montreal, will give the opening keynote on geospatial data infrastructure as a digital common. Her hands-on experience in Quebec's metropolis will provide a unique perspective on the challenges and successes of urban open data.\n\nAmina Diallo, founder of GéoSud Analytics and 2025 Innovation Award winner, will present a captivating keynote on geospatial AI and its ethical implications for communities around the world. Her journey between Montreal, West Africa and Latin America gives her a global vision rarely seen at our conferences.\n\nMarc Beauchamp, Chief Scientist at MELCCFP, will address environmental monitoring by satellite in the context of the climate crisis. His work on Quebec's boreal forest is crucially relevant to our collective understanding of the territory.\n\nFinally, David Chen from Esri Canada will present the evolution of GIS platforms toward cloud-native architectures, with concrete examples of national-scale deployments.\n\nThe full program will be unveiled on June 1, 2027. Until then, we will continue announcing speakers who will enrich these two exceptional days."
    },
    date: "2027-04-08",
    category: "speakers",
    author: {
      name: "Équipe programmation GeoMTL",
      role: { fr: "Programmation", en: "Programming" }
    },
    image: null,
    imageColor: "#ff6b35",
    readTime: 4,
    featured: true
  },
  {
    id: "n003",
    slug: "partenariat-ressources-naturelles-canada",
    title: {
      fr: "Ressources naturelles Canada s'engage comme partenaire présentateur",
      en: "Natural Resources Canada commits as presenting partner"
    },
    excerpt: {
      fr: "Ressources naturelles Canada confirme son engagement à titre de partenaire présentateur de GeoMTL 2027, soulignant l'importance stratégique de la conférence pour l'écosystème géospatial national.",
      en: "Natural Resources Canada confirms its commitment as presenting partner of GeoMTL 2027, underlining the strategic importance of the conference for the national geospatial ecosystem."
    },
    content: {
      fr: "Ressources naturelles Canada (RNCan) rejoint GeoMTL 2027 à titre de partenaire présentateur, réaffirmant son soutien au développement de la communauté géospatiale canadienne.\n\nCe partenariat stratégique permettra à RNCan de présenter ses initiatives en matière d'infrastructure de données géospatiales, d'imagerie satellitaire RADARSAT et de cadre géospatial national à plus de 1 000 professionnels rassemblés à Montréal.\n\n'RNCan est fière de soutenir GeoMTL 2027,' a déclaré Sarah MacKenzie, directrice nationale des données spatiales. 'Cet événement représente une occasion unique de rassembler la communauté géospatiale canadienne et de discuter collectivement des défis et des opportunités qui nous attendent.'\n\nDans le cadre de ce partenariat, Sarah MacKenzie donnera le discours d'ouverture officiel de GeoMTL 2027 et participera au panel sur l'avenir des infrastructures de données géospatiales au Canada.\n\nRNCan aura également un espace de présentation majeur dans la zone d'exposition, où les visiteurs pourront découvrir les outils et ressources disponibles sur le portail géospatial du gouvernement du Canada.\n\nNous remercions chaleureusement Ressources naturelles Canada pour cet engagement exemplaire envers le développement du géospatial canadien.",
      en: "Natural Resources Canada (NRCan) joins GeoMTL 2027 as a presenting partner, reaffirming its support for the development of the Canadian geospatial community.\n\nThis strategic partnership will allow NRCan to present its initiatives in geospatial data infrastructure, RADARSAT satellite imagery and the national geospatial framework to over 1,000 professionals gathered in Montreal.\n\n'NRCan is proud to support GeoMTL 2027,' said Sarah MacKenzie, National Director of Spatial Data. 'This event represents a unique opportunity to bring together the Canadian geospatial community and collectively discuss the challenges and opportunities ahead.'\n\nAs part of this partnership, Sarah MacKenzie will give the official opening address at GeoMTL 2027 and participate in the panel on the future of geospatial data infrastructure in Canada.\n\nNRCan will also have a major presentation space in the exhibition zone, where visitors will be able to discover the tools and resources available on the Government of Canada's geospatial portal.\n\nWe warmly thank Natural Resources Canada for this exemplary commitment to the development of Canadian geospatial."
    },
    date: "2027-04-22",
    category: "sponsors",
    author: {
      name: "Équipe partenariats GeoMTL",
      role: { fr: "Partenariats", en: "Partnerships" }
    },
    image: null,
    imageColor: "#ffd60a",
    readTime: 3,
    featured: false
  },
  {
    id: "n004",
    slug: "tendances-ia-geospatiale-2027",
    title: {
      fr: "5 tendances de l'IA géospatiale qui transformeront 2027",
      en: "5 geospatial AI trends that will transform 2027"
    },
    excerpt: {
      fr: "Foundation models géospatiaux, analyse temps réel, IA explicable, agents autonomes de surveillance… L'intelligence artificielle redéfinit le géospatial à une vitesse vertigineuse.",
      en: "Geospatial foundation models, real-time analytics, explainable AI, autonomous monitoring agents… Artificial intelligence is redefining geospatial at a dizzying pace."
    },
    content: {
      fr: "L'intelligence artificielle est en train de transformer en profondeur le secteur géospatial. À quelques mois de GeoMTL 2027, nous avons identifié cinq tendances majeures qui façonneront l'agenda de la conférence et le secteur dans son ensemble.\n\n1. Les foundation models géospatiaux\nApprès le succès de GPT et de Stable Diffusion, les premiers grands modèles de fondation spécifiquement entraînés sur des données géospatiales émergent. Ces modèles, entraînés sur des téraoctets d'imagerie satellitaire et de données LiDAR, permettent des tâches comme la segmentation automatique, la classification d'usage des sols et la détection d'objets avec une précision sans précédent.\n\n2. L'analyse géospatiale temps réel\nLa convergence du edge computing, des réseaux 5G et des algorithmes d'IA légers permet désormais d'analyser des flux de données géospatiales en temps réel. Applications : surveillance des catastrophes naturelles, gestion du trafic, suivi des actifs mobiles.\n\n3. L'IA explicable pour le géospatial\nFace aux exigences réglementaires et aux questions éthiques, l'IA explicable (XAI) devient incontournable pour les applications géospatiales dans des domaines sensibles comme la santé, la justice ou la planification urbaine.\n\n4. Les agents autonomes de surveillance environnementale\nDes systèmes multi-agents IA capables de surveiller en continu des zones géographiques, de détecter des anomalies et d'alerter automatiquement les opérateurs commencent à être déployés pour la surveillance forestière et côtière.\n\n5. La démocratisation par les interfaces en langage naturel\nLes interfaces conversationnelles permettent désormais à des non-spécialistes d'interroger des données géospatiales complexes en langage naturel, ouvrant le géospatial à de nouveaux utilisateurs et usages.",
      en: "Artificial intelligence is profoundly transforming the geospatial sector. A few months before GeoMTL 2027, we identified five major trends that will shape the conference agenda and the sector as a whole.\n\n1. Geospatial Foundation Models\nFollowing the success of GPT and Stable Diffusion, the first large foundation models specifically trained on geospatial data are emerging. These models, trained on terabytes of satellite imagery and LiDAR data, enable tasks such as automatic segmentation, land use classification and object detection with unprecedented accuracy.\n\n2. Real-time Geospatial Analytics\nThe convergence of edge computing, 5G networks and lightweight AI algorithms now allows real-time analysis of geospatial data streams. Applications: natural disaster monitoring, traffic management, tracking of mobile assets.\n\n3. Explainable AI for Geospatial\nFaced with regulatory requirements and ethical questions, explainable AI (XAI) is becoming essential for geospatial applications in sensitive areas like health, justice or urban planning.\n\n4. Autonomous Environmental Monitoring Agents\nMulti-agent AI systems capable of continuously monitoring geographic zones, detecting anomalies and automatically alerting operators are beginning to be deployed for forest and coastal monitoring.\n\n5. Democratization through Natural Language Interfaces\nConversational interfaces now allow non-specialists to query complex geospatial data in natural language, opening geospatial to new users and uses."
    },
    date: "2027-05-10",
    category: "technology",
    author: {
      name: "Mathieu Larivée",
      role: { fr: "Rédacteur en chef", en: "Editor-in-Chief" }
    },
    image: null,
    imageColor: "#e91e8c",
    readTime: 6,
    featured: true
  },
  {
    id: "n005",
    slug: "appel-candidatures-prix-geomtl",
    title: {
      fr: "Appel à candidatures : Prix GeoMTL 2027",
      en: "Call for nominations: GeoMTL 2027 Awards"
    },
    excerpt: {
      fr: "Les candidatures pour les cinq prix GeoMTL 2027 sont ouvertes jusqu'au 1er août. Innovation, impact social, jeune professionnel, données ouvertes et ambassadeur géospatial.",
      en: "Nominations for the five GeoMTL 2027 awards are open until August 1. Innovation, social impact, young professional, open data and geospatial ambassador."
    },
    content: {
      fr: "GeoMTL est fier d'annoncer l'ouverture des candidatures pour les cinq Prix GeoMTL 2027. Ces récompenses visent à honorer l'excellence, l'innovation et l'impact dans le domaine géospatial.\n\nCinq catégories sont ouvertes aux candidatures :\n\nPrix Innovation géospatiale : pour un projet ou produit introduisant une approche véritablement novatrice dans le domaine géospatial.\n\nPrix Impact social : pour un projet ayant eu un impact mesurable et positif sur une communauté ou un enjeu social.\n\nPrix Excellence — Jeune professionnel.le : pour une personne de moins de 35 ans s'étant distinguée dans le géospatial.\n\nPrix Meilleure donnée ouverte : pour une organisation ayant publié un jeu de données géospatiales ouvertes d'exception.\n\nPrix Ambassadeur.rice géospatial.e : pour une personnalité ayant contribué exceptionnellement à la promotion du géospatial.\n\nLes candidatures sont ouvertes à toute organisation ou individu actif dans le domaine géospatial au Canada. Les dossiers peuvent être soumis en français ou en anglais jusqu'au 1er août 2027.\n\nUn jury indépendant composé de sept experts du secteur géospatial évaluera les candidatures. Les lauréats seront annoncés lors de la cérémonie de remise des prix le 15 octobre 2027.\n\nPour soumettre une candidature ou consulter les critères détaillés, visitez la page des Prix sur notre site web.",
      en: "GeoMTL is proud to announce the opening of nominations for the five GeoMTL 2027 Awards. These awards aim to honor excellence, innovation and impact in the geospatial field.\n\nFive categories are open for nominations:\n\nGeospatial Innovation Award: for a project or product introducing a truly innovative approach in the geospatial field.\n\nSocial Impact Award: for a project that has had a measurable and positive impact on a community or social issue.\n\nExcellence Award — Young Professional: for a person under 35 who has distinguished themselves in geospatial.\n\nBest Open Data Award: for an organization that has published an exceptional open geospatial dataset.\n\nGeospatial Ambassador Award: for a personality who has made an exceptional contribution to the promotion of geospatial.\n\nNominations are open to any organization or individual active in the geospatial field in Canada. Applications can be submitted in French or English until August 1, 2027.\n\nAn independent jury of seven geospatial sector experts will evaluate the nominations. Winners will be announced at the awards ceremony on October 15, 2027.\n\nTo submit a nomination or consult detailed criteria, visit the Awards page on our website."
    },
    date: "2027-05-20",
    category: "event",
    author: {
      name: "Équipe GeoMTL",
      role: { fr: "Organisation", en: "Organization" }
    },
    image: null,
    imageColor: "#ff6b35",
    readTime: 4,
    featured: false
  },
  {
    id: "n006",
    slug: "communaute-geospatiale-reconciliation",
    title: {
      fr: "Géospatial et réconciliation : une responsabilité collective",
      en: "Geospatial and Reconciliation: A Collective Responsibility"
    },
    excerpt: {
      fr: "Comment la communauté géospatiale peut-elle contribuer activement aux processus de réconciliation avec les peuples autochtones? Une réflexion en amont du panel GeoMTL 2027.",
      en: "How can the geospatial community actively contribute to reconciliation processes with Indigenous peoples? A reflection ahead of the GeoMTL 2027 panel."
    },
    content: {
      fr: "La réconciliation avec les peuples autochtones n'est pas seulement une question politique : c'est une responsabilité qui interpelle directement notre communauté géospatiale. Les données géospatiales, les cartes et les systèmes d'information géographique ont joué un rôle historique dans la colonisation des territoires autochtones. Il est temps de retourner ces outils vers la justice.\n\nGeoMTL 2027 accueille pour la première fois une conférence entièrement dédiée aux relations entre le géospatial et les droits autochtones, présentée par Robert Cloutier du Gouvernement de la Nation crie.\n\nLe travail de Robert et de son équipe est exemplaire : co-développer des outils géospatiaux adaptés culturellement, qui permettent aux Premières Nations de documenter leurs territoires ancestraux selon leurs propres termes, d'appuyer leurs revendications territoriales avec des données robustes et de transmettre leurs savoirs géographiques traditionnels aux jeunes générations.\n\nMais la réconciliation géospatiale va au-delà des projets individuels. Elle implique de repenser la gouvernance des données géospatiales sur les territoires autochtones, le droit à la souveraineté des données pour les Premières Nations, Métis et Inuits, et la formation d'une nouvelle génération de professionnels géospatiaux autochtones.\n\nGeoMTL s'engage dans cette direction : à partir de 2027, nous réserverons des bourses de participation pour les étudiants autochtones en géomatique et nous inclurons systématiquement des perspectives autochtones dans notre programmation.",
      en: "Reconciliation with Indigenous peoples is not just a political question: it is a responsibility that directly challenges our geospatial community. Geospatial data, maps and geographic information systems have historically played a role in the colonization of Indigenous territories. It is time to turn these tools toward justice.\n\nGeoMTL 2027 hosts for the first time a talk entirely dedicated to the relationship between geospatial and Indigenous rights, presented by Robert Cloutier from the Cree Nation Government.\n\nRobert and his team's work is exemplary: co-developing culturally adapted geospatial tools that allow First Nations to document their ancestral territories on their own terms, support their territorial claims with robust data and transmit their traditional geographic knowledge to younger generations.\n\nBut geospatial reconciliation goes beyond individual projects. It involves rethinking the governance of geospatial data on Indigenous territories, the right to data sovereignty for First Nations, Métis and Inuit, and training a new generation of Indigenous geospatial professionals.\n\nGeoMTL is committed to this direction: starting in 2027, we will reserve participation scholarships for Indigenous students in geomatics and systematically include Indigenous perspectives in our programming."
    },
    date: "2027-06-01",
    category: "community",
    author: {
      name: "Isabelle Roy",
      role: { fr: "Professeure, UQAM", en: "Professor, UQAM" }
    },
    image: null,
    imageColor: "#ffd60a",
    readTime: 5,
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
