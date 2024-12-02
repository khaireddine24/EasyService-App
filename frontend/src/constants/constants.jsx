import { Users,Wrench,CheckCircle,Shield,Clock,Mail,Phone,MapPin,Facebook,Twitter,Instagram,Linkedin} from "lucide-react"

export const CommentCaMarche=[
    {
        id:1,
        icon:<Users size={64} className="text-yellow-600"/>,
        title:"1. Inscrivez-vous",
        description:"Créez votre compte client ou prestataire gratuitement",
    },
    {
        id:2,
        icon:<Wrench size={64} className="text-yellow-600"/>,
        title:"2. Trouvez un Service",
        description:"Parcourez nos services ou publiez votre besoin",
    },
    {
        id:3,
        icon:<CheckCircle size={64} className="text-yellow-600"/>,
        title:"3. Réservez & Profitez",
        description:"Confirmez et recevez un service de qualité",
    }
]

export const EasyService=[
    {
        id:1,
        icon:<Shield size={64} className="mx-auto text-yellow-600 mb-4" />,
        title:"Sécurisé",
        description:"Prestataires vérifiés et notés"
    },
    {
        id:2,
        icon:<CheckCircle size={64} className="mx-auto text-yellow-600 mb-4" />,
        title:"Qualité",
        description:"Services de haute qualité garantis"
    },
    {
        id:3,
        icon:<Clock size={64} className="mx-auto text-yellow-600 mb-4" />,
        title:"Rapidité",
        description:"Trouvez un service en quelques minutes"
    },
    {
        id:4,
        icon:<Users size={64} className="mx-auto text-yellow-600 mb-4" />,
        title:"Communauté",
        description:"Un réseau de professionnels locaux"
    },

]

export const NosService=[
    {
        id:1,
        title:"Réparation"
    },
    {
        id:2,
        title:"Jardinage"
    },
    {
        id:3,
        title:"Nettoyage"
    },
    {
        id:4,
        title:"Déménagement"
    },
    {
        id:5,
        title:"Bricolage"
    }
];

export const LienRapide=[
    {
        id:1,
        title:"Accueil",
        link:'/'
    },
    {
        id:2,
        title:"Services",
        link:'/services'
    },
    {
        id:3,
        title:"Inscription",
        link:'/Register?role=client'
    },
    {
        id:4,
        title:"Connexion",
        link:'/Login'
    },
    {
        id:5,
        title:"À Propos",
        link:'/about'
    }
]

export const Contact=[
    {
        id:1,
        title:"support@easyservice.com",
        icon:<Mail size={20} className="mr-2 text-yellow-400" />
    },
    {
        id:2,
        title:"+33 1 23 45 67 89",
        icon:<Phone size={20} className="mr-2 text-yellow-400" />
    },
    {
        id:3,
        title:"Paris, France",
        icon:<MapPin size={20} className="mr-2 text-yellow-400" />

    }
]

export const Socials=[
    {
        id:1,
        link:'#',
        icon:<Facebook size={24} />
    },
    {
        id:2,
        link:'#',
        icon:<Twitter size={24} />
    },
    {
        id:3,
        link:'#',
        icon:<Instagram size={24} />
    },
    {
        id:4,
        link:'#',
        icon:<Linkedin size={24} />
    }
]

