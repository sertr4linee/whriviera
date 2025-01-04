export type TranslationSchema = {
  landing: {
    hero: {
      title: string
      subtitle: string
      cta: string
    }
    menu: {
      guests: string
      join: string
      about: string
      login: string
    }
  }
  components: {
    contact: {
      title: string
      name: string
      email: string
      message: string
      send: string
      subtitle: string
      contact_info: {
        title: string
        email: {
          label: string
          value: string
        }
        phone: {
          label: string
          value: string
        }
        address: {
          label: string
          value: string
        }
      }
    }
    services: {
      title: string
      subtitle: string
      description: string
      mainServices: string
      services: {
        support: string
        confidentiality: string
        concierge: string
        properties: string
      }
      cta: string
    }
    customers: {
      title: string
      testimonials: {
        1: {
          text: string
          name: string
        }
        2: {
          text: string
          name: string
        }
        3: {
          text: string
          name: string
        }
      }
    }
    engagement: {
      philosophy: string
      title: string
      trust: {
        title: string
        description: string
        stats: string
        statsLabel: string
      }
      exclusivity: {
        title: string
        description: string
        stats: string
        statsLabel: string
      }
      excellence: {
        title: string
        description: string
        stats: string
        statsLabel: string
      }
      quote: string
    }
    lifestyle: {
      title: string
      panoramic: {
        title: string
        description: string
      }
      design: {
        title: string
        description: string
      }
      living: {
        title: string
        description: string
      }
      kitchen: {
        title: string
        description: string
      }
    }
    offers: {
      title: string
    }
  }
}

export type Language = 'fr' | 'en'
export type TranslationKey = keyof TranslationSchema 