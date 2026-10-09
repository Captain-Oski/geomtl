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
        "1 kiosque de 20 pieds",
        "25 minutes de scène principale",
        "Commandite de la salle principale, sur 2 jours",
        "Visibilité de premier plan dans nos communications et sur nos réseaux sociaux"
      ]
    },
    en: {
      name: "Gold",
      price: "$20,000",
      capacity: "1 available",
      benefits: [
        "6 included passes",
        "One 20-ft booth",
        "25 minutes main stage time",
        "Main room sponsorship, for both days",
        "Top billing in our communications and on our social media"
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
        "1 kiosque de 10 pieds",
        "5 minutes de scène principale",
        "Salle de conférence commanditée à votre nom, sur 2 jours",
        "25 minutes de vitrine technologique",
        "Visibilité dans nos communications et sur nos réseaux sociaux"
      ]
    },
    en: {
      name: "Silver",
      price: "$11,995",
      capacity: "4 available",
      benefits: [
        "4 included passes",
        "One 10-ft booth",
        "5 minutes main stage time",
        "Conference room sponsored in your name, for both days",
        "25 minutes of technology showcase",
        "Visibility in our communications and on our social media"
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
        "1 kiosque de 10 pieds",
        "Lounge à vos couleurs pendant une demi-journée (écrans, vidéos, gobelets à votre logo)",
        "25 minutes de vitrine technologique",
        "Mention sur nos réseaux sociaux"
      ]
    },
    en: {
      name: "Bronze",
      price: "$6,995",
      capacity: "4 available",
      benefits: [
        "2 included passes",
        "One 10-ft booth",
        "Lounge in your brand colours for half a day (screens, videos, cups with your logo)",
        "25 minutes of technology showcase",
        "Mention on our social media"
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
        "1 kiosque de 10 pieds"
      ]
    },
    en: {
      name: "Exhibitor",
      price: "$3,495",
      capacity: "16 available",
      benefits: [
        "2 included passes",
        "One 10-ft booth"
      ]
    }
  }
};
