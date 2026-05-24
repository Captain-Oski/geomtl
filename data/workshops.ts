export type WorkshopLevel = 'debutant' | 'intermediaire' | 'avance';

export interface Workshop {
  id: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  duration: number; // minutes
  level: WorkshopLevel;
  spots: number;
  spotsRemaining: number;
  facilitator: string;
  facilitatorOrg: string;
  topics: { fr: string[]; en: string[] };
  day: 1 | 2;
  time: string;
  room: { fr: string; en: string };
}

export const workshops: Workshop[] = [
  {
    id: "w001",
    title: {
      fr: "Introduction à QGIS : cartographie et analyse spatiale",
      en: "Introduction to QGIS: Mapping and Spatial Analysis"
    },
    description: {
      fr: "Atelier pratique pour découvrir QGIS, le logiciel SIG open source le plus utilisé au monde. Vous apprendrez à importer des données, créer des cartes thématiques et réaliser des analyses spatiales de base. Aucune expérience préalable requise.",
      en: "Hands-on workshop to discover QGIS, the world's most used open source GIS software. You will learn to import data, create thematic maps and perform basic spatial analysis. No prior experience required."
    },
    duration: 180,
    level: "debutant",
    spots: 30,
    spotsRemaining: 8,
    facilitator: "Marie-Ève Tanguay",
    facilitatorOrg: "CÉGEP Limoilou",
    topics: {
      fr: ["QGIS", "Cartographie", "Analyse spatiale", "Open source"],
      en: ["QGIS", "Cartography", "Spatial analysis", "Open source"]
    },
    day: 1,
    time: "09:00",
    room: { fr: "Salle Atelier A", en: "Workshop Room A" }
  },
  {
    id: "w002",
    title: {
      fr: "Analyse de données géospatiales avec Python et GeoPandas",
      en: "Geospatial Data Analysis with Python and GeoPandas"
    },
    description: {
      fr: "Apprenez à manipuler, analyser et visualiser des données géospatiales avec Python. Cet atelier couvre GeoPandas, Shapely, Fiona et Matplotlib pour la création de workflows d'analyse reproductibles.",
      en: "Learn to manipulate, analyze and visualize geospatial data with Python. This workshop covers GeoPandas, Shapely, Fiona and Matplotlib for creating reproducible analysis workflows."
    },
    duration: 240,
    level: "intermediaire",
    spots: 25,
    spotsRemaining: 5,
    facilitator: "Jean-Sébastien Côté",
    facilitatorOrg: "Polytechnique Montréal",
    topics: {
      fr: ["Python", "GeoPandas", "Analyse de données", "Automatisation"],
      en: ["Python", "GeoPandas", "Data analysis", "Automation"]
    },
    day: 1,
    time: "09:00",
    room: { fr: "Salle Atelier B", en: "Workshop Room B" }
  },
  {
    id: "w003",
    title: {
      fr: "Cartographie web avec MapLibre GL JS",
      en: "Web Mapping with MapLibre GL JS"
    },
    description: {
      fr: "Créez des cartes web interactives et performantes avec MapLibre GL JS. Apprenez à travailler avec les tuiles vectorielles, personnaliser les styles cartographiques et intégrer des sources de données en temps réel.",
      en: "Create interactive, high-performance web maps with MapLibre GL JS. Learn to work with vector tiles, customize map styles and integrate real-time data sources."
    },
    duration: 210,
    level: "intermediaire",
    spots: 20,
    spotsRemaining: 12,
    facilitator: "Thomas Nguyen",
    facilitatorOrg: "MapBox Canada",
    topics: {
      fr: ["JavaScript", "MapLibre", "Tuiles vectorielles", "Cartographie web"],
      en: ["JavaScript", "MapLibre", "Vector tiles", "Web mapping"]
    },
    day: 1,
    time: "14:00",
    room: { fr: "Salle Atelier A", en: "Workshop Room A" }
  },
  {
    id: "w004",
    title: {
      fr: "Introduction aux données LiDAR : acquisition et traitement",
      en: "Introduction to LiDAR Data: Acquisition and Processing"
    },
    description: {
      fr: "Familiarisez-vous avec les données LiDAR : types de capteurs, formats de données, classification des nuages de points et génération de modèles numériques de terrain. Exercices pratiques avec LAStools et CloudCompare.",
      en: "Get acquainted with LiDAR data: sensor types, data formats, point cloud classification and generation of digital terrain models. Practical exercises with LAStools and CloudCompare."
    },
    duration: 240,
    level: "debutant",
    spots: 25,
    spotsRemaining: 3,
    facilitator: "Alain Parent",
    facilitatorOrg: "Tetra Tech Canada",
    topics: {
      fr: ["LiDAR", "Nuages de points", "MNT", "CloudCompare"],
      en: ["LiDAR", "Point clouds", "DTM", "CloudCompare"]
    },
    day: 1,
    time: "14:00",
    room: { fr: "Salle Atelier B", en: "Workshop Room B" }
  },
  {
    id: "w005",
    title: {
      fr: "Machine learning géospatial avec scikit-learn et GDAL",
      en: "Geospatial Machine Learning with scikit-learn and GDAL"
    },
    description: {
      fr: "Appliquez des algorithmes de machine learning aux données géospatiales raster et vectorielles. Classification d'images satellitaires, détection d'anomalies et prédiction spatiale avec scikit-learn, GDAL et rasterio.",
      en: "Apply machine learning algorithms to raster and vector geospatial data. Satellite image classification, anomaly detection and spatial prediction with scikit-learn, GDAL and rasterio."
    },
    duration: 270,
    level: "avance",
    spots: 20,
    spotsRemaining: 7,
    facilitator: "Lin Zhang",
    facilitatorOrg: "McGill University",
    topics: {
      fr: ["Machine learning", "Classification d'images", "scikit-learn", "GDAL"],
      en: ["Machine learning", "Image classification", "scikit-learn", "GDAL"]
    },
    day: 2,
    time: "09:00",
    room: { fr: "Salle Atelier A", en: "Workshop Room A" }
  },
  {
    id: "w006",
    title: {
      fr: "Déploiement de drones pour les levés géospatiaux",
      en: "Deploying Drones for Geospatial Surveys"
    },
    description: {
      fr: "Apprenez les bases de la planification de missions de levés par drones : logiciels de planification, photogrammétrie aérienne, génération d'orthophotos et de modèles 3D. Démonstration pratique incluse.",
      en: "Learn the basics of planning drone survey missions: planning software, aerial photogrammetry, orthophoto and 3D model generation. Practical demonstration included."
    },
    duration: 240,
    level: "intermediaire",
    spots: 20,
    spotsRemaining: 2,
    facilitator: "Félix Gagnon",
    facilitatorOrg: "Drones Boréal",
    topics: {
      fr: ["Drones", "Photogrammétrie", "Orthophotos", "Modèles 3D"],
      en: ["Drones", "Photogrammetry", "Orthophotos", "3D models"]
    },
    day: 2,
    time: "09:00",
    room: { fr: "Salle Atelier B", en: "Workshop Room B" }
  },
  {
    id: "w007",
    title: {
      fr: "ArcGIS Online pour les organisations : administration et déploiement",
      en: "ArcGIS Online for Organizations: Administration and Deployment"
    },
    description: {
      fr: "Configuration avancée d'ArcGIS Online pour les besoins organisationnels. Gestion des utilisateurs, sécurité, partage de données, intégrations et bonnes pratiques de déploiement en entreprise ou gouvernement.",
      en: "Advanced ArcGIS Online configuration for organizational needs. User management, security, data sharing, integrations and deployment best practices for enterprise or government."
    },
    duration: 210,
    level: "intermediaire",
    spots: 25,
    spotsRemaining: 10,
    facilitator: "David Chen",
    facilitatorOrg: "Esri Canada",
    topics: {
      fr: ["ArcGIS Online", "Administration", "Sécurité", "Déploiement"],
      en: ["ArcGIS Online", "Administration", "Security", "Deployment"]
    },
    day: 2,
    time: "13:30",
    room: { fr: "Salle Atelier A", en: "Workshop Room A" }
  },
  {
    id: "w008",
    title: {
      fr: "Données géospatiales ouvertes : APIs, formats et bonnes pratiques",
      en: "Open Geospatial Data: APIs, Formats and Best Practices"
    },
    description: {
      fr: "Tour d'horizon des sources de données géospatiales ouvertes : catalogues nationaux, OGC APIs, formats GeoJSON, GeoParquet, PMTiles. Comment structurer et publier des données géospatiales de qualité.",
      en: "Overview of open geospatial data sources: national catalogs, OGC APIs, GeoJSON, GeoParquet, PMTiles formats. How to structure and publish quality geospatial data."
    },
    duration: 180,
    level: "debutant",
    spots: 30,
    spotsRemaining: 18,
    facilitator: "Alexandre Moreau",
    facilitatorOrg: "Statistique Canada",
    topics: {
      fr: ["Données ouvertes", "APIs", "Standards", "Publication de données"],
      en: ["Open data", "APIs", "Standards", "Data publishing"]
    },
    day: 2,
    time: "13:30",
    room: { fr: "Salle Atelier B", en: "Workshop Room B" }
  }
];

export function getWorkshopById(id: string): Workshop | undefined {
  return workshops.find(w => w.id === id);
}

export function getWorkshopsByLevel(level: WorkshopLevel): Workshop[] {
  return workshops.filter(w => w.level === level);
}
