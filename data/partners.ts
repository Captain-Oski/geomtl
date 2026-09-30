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

// Vide en attendant l'annonce officielle des partenaires 2027.
export const partners: Partner[] = [];

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
