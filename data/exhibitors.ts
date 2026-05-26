export interface Exhibitor {
  id: string;
  name: string;
  sector: { fr: string; en: string };
  description: { fr: string; en: string };
  booth: string;
  website: string;
  logoColor: string;
}

export const exhibitors: Exhibitor[] = [
  {
    id: "e001",
    name: "Esri Canada",
    sector: { fr: "Plateformes SIG", en: "GIS Platforms" },
    description: {
      fr: "Découvrez les dernières nouveautés ArcGIS Pro, ArcGIS Online et les solutions Field Maps pour la collecte terrain.",
      en: "Discover the latest from ArcGIS Pro, ArcGIS Online and Field Maps solutions for field data collection."
    },
    booth: "A01",
    website: "https://www.esri.ca",
    logoColor: "#e91e8c"
  },
  {
    id: "e002",
    name: "Trimble",
    sector: { fr: "Instruments de mesure", en: "Measurement Instruments" },
    description: {
      fr: "Stations totales robotisées, GNSS de haute précision et solutions de réalité augmentée pour la géomatique de terrain.",
      en: "Robotic total stations, high-precision GNSS and augmented reality solutions for field geomatics."
    },
    booth: "A02",
    website: "https://www.trimble.com",
    logoColor: "#ff6b35"
  },
  {
    id: "e003",
    name: "Bentley Systems",
    sector: { fr: "Jumeaux numériques", en: "Digital Twins" },
    description: {
      fr: "iTwin Platform, MicroStation et solutions de gestion d'actifs d'infrastructure pour les villes et les gouvernements.",
      en: "iTwin Platform, MicroStation and infrastructure asset management solutions for cities and governments."
    },
    booth: "A03",
    website: "https://www.bentley.com",
    logoColor: "#ffd60a"
  },
  {
    id: "e004",
    name: "Leica Geosystems",
    sector: { fr: "Instruments de mesure", en: "Measurement Instruments" },
    description: {
      fr: "Scanners laser 3D terrestres, solutions BLK et imagerie mobile pour la documentation des infrastructures.",
      en: "3D terrestrial laser scanners, BLK solutions and mobile imaging for infrastructure documentation."
    },
    booth: "B01",
    website: "https://leica-geosystems.com",
    logoColor: "#e91e8c"
  },
  {
    id: "e005",
    name: "Drones Boréal",
    sector: { fr: "Drones et UAV", en: "Drones and UAV" },
    description: {
      fr: "Solutions de levés par drones adaptées aux environnements nordiques et aux conditions climatiques extrêmes du Québec.",
      en: "Drone survey solutions adapted to northern environments and extreme climatic conditions in Quebec."
    },
    booth: "B02",
    website: "https://dronesboreal.ca",
    logoColor: "#ff6b35"
  },
  {
    id: "e006",
    name: "TerraMétrique",
    sector: { fr: "Jumeaux numériques", en: "Digital Twins" },
    description: {
      fr: "Plateforme SaaS de jumeaux numériques pour la gestion des infrastructures municipales avec intégration IoT temps réel.",
      en: "SaaS platform for digital twins in municipal infrastructure management with real-time IoT integration."
    },
    booth: "B03",
    website: "https://terrametrique.ca",
    logoColor: "#ffd60a"
  },
  {
    id: "e007",
    name: "Maxar Technologies",
    sector: { fr: "Imagerie satellitaire", en: "Satellite Imagery" },
    description: {
      fr: "Imagerie satellitaire très haute résolution WorldView, services de détection de changements et données d'observation de la Terre.",
      en: "Very high resolution WorldView satellite imagery, change detection services and Earth observation data."
    },
    booth: "C01",
    website: "https://www.maxar.com",
    logoColor: "#e91e8c"
  },
  {
    id: "e008",
    name: "Planet Labs",
    sector: { fr: "Imagerie satellitaire", en: "Satellite Imagery" },
    description: {
      fr: "Constellation de 200+ microsatellites pour l'imagerie quotidienne de la Terre entière à 3m de résolution.",
      en: "Constellation of 200+ microsatellites for daily imaging of the entire Earth at 3m resolution."
    },
    booth: "C02",
    website: "https://www.planet.com",
    logoColor: "#ff6b35"
  },
  {
    id: "e009",
    name: "GéoSud Analytics",
    sector: { fr: "IA géospatiale", en: "Geospatial AI" },
    description: {
      fr: "Plateforme d'analyse géospatiale par intelligence artificielle pour les marchés émergents. Solutions de cartographie automatique.",
      en: "AI-powered geospatial analysis platform for emerging markets. Automated mapping solutions."
    },
    booth: "C03",
    website: "https://geosud.ca",
    logoColor: "#ffd60a"
  },
  {
    id: "e010",
    name: "Hexagon Geospatial",
    sector: { fr: "Solutions géospatiales", en: "Geospatial Solutions" },
    description: {
      fr: "M.App Enterprise, HxGN Content Program et solutions d'analyse géospatiale en temps réel pour les opérations critiques.",
      en: "M.App Enterprise, HxGN Content Program and real-time geospatial analysis solutions for critical operations."
    },
    booth: "D01",
    website: "https://www.hexagon.com",
    logoColor: "#e91e8c"
  },
  {
    id: "e011",
    name: "MapBox Canada",
    sector: { fr: "Cartographie web", en: "Web Mapping" },
    description: {
      fr: "Outils et APIs pour créer des cartes web personnalisées haute performance : Navigation SDK, Maps SDK, Tiling Service.",
      en: "Tools and APIs to build custom, high-performance web maps: Navigation SDK, Maps SDK, Tiling Service."
    },
    booth: "D02",
    website: "https://www.mapbox.com",
    logoColor: "#ff6b35"
  },
  {
    id: "e012",
    name: "Fugro",
    sector: { fr: "Relevés géophysiques", en: "Geophysical Surveys" },
    description: {
      fr: "Levés géophysiques marins et terrestres, bathymétrie, géotechnique offshore et services de positionnement de précision.",
      en: "Marine and terrestrial geophysical surveys, bathymetry, offshore geotechnics and precision positioning services."
    },
    booth: "D03",
    website: "https://www.fugro.com",
    logoColor: "#ffd60a"
  }
];

export const EXHIBITOR_SECTORS_FR = [
  "Plateformes SIG",
  "Instruments de mesure",
  "Jumeaux numériques",
  "Drones et UAV",
  "Imagerie satellitaire",
  "IA géospatiale",
  "Solutions géospatiales",
  "Cartographie web",
  "Relevés géophysiques"
];

export const EXHIBITOR_SECTORS_EN = [
  "GIS Platforms",
  "Measurement Instruments",
  "Digital Twins",
  "Drones and UAV",
  "Satellite Imagery",
  "Geospatial AI",
  "Geospatial Solutions",
  "Web Mapping",
  "Geophysical Surveys"
];

export function getExhibitorById(id: string): Exhibitor | undefined {
  return exhibitors.find(e => e.id === id);
}
