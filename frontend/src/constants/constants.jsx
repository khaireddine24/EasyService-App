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
        link:'/Register'
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