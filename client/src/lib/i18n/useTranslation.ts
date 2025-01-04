import { useCallback } from 'react'
import { fr } from './locales/fr'
import { en } from './locales/en'
import type { Language, TranslationSchema } from './types'

const translations: Record<Language, TranslationSchema> = {
  fr,
  en,
}

export function useTranslation(locale: Language = 'fr') {
  const t = useCallback((key: string) => {
    const keys = key.split('.')
    let value: any = translations[locale]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key} in locale ${locale}`)
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }, [locale])

  return { t }
} 