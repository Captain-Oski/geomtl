// Photos des éditions précédentes, hébergées sur le Flickr de l'ACSG – Section Montréal.
// Chaque photo renvoie à sa page Flickr, comme le demandent les règles d'intégration de Flickr.
export const FLICKR_ALBUMS_URL = 'https://www.flickr.com/photos/130782745@N08/albums';

export interface PhotoGalerie { src: string; lien: string; alt: { fr: string; en: string } }
export interface EditionGalerie { annee: number; album: string; photos: PhotoGalerie[] }

const photo = (album: string, id: string, src: string, fr: string, en: string): PhotoGalerie => ({
  src,
  lien: `https://www.flickr.com/photos/130782745@N08/${id}/in/album-${album}/`,
  alt: { fr, en },
});

export const EDITIONS: EditionGalerie[] = [
  {
    annee: 2025,
    album: `https://www.flickr.com/photos/130782745@N08/albums/72177720330632381`,
    photos: [
      photo('72177720330632381', '54955900881', 'https://live.staticflickr.com/65535/54955900881_283961b19a_c.jpg', "Hall d'accueil avec l'arche GÉOMTL et les participants", "Entrance hall with the GÉOMTL arch and attendees"),
      photo('72177720330632381', '54955008282', 'https://live.staticflickr.com/65535/54955008282_5057a4d159_c.jpg', "Plénière sous les projecteurs, la Terre à l'écran", "Plenary under stage lights, with the Earth on screen"),
      photo('72177720330632381', '54956142509', 'https://live.staticflickr.com/65535/54956142509_1ab6a6d63c_c.jpg', "Allocution sur la scène principale", "Speech on the main stage"),
      photo('72177720330632381', '54956080878', 'https://live.staticflickr.com/65535/54956080878_b5c1a25c83_c.jpg', "Animation sur scène pendant la soirée", "Stage show during the evening event"),
      photo('72177720330632381', '54956205715', 'https://live.staticflickr.com/65535/54956205715_4851bd607f_c.jpg', "Salon des exposants rempli de participants", "Busy exhibition floor"),
      photo('72177720330632381', '54956205920', 'https://live.staticflickr.com/65535/54956205920_5efdf74ab1_c.jpg', "Démonstration d'intelligence artificielle à un kiosque", "AI demonstration at a booth"),
      photo('72177720330632381', '54956081773', 'https://live.staticflickr.com/65535/54956081773_00d6ab502d_c.jpg', "Soirée réseautage sous les éclairages de scène", "Networking evening under stage lights"),
      photo('72177720330632381', '54955008312', 'https://live.staticflickr.com/65535/54955008312_15027937f9_c.jpg', "Échange à un kiosque d'exposant", "Conversation at an exhibitor booth"),
      photo('72177720330632381', '54955900411', 'https://live.staticflickr.com/65535/54955900411_68d28af002_c.jpg', "Foule de participants dans le couloir du congrès", "Crowd of attendees in the conference hallway"),
    ],
  },
  {
    annee: 2023,
    album: `https://www.flickr.com/photos/130782745@N08/albums/72177720312182126`,
    photos: [
      photo('72177720312182126', '53283750096', 'https://live.staticflickr.com/65535/53283750096_46882bd16c_c.jpg', "Salle plénière à l'ouverture, écran « Bienvenue »", "Plenary room at the opening, “Welcome” screen"),
      photo('72177720312182126', '53284119944', 'https://live.staticflickr.com/65535/53284119944_59a7d637ca_c.jpg', "Remerciement au commanditaire principal Jakarto", "Thanks to lead sponsor Jakarto"),
      photo('72177720312182126', '53284208860', 'https://live.staticflickr.com/65535/53284208860_b12651c0c8_c.jpg', "Conférence sur la scène principale", "Talk on the main stage"),
      photo('72177720312182126', '53283749646', 'https://live.staticflickr.com/65535/53283749646_e6a180961d_c.jpg', "Présentation devant le public", "Presentation in front of the audience"),
      photo('72177720312182126', '53283999633', 'https://live.staticflickr.com/65535/53283999633_780b656b1e_c.jpg', "Hall du congrès et accueil des participants", "Conference hall and attendee welcome"),
      photo('72177720312182126', '53283749336', 'https://live.staticflickr.com/65535/53283749336_3d5dc412d3_c.jpg', "Réseautage entre participants", "Attendees networking"),
      photo('72177720312182126', '53282854437', 'https://live.staticflickr.com/65535/53282854437_ee0df10d6e_c.jpg', "Kiosque Leica Geosystems", "Leica Geosystems booth"),
      photo('72177720312182126', '53284208105', 'https://live.staticflickr.com/65535/53284208105_9184af616d_c.jpg', "Kiosque Esri Canada", "Esri Canada booth"),
      photo('72177720312182126', '53282854312', 'https://live.staticflickr.com/65535/53282854312_5b0977934d_c.jpg', "Réseautage au kiosque K2 Geospatial", "Networking at the K2 Geospatial booth"),
    ],
  },
  {
    annee: 2019,
    album: `https://www.flickr.com/photos/130782745@N08/albums/72157711865021743`,
    photos: [
      photo('72157711865021743', '49096281347', 'https://live.staticflickr.com/65535/49096281347_8e12259344_c.jpg', "Décor GÉOMTL 2019", "GÉOMTL 2019 backdrop"),
      photo('72157711865021743', '49096271207', 'https://live.staticflickr.com/65535/49096271207_7dac558799_c.jpg', "Plénière devant une salle comble", "Plenary before a full room"),
      photo('72157711865021743', '49096087296', 'https://live.staticflickr.com/65535/49096087296_e2028ed770_c.jpg', "Repas-conférence dans la grande salle", "Luncheon talk in the main hall"),
      photo('72157711865021743', '49096266532', 'https://live.staticflickr.com/65535/49096266532_c6e917e824_c.jpg', "Participants en pleine discussion", "Attendees in conversation"),
      photo('72157711865021743', '49095572833', 'https://live.staticflickr.com/65535/49095572833_2151abce1c_c.jpg', "Conférencier sur scène", "Speaker on stage"),
      photo('72157711865021743', '49096087181', 'https://live.staticflickr.com/65535/49096087181_83488b9bd9_c.jpg', "Allée du salon des exposants", "Exhibition hall aisle"),
      photo('72157711865021743', '49095574813', 'https://live.staticflickr.com/65535/49095574813_d54eb8fb1b_c.jpg', "Kiosque Effigis", "Effigis booth"),
      photo('72157711865021743', '49096280842', 'https://live.staticflickr.com/65535/49096280842_4a902707d9_c.jpg', "« Merci à nos commanditaires! » à l'écran", "“Thanks to our sponsors!” on screen"),
      photo('72157711865021743', '49096281092', 'https://live.staticflickr.com/65535/49096281092_94d53381b8_c.jpg', "Pause-repas entre les conférences", "Meal break between talks"),
    ],
  },
];