export const Categories = {
    "Bricolage - Travaux": [
        "Bricolage - Petits travaux",
        "Montage meubles en kit",
        "Pose de parquet - Revêtement de sol",
        "Carrelage",
        "Chaudronnerie - Soudure",
        "Charpente",
        "Chauffage - Climatisation",
        "Couverture - Toiture",
        "Installation électrique",
        "Maçonnerie",
        "Terrassement - Assainissement",
        "Menuiserie - Huisserie - Agencement",
        "Peinture - Tapisserie",
        "Plâtrerie - Murs - Plafonds",
        "Plomberie - Installation sanitaire",
        "Ramonage - Fumiste",
        "Architecte - Maître d'oeuvre",
        "Serrurerie",
        "Artisan tout corps d'état - Rénovation",
        "Taille de pierre - Marbrerie",
        "Architecte d'intérieur - Décorateur d'intérieur",
        "Artisan d'art"
    ],
    "Jardinage - Piscine": [
        "Jardinier",
        "Paysagiste - Aménagement du jardin",
        "Tonte de pelouse - Débroussaillage",
        "Elagage et coupe d'arbres",
        "Taille de haies et d'arbustes",
        "Clôture Grillage",
        "Entretien piscine"
    ],
    "Déménagement - Manutention": [
        "Déménageurs et aide au déménagement",
        "Manutention"
    ],
    "Dépannage - Réparation de matériel": [
        "Dépannage électroménager",
        "Dépannage smartphone - hifi - video - photo",
        "Réparation outillage",
        "Réparation objets",
        "Dépannage informatique"
    ],
    "Entretien - Réparation véhicules": [
        "Réparation carrosserie",
        "Lavage auto",
        "Réparation voiture",
        "Réparation vélo - moto",
        "Entretien - Réparation autres véhicules"
    ],
    "Services véhiculés": [
        "Covoiturage (partage de frais)",
        "Livraison - Transport de colis",
        "Évacuation déchets - Gravats",
        "Transport de véhicules - Remorquage",
        "Promenades et sorties véhiculées"
    ],
    "Services à la personne": [
        "Femme de Ménage",
        "Lingerie - Repassage",
        "Couturière",
        "Aide soignante",
        "Aide à domicile",
        "Livraison de courses",
        "Home sitting - Accueil - Gardiennage"
    ],
    "Enfants": [
        "Baby sitting",
        "Nounou",
        "Fille au pair",
        "Garde périscolaire",
        "Aide aux devoirs"
    ],
    "Animaux": [
        "Toilettage",
        "Garde chien",
        "Garde chat",
        "Garde animaux",
        "Pension chevaux",
        "Paturage",
        "Dressage"
    ],
    "Informatique et web": [
        "Assistance informatique",
        "Création site internet",
        "Création application mobile",
        "Référencement naturel",
        "Webmarketing",
        "Graphisme - Création flyer - plaquette",
        "Webmaster"
    ],
    "Photographie - Vidéo": [
        "Photographe",
        "Modèle photo",
        "Retouche photo",
        "Vidéaste",
        "Montage photo video"
    ],
    "Animation - Evénements": [
        "DJ - Disc Jockey",
        "Père Noël",
        "Clown",
        "Magicien - Prestidigitateur",
        "Animateur",
        "Chanteur - chanteuse",
        "Musicien - Groupe de musique",
        "Comédien",
        "Danseur",
        "Humoriste",
        "Imitateur",
        "Jongleur",
        "Hôte - Hôtesse",
        "Vendeur - Commercial",
        "Bénévole"
    ],
    "Cours - Formations": [
        "Cours de maths",
        "Cours de physique",
        "Cours d'anglais",
        "Cours de français",
        "Cours d'espagnol",
        "Cours d'allemand",
        "Cours d'arabe",
        "Cours de mandarin - chinois",
        "Autres cours de langue",
        "Cours d'informatique",
        "Soutien scolaire",
        "Cours de guitare",
        "Cours de piano",
        "Autres Cours de musique",
        "Cours de cuisine",
        "Cours de couture",
        "Cours de dessin",
        "Cours de danse",
        "Autres cours loisirs"
    ],
    "Administratif - Bureautique": [
        "Secrétariat",
        "Assistance juridique",
        "Conseil fiscal - Déclaration d'impôts",
        "Comptabilité",
        "Conciergerie",
        "Traduction",
        "Courtier en crédit",
        "Courtier en assurance",
        "Généalogie"
    ],
    "Mode - Santé - Bien être": [
        "Coiffure à domicile",
        "Esthéticienne",
        "Manucure",
        "Relooking",
        "Diététique",
        "Coaching personnel",
        "Astrologue",
        "Hypnose",
        "Magnétiseur",
        "Voyant",
        "Medecine douce"
    ],
    "Sport - Partenaires": [
        "Partenaire tennis",
        "Partenaire squash",
        "Partenaire running - marche",
        "Partenaire natation",
        "Partenaire musculation - fitness",
        "Partenaire nautisme",
        "Partenaire sports de glisse",
        "Partenaire golf",
        "Partenaire Loisirs - Autres sports",
        "Prof de tennis",
        "Coach running",
        "Coach fitness - musculation",
        "Prof de yoga",
        "Cours de golf",
        "Moniteur sport de glisse",
        "Partenaire chasse - pêche",
        "Coach autres sports"
    ],
    "Restauration - Réception": [
        "Cuisinier - Chef à domicile",
        "Traiteur",
        "Sommelier",
        "Gateau d'anniversaire - cake art",
        "Cuisine à emporter - Fruits et légumes",
        "Restauration chez l'habitant",
        "Préparation - nettoyage de salle",
        "Serveur - Maître d'hôtel",
        "Wedding planner - Organisation de fêtes"
    ]
};
