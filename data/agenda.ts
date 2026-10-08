export type SessionType = 'conference' | 'panel' | 'workshop' | 'networking' | 'demo' | 'awards' | 'keynote';

export interface AgendaItem {
  id: string;
  day: 0 | 1 | 2; // 0 = soirée mardi 13 oct., 1 = jour 1 merc. 14, 2 = jour 2 jeudi 15
  time: string;
  endTime: string;
  type: SessionType;
  title: { fr: string; en: string };
  description?: { fr: string; en: string };
  speakerIds?: string[];
  speakerNames?: string[];
  room?: { fr: string; en: string };
  duration: number; // minutes
  track?: string;
}

export const agendaItems: AgendaItem[] = [

  // === SOIRÉE MARDI — 13 octobre ===
  {
    id: "e001",
    day: 0,
    time: "17:00",
    endTime: "18:30",
    type: "networking",
    title: {
      fr: "Accueil & cocktail dinatoire d'ouverture",
      en: "Welcome & Opening Dinner Cocktail"
    },
    description: {
      fr: "Arrivée des participants, enregistrement et premières rencontres autour d'un cocktail dinatoire. L'occasion idéale de renouer avec la communauté géospatiale avant le lancement officiel du congrès.",
      en: "Participant arrival, registration and first connections over a dinner cocktail. The ideal opportunity to reconnect with the geospatial community before the official congress launch."
    },
    room: { fr: "Grand Salon — Niveau 6", en: "Grand Salon — Level 6" },
    duration: 90
  },
  {
    id: "e002",
    day: 0,
    time: "18:30",
    endTime: "20:00",
    type: "networking",
    title: {
      fr: "GéoSpark — Activité brise-glace",
      en: "GeoSpark — Icebreaker Activity"
    },
    description: {
      fr: "Une activité conçue pour créer des connexions inattendues. Deux formats au choix selon l'énergie du groupe : (A) Speed-dating géothématique — chaque participant s'inscrit à l'une des 4 thématiques du congrès (IA, Jumeau numérique, Environnement, AICO) et tourne en rotations de 7 minutes pour échanger avec les autres thématiques; (B) Mur collaboratif — atelier géant de post-its numériques (Miro) pour cartographier les défis, attentes et idées de la communauté, clustérisées en direct et réutilisées tout au long du congrès.",
      en: "An activity designed to spark unexpected connections. Two formats depending on group energy: (A) Geothematic speed-dating — each participant registers for one of the 4 congress themes (AI, Digital Twin, Environment, AICO) and rotates in 7-minute rounds to connect with other themes; (B) Collaborative wall — giant digital post-it workshop (Miro) to map the community's challenges, expectations and ideas, clustered live and reused throughout the congress."
    },
    room: { fr: "Grand Salon — Niveau 6", en: "Grand Salon — Level 6" },
    duration: 90,
    track: "Brise-glace"
  },
  {
    id: "e003",
    day: 0,
    time: "20:00",
    endTime: "22:00",
    type: "networking",
    title: {
      fr: "Réseautage libre & buffet",
      en: "Open Networking & Buffet"
    },
    description: {
      fr: "La soirée se poursuit en mode informel. Échanges libres, musique d'ambiance et buffet. Les résultats du brise-glace sont affichés en temps réel — une première carte collective de la communauté GÉOMTL 2027.",
      en: "The evening continues in informal mode. Free conversation, ambient music and buffet. Icebreaker results are displayed in real time — a first collective map of the GÉOMTL 2027 community."
    },
    room: { fr: "Grand Salon — Niveau 6", en: "Grand Salon — Level 6" },
    duration: 120
  },

  // === DAY 1 — 4 octobre ===
  {
    id: "a001",
    day: 1,
    time: "08:00",
    endTime: "09:00",
    type: "networking",
    title: {
      fr: "Accueil et petit-déjeuner de réseautage",
      en: "Welcome & Networking Breakfast"
    },
    description: {
      fr: "Café, viennoiseries et premières rencontres. Récupérez votre badge et explorez l'espace d'exposition.",
      en: "Coffee, pastries and first connections. Pick up your badge and explore the exhibition space."
    },
    room: { fr: "Hall principal", en: "Main Hall" },
    duration: 60
  },
  {
    id: "a002",
    day: 1,
    time: "09:00",
    endTime: "09:30",
    type: "keynote",
    title: {
      fr: "Ouverture officielle : Le géospatial au cœur des décisions du 21e siècle",
      en: "Opening Keynote: Geospatial at the Heart of 21st Century Decision-Making"
    },
    description: {
      fr: "Discours inaugural par les organisateurs et les partenaires présentateurs. Bienvenue à GÉOMTL 2027.",
      en: "Opening address by organizers and presenting partners. Welcome to GÉOMTL 2027."
    },
    speakerIds: ["s013"],
    speakerNames: ["Sarah MacKenzie"],
    room: { fr: "Grande salle — Niveau 5", en: "Grand Hall — Level 5" },
    duration: 30
  },
  {
    id: "a003",
    day: 1,
    time: "09:30",
    endTime: "10:30",
    type: "keynote",
    title: {
      fr: "Keynote : L'infrastructure de données géospatiales comme bien commun numérique",
      en: "Keynote: Geospatial Data Infrastructure as a Digital Common"
    },
    description: {
      fr: "Comment transformer les données géospatiales en véritable infrastructure partagée, ouverte et durable? Sophie Tremblay présente la vision de Montréal et les leçons apprises pour le Canada.",
      en: "How can geospatial data be transformed into a truly shared, open and sustainable infrastructure? Sophie Tremblay presents Montreal's vision and lessons learned for Canada."
    },
    speakerIds: ["s001"],
    speakerNames: ["Sophie Tremblay"],
    room: { fr: "Grande salle — Niveau 5", en: "Grand Hall — Level 5" },
    duration: 60
  },
  {
    id: "a004",
    day: 1,
    time: "10:30",
    endTime: "11:00",
    type: "networking",
    title: {
      fr: "Pause-café et réseautage",
      en: "Coffee Break & Networking"
    },
    room: { fr: "Hall d'exposition", en: "Exhibition Hall" },
    duration: 30
  },
  {
    id: "a005",
    day: 1,
    time: "11:00",
    endTime: "12:00",
    type: "conference",
    title: {
      fr: "Plateformes géospatiales cloud-native : retours d'expérience à grande échelle",
      en: "Cloud-Native Geospatial Platforms: Lessons from Large-Scale Deployments"
    },
    description: {
      fr: "David Chen présente l'évolution des architectures SIG vers le cloud, avec des cas d'utilisation concrets au Canada.",
      en: "David Chen presents the evolution of GIS architectures toward the cloud, with concrete use cases across Canada."
    },
    speakerIds: ["s004"],
    speakerNames: ["David Chen"],
    room: { fr: "Salle Maisonneuve", en: "Maisonneuve Room" },
    duration: 60,
    track: "Technologie"
  },
  {
    id: "a006",
    day: 1,
    time: "11:00",
    endTime: "12:00",
    type: "conference",
    title: {
      fr: "Géospatial et transport collectif : comment la STM pilote avec les données",
      en: "Geospatial and Public Transit: How STM Navigates with Data"
    },
    description: {
      fr: "Claire Bergeron partage comment la STM utilise les données géospatiales pour optimiser ses réseaux et améliorer l'expérience client.",
      en: "Claire Bergeron shares how the STM uses geospatial data to optimize its networks and improve the customer experience."
    },
    speakerIds: ["s009"],
    speakerNames: ["Claire Bergeron"],
    room: { fr: "Salle Saint-Laurent", en: "Saint-Laurent Room" },
    duration: 60,
    track: "Villes intelligentes"
  },
  {
    id: "a007",
    day: 1,
    time: "12:00",
    endTime: "13:30",
    type: "networking",
    title: {
      fr: "Dîner et réseautage — Exposants",
      en: "Lunch & Networking — Exhibitors"
    },
    description: {
      fr: "Repas servi dans la zone d'exposition. L'occasion idéale de visiter les kiosques des 50+ exposants.",
      en: "Lunch served in the exhibition area. The ideal opportunity to visit the 50+ exhibitor booths."
    },
    room: { fr: "Hall d'exposition", en: "Exhibition Hall" },
    duration: 90
  },
  {
    id: "a008",
    day: 1,
    time: "13:30",
    endTime: "14:30",
    type: "conference",
    title: {
      fr: "Jumeaux numériques urbains : le cas du Vieux-Québec",
      en: "Urban Digital Twins: The Old Quebec Case"
    },
    description: {
      fr: "Pierre Ouellet présente le projet de jumeau numérique du Vieux-Québec, alliant patrimoine UNESCO et données 3D temps réel.",
      en: "Pierre Ouellet presents the Old Quebec digital twin project, combining UNESCO heritage and real-time 3D data."
    },
    speakerIds: ["s012"],
    speakerNames: ["Pierre Ouellet"],
    room: { fr: "Salle Maisonneuve", en: "Maisonneuve Room" },
    duration: 60,
    track: "Villes intelligentes"
  },
  {
    id: "a009",
    day: 1,
    time: "13:30",
    endTime: "14:30",
    type: "conference",
    title: {
      fr: "Cartographie web moderne : performance, design et accessibilité",
      en: "Modern Web Mapping: Performance, Design and Accessibility"
    },
    description: {
      fr: "Thomas Nguyen explore les dernières avancées en cartographie web, des tuiles vectorielles à WebGL, et comment rendre les cartes accessibles à tous.",
      en: "Thomas Nguyen explores the latest advances in web mapping, from vector tiles to WebGL, and how to make maps accessible to all."
    },
    speakerIds: ["s008"],
    speakerNames: ["Thomas Nguyen"],
    room: { fr: "Salle Saint-Laurent", en: "Saint-Laurent Room" },
    duration: 60,
    track: "Technologie"
  },
  {
    id: "a010",
    day: 1,
    time: "14:30",
    endTime: "15:00",
    type: "networking",
    title: {
      fr: "Pause-café",
      en: "Coffee Break"
    },
    room: { fr: "Hall d'exposition", en: "Exhibition Hall" },
    duration: 30
  },
  {
    id: "a011",
    day: 1,
    time: "15:00",
    endTime: "16:15",
    type: "panel",
    title: {
      fr: "Panel : L'avenir des infrastructures de données géospatiales au Canada",
      en: "Panel: The Future of Geospatial Data Infrastructure in Canada"
    },
    description: {
      fr: "Table ronde avec des représentants du fédéral, des provinces et de l'industrie sur les défis et opportunités de l'infrastructure géospatiale nationale.",
      en: "Round table with representatives from federal, provincial and industry sectors on the challenges and opportunities of national geospatial infrastructure."
    },
    speakerIds: ["s013", "s006", "s001"],
    speakerNames: ["Sarah MacKenzie", "Jean-François Leblanc", "Sophie Tremblay"],
    room: { fr: "Grande salle — Niveau 5", en: "Grand Hall — Level 5" },
    duration: 75
  },
  {
    id: "a012",
    day: 1,
    time: "15:00",
    endTime: "16:00",
    type: "demo",
    title: {
      fr: "Démo : Azure Planetary Computer pour l'analyse environnementale",
      en: "Demo: Azure Planetary Computer for Environmental Analysis"
    },
    description: {
      fr: "Démonstration en direct d'analyses géospatiales à grande échelle sur la plateforme Planetary Computer de Microsoft.",
      en: "Live demonstration of large-scale geospatial analyses on Microsoft's Planetary Computer platform."
    },
    speakerIds: ["s017"],
    speakerNames: ["Émilie Poirier"],
    room: { fr: "Salle Démo — A", en: "Demo Room — A" },
    duration: 60,
    track: "Technologie"
  },
  {
    id: "a013",
    day: 1,
    time: "16:15",
    endTime: "17:15",
    type: "conference",
    title: {
      fr: "Données géospatiales et réconciliation : travailler avec les Premières Nations",
      en: "Geospatial Data and Reconciliation: Working with First Nations"
    },
    description: {
      fr: "Robert Cloutier présente les approches co-développées avec la Nation crie pour intégrer les savoirs autochtones dans les outils géospatiaux.",
      en: "Robert Cloutier presents approaches co-developed with the Cree Nation to integrate Indigenous knowledge into geospatial tools."
    },
    speakerIds: ["s016"],
    speakerNames: ["Robert Cloutier"],
    room: { fr: "Grande salle — Niveau 5", en: "Grand Hall — Level 5" },
    duration: 60,
    track: "Participation citoyenne"
  },
  {
    id: "a014",
    day: 1,
    time: "17:15",
    endTime: "19:00",
    type: "networking",
    title: {
      fr: "Cocktail de bienvenue — Terrasse du Palais",
      en: "Welcome Cocktail — Palais Terrace"
    },
    description: {
      fr: "Soirée de réseautage informelle avec vue sur le Vieux-Port de Montréal. DJ set et bouchées gastronomiques.",
      en: "Informal networking evening with a view of Old Montreal Port. DJ set and gourmet bites."
    },
    room: { fr: "Terrasse panoramique", en: "Panoramic Terrace" },
    duration: 105
  },

  // === DAY 2 — 5 octobre ===
  {
    id: "b001",
    day: 2,
    time: "08:30",
    endTime: "09:00",
    type: "networking",
    title: {
      fr: "Café matinal et ouverture de la zone exposition",
      en: "Morning Coffee & Exhibition Opening"
    },
    room: { fr: "Hall d'exposition", en: "Exhibition Hall" },
    duration: 30
  },
  {
    id: "b002",
    day: 2,
    time: "09:00",
    endTime: "10:00",
    type: "keynote",
    title: {
      fr: "Keynote : IA géospatiale — Entre promesses et responsabilités",
      en: "Keynote: Geospatial AI — Between Promise and Responsibility"
    },
    description: {
      fr: "Amina Diallo explore comment l'intelligence artificielle transforme le géospatial à l'échelle mondiale, et les questions éthiques que cela soulève pour les communautés vulnérables.",
      en: "Amina Diallo explores how artificial intelligence is transforming geospatial globally, and the ethical questions this raises for vulnerable communities."
    },
    speakerIds: ["s003"],
    speakerNames: ["Amina Diallo"],
    room: { fr: "Grande salle — Niveau 5", en: "Grand Hall — Level 5" },
    duration: 60
  },
  {
    id: "b003",
    day: 2,
    time: "10:00",
    endTime: "10:30",
    type: "networking",
    title: {
      fr: "Pause-café et réseautage",
      en: "Coffee Break & Networking"
    },
    room: { fr: "Hall d'exposition", en: "Exhibition Hall" },
    duration: 30
  },
  {
    id: "b004",
    day: 2,
    time: "10:30",
    endTime: "11:30",
    type: "conference",
    title: {
      fr: "Surveillance environnementale par satellite : RADARSAT et la forêt boréale",
      en: "Environmental Monitoring by Satellite: RADARSAT and the Boreal Forest"
    },
    description: {
      fr: "Marie-Laure Fontaine présente les résultats du programme national de surveillance forestière par satellite et les défis techniques de l'analyse de grandes archives radar.",
      en: "Marie-Laure Fontaine presents the results of the national satellite forest monitoring program and the technical challenges of analyzing large radar archives."
    },
    speakerIds: ["s007"],
    speakerNames: ["Marie-Laure Fontaine"],
    room: { fr: "Salle Maisonneuve", en: "Maisonneuve Room" },
    duration: 60,
    track: "Environnement"
  },
  {
    id: "b005",
    day: 2,
    time: "10:30",
    endTime: "11:30",
    type: "conference",
    title: {
      fr: "Deep learning et imagerie satellitaire : nouvelles frontières de l'analyse urbaine",
      en: "Deep Learning and Satellite Imagery: New Frontiers of Urban Analysis"
    },
    description: {
      fr: "Lin Zhang présente ses recherches sur la détection automatique du changement d'utilisation des terres dans les métropoles canadiennes grâce au deep learning.",
      en: "Lin Zhang presents her research on automatic land use change detection in Canadian cities through deep learning."
    },
    speakerIds: ["s019"],
    speakerNames: ["Lin Zhang"],
    room: { fr: "Salle Saint-Laurent", en: "Saint-Laurent Room" },
    duration: 60,
    track: "IA & Géospatial"
  },
  {
    id: "b006",
    day: 2,
    time: "11:30",
    endTime: "12:30",
    type: "panel",
    title: {
      fr: "Panel : Géospatial et santé publique — cartographier les inégalités",
      en: "Panel: Geospatial and Public Health — Mapping Inequalities"
    },
    description: {
      fr: "Discussion sur l'utilisation des données géospatiales pour comprendre et réduire les inégalités de santé dans les villes canadiennes.",
      en: "Discussion on using geospatial data to understand and reduce health inequalities in Canadian cities."
    },
    speakerIds: ["s011", "s005"],
    speakerNames: ["Nadia Khalil", "Isabelle Roy"],
    room: { fr: "Grande salle — Niveau 5", en: "Grand Hall — Level 5" },
    duration: 60,
    track: "Villes intelligentes"
  },
  {
    id: "b007",
    day: 2,
    time: "12:30",
    endTime: "13:30",
    type: "networking",
    title: {
      fr: "Dîner — Espace détente",
      en: "Lunch — Lounge Space"
    },
    room: { fr: "Espace détente", en: "Lounge Space" },
    duration: 60
  },
  {
    id: "b008",
    day: 2,
    time: "13:30",
    endTime: "14:30",
    type: "conference",
    title: {
      fr: "Prédiction géospatiale pour la résilience du réseau électrique",
      en: "Geospatial Prediction for Power Grid Resilience"
    },
    description: {
      fr: "Yasmine Benali expose comment Hydro-Québec utilise le machine learning géospatial pour anticiper les pannes et optimiser la maintenance préventive.",
      en: "Yasmine Benali explains how Hydro-Québec uses geospatial machine learning to anticipate outages and optimize preventive maintenance."
    },
    speakerIds: ["s015"],
    speakerNames: ["Yasmine Benali"],
    room: { fr: "Salle Maisonneuve", en: "Maisonneuve Room" },
    duration: 60,
    track: "IA & Géospatial"
  },
  {
    id: "b009",
    day: 2,
    time: "13:30",
    endTime: "14:30",
    type: "conference",
    title: {
      fr: "Levés par drones en milieu nordique : défis et innovations",
      en: "Drone Surveys in Northern Environments: Challenges and Innovations"
    },
    description: {
      fr: "Félix Gagnon partage les apprentissages de 2 000 missions en environnements extrêmes et les innovations technologiques développées par Drones Boréal.",
      en: "Félix Gagnon shares lessons from 2,000 missions in extreme environments and the technological innovations developed by Drones Boréal."
    },
    speakerIds: ["s014"],
    speakerNames: ["Félix Gagnon"],
    room: { fr: "Salle Saint-Laurent", en: "Saint-Laurent Room" },
    duration: 60,
    track: "Innovation"
  },
  {
    id: "b010",
    day: 2,
    time: "14:30",
    endTime: "15:00",
    type: "networking",
    title: {
      fr: "Pause-café",
      en: "Coffee Break"
    },
    room: { fr: "Hall d'exposition", en: "Exhibition Hall" },
    duration: 30
  },
  {
    id: "b011",
    day: 2,
    time: "15:00",
    endTime: "16:00",
    type: "conference",
    title: {
      fr: "Jumeaux numériques d'infrastructure : TerraMétrique et les villes intelligentes de demain",
      en: "Infrastructure Digital Twins: TerraMétrique and the Smart Cities of Tomorrow"
    },
    description: {
      fr: "Hugo Desrochers présente la vision de TerraMétrique pour la gestion des infrastructures municipales par jumeaux numériques connectés aux capteurs IoT.",
      en: "Hugo Desrochers presents TerraMétrique's vision for managing municipal infrastructure through digital twins connected to IoT sensors."
    },
    speakerIds: ["s020"],
    speakerNames: ["Hugo Desrochers"],
    room: { fr: "Salle Maisonneuve", en: "Maisonneuve Room" },
    duration: 60,
    track: "Innovation"
  },
  {
    id: "b012",
    day: 2,
    time: "15:00",
    endTime: "16:00",
    type: "conference",
    title: {
      fr: "LiDAR haute densité : applications en ingénierie et en aménagement",
      en: "High-Density LiDAR: Applications in Engineering and Planning"
    },
    description: {
      fr: "Alain Parent explore les nouvelles générations de capteurs LiDAR et leurs applications en ingénierie civile, cartographie des zones inondables et gestion des actifs.",
      en: "Alain Parent explores new generations of LiDAR sensors and their applications in civil engineering, flood zone mapping and asset management."
    },
    speakerIds: ["s010"],
    speakerNames: ["Alain Parent"],
    room: { fr: "Salle Saint-Laurent", en: "Saint-Laurent Room" },
    duration: 60,
    track: "Technologie"
  },
  {
    id: "b013",
    day: 2,
    time: "16:00",
    endTime: "17:00",
    type: "awards",
    title: {
      fr: "Cérémonie des Prix GÉOMTL 2027",
      en: "GÉOMTL 2027 Awards Ceremony"
    },
    description: {
      fr: "Remise des cinq prix GÉOMTL récompensant l'excellence, l'innovation et l'impact social dans le domaine géospatial.",
      en: "Presentation of the five GÉOMTL awards recognizing excellence, innovation and social impact in the geospatial field."
    },
    room: { fr: "Grande salle — Niveau 5", en: "Grand Hall — Level 5" },
    duration: 60
  },
  {
    id: "b014",
    day: 2,
    time: "17:00",
    endTime: "17:30",
    type: "keynote",
    title: {
      fr: "Clôture : GÉOMTL 2028 — Premières annonces",
      en: "Closing: GÉOMTL 2028 — First Announcements"
    },
    description: {
      fr: "Discours de clôture et premières annonces pour GÉOMTL 2028. Merci à tous les participants, conférenciers, partenaires et exposants.",
      en: "Closing remarks and first announcements for GÉOMTL 2028. Thank you to all participants, speakers, partners and exhibitors."
    },
    room: { fr: "Grande salle — Niveau 5", en: "Grand Hall — Level 5" },
    duration: 30
  },
  {
    id: "b015",
    day: 2,
    time: "17:30",
    endTime: "20:00",
    type: "networking",
    title: {
      fr: "Cocktail de clôture — Soirée GÉOMTL",
      en: "Closing Cocktail — GÉOMTL Evening"
    },
    description: {
      fr: "Soirée de clôture festive avec musique live, nourriture gastronomique et remises des prix de réseautage.",
      en: "Festive closing evening with live music, gourmet food and networking awards."
    },
    room: { fr: "Grand Salon — Niveau 6", en: "Grand Salon — Level 6" },
    duration: 150
  }
];

export function getAgendaByDay(day: 0 | 1 | 2): AgendaItem[] {
  return agendaItems.filter(item => item.day === day);
}

export function getAgendaByType(type: SessionType): AgendaItem[] {
  return agendaItems.filter(item => item.type === type);
}
