import type { Icon } from '@phosphor-icons/react';
import { Lightbulb } from '@phosphor-icons/react/dist/ssr/Lightbulb';
import { Handshake } from '@phosphor-icons/react/dist/ssr/Handshake';
import { Star } from '@phosphor-icons/react/dist/ssr/Star';
import { Database } from '@phosphor-icons/react/dist/ssr/Database';
import { Megaphone } from '@phosphor-icons/react/dist/ssr/Megaphone';

export interface Award {
  id: string;
  slug: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  criteria: { fr: string[]; en: string[] };
  icon: Icon;
  color: string;
}

export const awards: Award[] = [
  {
    id: "aw001",
    slug: "innovation-geospatiale",
    title: {
      fr: "Prix Innovation géospatiale",
      en: "Geospatial Innovation Award"
    },
    description: {
      fr: "Récompense un projet ou un produit qui introduit une approche véritablement novatrice dans le domaine géospatial, qu'il s'agisse d'une nouvelle méthodologie, d'un outil technologique ou d'une application inédite des données spatiales.",
      en: "Recognizes a project or product that introduces a truly innovative approach in the geospatial field, whether a new methodology, a technological tool or a novel application of spatial data."
    },
    criteria: {
      fr: [
        "Originalité et caractère novateur de l'approche",
        "Impact potentiel sur le secteur géospatial",
        "Faisabilité et maturité technologique",
        "Reproductibilité ou scalabilité de la solution"
      ],
      en: [
        "Originality and innovative nature of the approach",
        "Potential impact on the geospatial sector",
        "Technical feasibility and maturity",
        "Reproducibility or scalability of the solution"
      ]
    },
    icon: Lightbulb,
    color: "#A9B300"
  },
  {
    id: "aw002",
    slug: "impact-social",
    title: {
      fr: "Prix Impact social",
      en: "Social Impact Award"
    },
    description: {
      fr: "Honore un projet géospatial qui a eu un impact mesurable et positif sur une communauté, une population vulnérable ou un enjeu social, en utilisant les données spatiales comme vecteur de changement.",
      en: "Honours a geospatial project that has had a measurable and positive impact on a community, a vulnerable population or a social issue, using spatial data as a vector for change."
    },
    criteria: {
      fr: [
        "Démonstration d'un impact social concret et mesurable",
        "Inclusion et accessibilité",
        "Collaboration avec les communautés concernées",
        "Durabilité et pérennité de l'initiative"
      ],
      en: [
        "Demonstration of concrete, measurable social impact",
        "Inclusion and accessibility",
        "Collaboration with affected communities",
        "Sustainability and longevity of the initiative"
      ]
    },
    icon: Handshake,
    color: "#00A383"
  },
  {
    id: "aw003",
    slug: "excellence-jeune-professionnel",
    title: {
      fr: "Prix Excellence — Jeune professionnel.le",
      en: "Excellence Award — Young Professional"
    },
    description: {
      fr: "Reconnaît une personne de moins de 35 ans qui s'est distinguée dans le domaine géospatial par ses réalisations professionnelles, sa contribution à la communauté ou son leadership.",
      en: "Recognizes a person under 35 who has distinguished themselves in the geospatial field through professional achievements, community contribution or leadership."
    },
    criteria: {
      fr: [
        "Réalisations professionnelles exceptionnelles",
        "Contribution à la communauté géospatiale",
        "Leadership et initiative",
        "Candidat de moins de 35 ans"
      ],
      en: [
        "Exceptional professional achievements",
        "Contribution to the geospatial community",
        "Leadership and initiative",
        "Candidate under 35 years of age"
      ]
    },
    icon: Star,
    color: "#6A8C3A"
  },
  {
    id: "aw004",
    slug: "meilleure-donnee-ouverte",
    title: {
      fr: "Prix Meilleure donnée ouverte",
      en: "Best Open Data Award"
    },
    description: {
      fr: "Distingue une organisation — gouvernementale, privée ou civique — ayant publié un jeu de données géospatiales ouvertes d'une qualité et d'une utilité exceptionnelles pour la communauté.",
      en: "Distinguishes an organization — government, private or civic — that has published an open geospatial dataset of exceptional quality and utility for the community."
    },
    criteria: {
      fr: [
        "Qualité, complétude et mise à jour des données",
        "Documentation et métadonnées exemplaires",
        "Facilité d'accès et formats ouverts",
        "Impact démontré par la réutilisation des données"
      ],
      en: [
        "Data quality, completeness and currency",
        "Exemplary documentation and metadata",
        "Ease of access and open formats",
        "Impact demonstrated through data reuse"
      ]
    },
    icon: Database,
    color: "#A9B300"
  },
  {
    id: "aw005",
    slug: "ambassadeur-geospatial",
    title: {
      fr: "Prix Ambassadeur.rice géospatial.e",
      en: "Geospatial Ambassador Award"
    },
    description: {
      fr: "Récompense une personnalité qui a contribué de manière exceptionnelle à la promotion, à la démocratisation ou à la vulgarisation des sciences géospatiales auprès du grand public ou des prochaines générations.",
      en: "Rewards a personality who has made an exceptional contribution to the promotion, democratization or popularization of geospatial sciences among the general public or future generations."
    },
    criteria: {
      fr: [
        "Contribution durable à la promotion du géospatial",
        "Capacité à communiquer et vulgariser",
        "Portée et influence dans la communauté",
        "Inspiration pour les nouvelles générations"
      ],
      en: [
        "Lasting contribution to geospatial promotion",
        "Ability to communicate and popularize",
        "Reach and influence in the community",
        "Inspiration for new generations"
      ]
    },
    icon: Megaphone,
    color: "#00A383"
  }
];

export function getAwardBySlug(slug: string): Award | undefined {
  return awards.find(a => a.slug === slug);
}
