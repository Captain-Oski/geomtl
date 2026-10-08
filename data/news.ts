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
      fr: "GÉOMTL 2027 : les inscriptions sont ouvertes!",
      en: "GÉOMTL 2027: Registration is open!"
    },
    excerpt: {
      fr: "C'est officiel : GÉOMTL 2027 ouvre ses portes du 3 au 5 octobre au Centre de congrès de Saint-Hyacinthe. Billets en vente dès maintenant avec tarif anticipé jusqu'au 30 juin.",
      en: "It's official: GÉOMTL 2027 opens its doors October 3–5 at the Centre de congrès de Saint-Hyacinthe. Tickets on sale now with early bird pricing until June 30."
    },
    content: {
      fr: "Après deux années de préparation intense, nous sommes ravis d'annoncer l'ouverture des inscriptions pour GÉOMTL 2027. Cette quatrième édition de la conférence géospatiale de référence du Québec se tiendra du 3 au 5 octobre 2027 au Centre de congrès de Saint-Hyacinthe.\n\nGÉOMTL 2027 rassemblera plus de 400 professionnels, chercheurs, décideurs et passionnés du géospatial dans un événement unique mêlant conférences de haut niveau, ateliers pratiques, exposition et réseautage.\n\nCette année, nous avons voulu pousser encore plus loin notre ambition en proposant un programme qui reflète la diversité et la richesse du secteur géospatial : des données ouvertes aux jumeaux numériques, de l'intelligence artificielle à la participation citoyenne, en passant par l'environnement et les savoirs autochtones.\n\nLes billets à tarif anticipé (395 $ + taxes) sont disponibles jusqu'au 30 juin 2027. Après cette date, le tarif standard s'appliquera (495 $ + taxes). Des tarifs de groupe sont également disponibles pour les organisations souhaitant inscrire 5 participants ou plus.\n\nNe manquez pas cette opportunité de faire partie de la plus grande rassemblement géospatial du Québec. Inscrivez-vous dès maintenant sur notre billetterie en ligne.",
      en: "After two years of intense preparation, we are thrilled to announce the opening of registration for GÉOMTL 2027. This fourth edition of Quebec's reference geospatial conference will take place October 3–5, 2027 at the Centre de congrès de Saint-Hyacinthe.\n\nGÉOMTL 2027 will bring together more than 400 professionals, researchers, decision-makers and geospatial enthusiasts in a unique event combining high-level talks, hands-on workshops, an exhibition and networking.\n\nThis year, we pushed our ambitions even further by offering a program that reflects the diversity and richness of the geospatial sector: from open data to digital twins, from artificial intelligence to civic participation, through environment and Indigenous knowledge.\n\nEarly bird tickets ($395 + taxes) are available until June 30, 2027. After this date, the standard rate applies ($495 + taxes). Group rates are also available for organizations wishing to register 5 or more participants.\n\nDon't miss this opportunity to be part of Quebec's largest geospatial gathering. Register now on our online ticketing platform."
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
      fr: "L'intelligence artificielle est en train de transformer en profondeur le secteur géospatial. À quelques mois de GÉOMTL 2027, nous avons identifié cinq tendances majeures qui façonneront l'agenda de la conférence et le secteur dans son ensemble.\n\n1. Les foundation models géospatiaux\nApprès le succès de GPT et de Stable Diffusion, les premiers grands modèles de fondation spécifiquement entraînés sur des données géospatiales émergent. Ces modèles, entraînés sur des téraoctets d'imagerie satellitaire et de données LiDAR, permettent des tâches comme la segmentation automatique, la classification d'usage des sols et la détection d'objets avec une précision sans précédent.\n\n2. L'analyse géospatiale temps réel\nLa convergence du edge computing, des réseaux 5G et des algorithmes d'IA légers permet désormais d'analyser des flux de données géospatiales en temps réel. Applications : surveillance des catastrophes naturelles, gestion du trafic, suivi des actifs mobiles.\n\n3. L'IA explicable pour le géospatial\nFace aux exigences réglementaires et aux questions éthiques, l'IA explicable (XAI) devient incontournable pour les applications géospatiales dans des domaines sensibles comme la santé, la justice ou la planification urbaine.\n\n4. Les agents autonomes de surveillance environnementale\nDes systèmes multi-agents IA capables de surveiller en continu des zones géographiques, de détecter des anomalies et d'alerter automatiquement les opérateurs commencent à être déployés pour la surveillance forestière et côtière.\n\n5. La démocratisation par les interfaces en langage naturel\nLes interfaces conversationnelles permettent désormais à des non-spécialistes d'interroger des données géospatiales complexes en langage naturel, ouvrant le géospatial à de nouveaux utilisateurs et usages.",
      en: "Artificial intelligence is profoundly transforming the geospatial sector. A few months before GÉOMTL 2027, we identified five major trends that will shape the conference agenda and the sector as a whole.\n\n1. Geospatial Foundation Models\nFollowing the success of GPT and Stable Diffusion, the first large foundation models specifically trained on geospatial data are emerging. These models, trained on terabytes of satellite imagery and LiDAR data, enable tasks such as automatic segmentation, land use classification and object detection with unprecedented accuracy.\n\n2. Real-time Geospatial Analytics\nThe convergence of edge computing, 5G networks and lightweight AI algorithms now allows real-time analysis of geospatial data streams. Applications: natural disaster monitoring, traffic management, tracking of mobile assets.\n\n3. Explainable AI for Geospatial\nFaced with regulatory requirements and ethical questions, explainable AI (XAI) is becoming essential for geospatial applications in sensitive areas like health, justice or urban planning.\n\n4. Autonomous Environmental Monitoring Agents\nMulti-agent AI systems capable of continuously monitoring geographic zones, detecting anomalies and automatically alerting operators are beginning to be deployed for forest and coastal monitoring.\n\n5. Democratization through Natural Language Interfaces\nConversational interfaces now allow non-specialists to query complex geospatial data in natural language, opening geospatial to new users and uses."
    },
    date: "2027-05-10",
    category: "technology",
    author: {
      name: "Mathieu Larivée",
      role: { fr: "Rédacteur en chef", en: "Editor-in-Chief" }
    },
    image: null,
    imageColor: "#01CDA5",
    readTime: 6,
    featured: true
  },
  {
    id: "n005",
    slug: "appel-candidatures-prix-geomtl",
    title: {
      fr: "Appel à candidatures : Prix GÉOMTL 2027",
      en: "Call for nominations: GÉOMTL 2027 Awards"
    },
    excerpt: {
      fr: "Les candidatures pour les cinq prix GÉOMTL 2027 sont ouvertes jusqu'au 1er août. Innovation, impact social, jeune professionnel, données ouvertes et ambassadeur géospatial.",
      en: "Nominations for the five GÉOMTL 2027 awards are open until August 1. Innovation, social impact, young professional, open data and geospatial ambassador."
    },
    content: {
      fr: "GÉOMTL est fier d'annoncer l'ouverture des candidatures pour les cinq Prix GÉOMTL 2027. Ces récompenses visent à honorer l'excellence, l'innovation et l'impact dans le domaine géospatial.\n\nCinq catégories sont ouvertes aux candidatures :\n\nPrix Innovation géospatiale : pour un projet ou produit introduisant une approche véritablement novatrice dans le domaine géospatial.\n\nPrix Impact social : pour un projet ayant eu un impact mesurable et positif sur une communauté ou un enjeu social.\n\nPrix Excellence — Jeune professionnel.le : pour une personne de moins de 35 ans s'étant distinguée dans le géospatial.\n\nPrix Meilleure donnée ouverte : pour une organisation ayant publié un jeu de données géospatiales ouvertes d'exception.\n\nPrix Ambassadeur.rice géospatial.e : pour une personnalité ayant contribué exceptionnellement à la promotion du géospatial.\n\nLes candidatures sont ouvertes à toute organisation ou individu actif dans le domaine géospatial au Canada. Les dossiers peuvent être soumis en français ou en anglais jusqu'au 1er août 2027.\n\nUn jury indépendant composé de sept experts du secteur géospatial évaluera les candidatures. Les lauréats seront annoncés lors de la cérémonie de remise des prix le 5 octobre 2027.\n\nPour soumettre une candidature ou consulter les critères détaillés, visitez la page des Prix sur notre site web.",
      en: "GÉOMTL is proud to announce the opening of nominations for the five GÉOMTL 2027 Awards. These awards aim to honor excellence, innovation and impact in the geospatial field.\n\nFive categories are open for nominations:\n\nGeospatial Innovation Award: for a project or product introducing a truly innovative approach in the geospatial field.\n\nSocial Impact Award: for a project that has had a measurable and positive impact on a community or social issue.\n\nExcellence Award — Young Professional: for a person under 35 who has distinguished themselves in geospatial.\n\nBest Open Data Award: for an organization that has published an exceptional open geospatial dataset.\n\nGeospatial Ambassador Award: for a personality who has made an exceptional contribution to the promotion of geospatial.\n\nNominations are open to any organization or individual active in the geospatial field in Canada. Applications can be submitted in French or English until August 1, 2027.\n\nAn independent jury of seven geospatial sector experts will evaluate the nominations. Winners will be announced at the awards ceremony on October 5, 2027.\n\nTo submit a nomination or consult detailed criteria, visit the Awards page on our website."
    },
    date: "2027-05-20",
    category: "event",
    author: {
      name: "Équipe GÉOMTL",
      role: { fr: "Organisation", en: "Organization" }
    },
    image: null,
    imageColor: "#1BC868",
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
      fr: "Comment la communauté géospatiale peut-elle contribuer activement aux processus de réconciliation avec les peuples autochtones?",
      en: "How can the geospatial community actively contribute to reconciliation processes with Indigenous peoples?"
    },
    content: {
      fr: "La réconciliation avec les peuples autochtones n'est pas seulement une question politique : c'est une responsabilité qui interpelle directement notre communauté géospatiale. Les données géospatiales, les cartes et les systèmes d'information géographique ont joué un rôle historique dans la colonisation des territoires autochtones. Il est temps de retourner ces outils vers la justice.\n\nCela implique de repenser la gouvernance des données géospatiales sur les territoires autochtones, le droit à la souveraineté des données pour les Premières Nations, Métis et Inuits, et la formation d'une nouvelle génération de professionnels géospatiaux autochtones.\n\nGÉOMTL s'engage dans cette direction : à partir de 2027, nous réserverons des bourses de participation pour les étudiants autochtones en géomatique et nous inclurons systématiquement des perspectives autochtones dans notre programmation.",
      en: "Reconciliation with Indigenous peoples is not just a political question: it is a responsibility that directly challenges our geospatial community. Geospatial data, maps and geographic information systems have historically played a role in the colonization of Indigenous territories. It is time to turn these tools toward justice.\n\nThis involves rethinking the governance of geospatial data on Indigenous territories, the right to data sovereignty for First Nations, Métis and Inuit, and training a new generation of Indigenous geospatial professionals.\n\nGÉOMTL is committed to this direction: starting in 2027, we will reserve participation scholarships for Indigenous students in geomatics and systematically include Indigenous perspectives in our programming."
    },
    date: "2027-06-01",
    category: "community",
    author: {
      name: "Isabelle Roy",
      role: { fr: "Professeure, UQAM", en: "Professor, UQAM" }
    },
    image: null,
    imageColor: "#D0DC00",
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
