import { TranslationSchema } from '../types'

export const fr: TranslationSchema = {
  landing: {
    hero: {
      title: "Welkom HOME",
      subtitle: "Expérience de luxe dans le Golfe de Saint-Tropez",
      cta: "Découvrir nos services"
    },
    menu: {
      guests: "Nos Hôtes",
      join: "Nous Rejoindre",
      about: "A propos",
      login: "Se connecter"
    }
  },
  components: {
    contact: {
      title: "Contactez-nous",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer",
      subtitle: "Nous sommes là pour répondre à toutes vos questions et vous accompagner dans votre projet.",
      contact_info: {
        title: "Contactez-nous",
        email: {
          label: "Email",
          value: "contact@welkomhome.com"
        },
        phone: {
          label: "Téléphone",
          value: "+33 6 22 42 37 54"
        },
        address: {
          label: "Adresse",
          value: "123 Avenue des Champs-Élysées, 75008 Paris"
        }
      }
    },
    services: {
      title: "NOS SERVICES",
      subtitle: "Une expérience sur mesure",
      description: "Découvrez notre gamme complète de services haut de gamme, conçue pour répondre à toutes vos attentes et vous offrir une expérience incomparable dans le Golfe de Saint-Tropez.",
      mainServices: "Services principaux",
      services: {
        support: "Service 24/7",
        confidentiality: "Confidentialité garantie",
        concierge: "Conciergerie de luxe",
        properties: "Propriétés d'exception"
      },
      cta: "Découvrir nos services"
    },
    customers: {
      title: "Témoignages de nos clients",
      testimonials: {
        1: {
          text: "Service exceptionnel et personnel très attentionné. Notre séjour était parfait.",
          name: "Sophie M."
        },
        2: {
          text: "Une expérience inoubliable dans une villa magnifique. Merci à toute l'équipe !",
          name: "Pierre L."
        },
        3: {
          text: "Welkom Home a rendu notre séjour magique. Nous reviendrons certainement.",
          name: "Marie D."
        }
      }
    },
    engagement: {
      philosophy: "Notre philosophie",
      title: "L'engagement WelkomHOME",
      trust: {
        title: "Confiance",
        description: "Une relation privilégiée avec nos propriétaires",
        stats: "98%",
        statsLabel: "de satisfaction"
      },
      exclusivity: {
        title: "Exclusivité",
        description: "Des biens d'exception uniquement chez WelkomHOME",
        stats: "200+",
        statsLabel: "propriétés"
      },
      excellence: {
        title: "Excellence",
        description: "Un service premium sur mesure",
        stats: "24/7",
        statsLabel: "disponibilité"
      },
      quote: "Notre engagement est simple : vous offrir une expérience unique dans des propriétés d'exception. Chaque maison est sélectionnée avec soin pour garantir des moments inoubliables."
    },
    lifestyle: {
      title: "Lifestyle",
      panoramic: {
        title: "Vue Panoramique",
        description: "Profitez d'une vue imprenable sur le Golfe de Saint-Tropez depuis votre terrasse. Un cadre exceptionnel pour des moments inoubliables."
      },
      design: {
        title: "Design & Confort",
        description: "Un mobilier soigneusement sélectionné alliant élégance et confort pour une expérience de séjour unique."
      },
      living: {
        title: "Espace de Vie",
        description: "Des espaces de vie lumineux et spacieux, pensés pour votre confort et agencés avec goût."
      },
      kitchen: {
        title: "Cuisine Équipée",
        description: "Des cuisines modernes entièrement équipées pour satisfaire les plus exigeants des chefs amateurs."
      }
    },
    offers: {
      title: "Nos Offres Exclusives"
    }
  }
} 