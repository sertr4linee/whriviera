import { useCallback } from 'react'
import { fr } from './locales/fr'
import { en } from './locales/en'

const translations = {
  fr,
  en,
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof fr

type NestedTranslations = {
  [key: string]: string | NestedTranslations
}

export function useTranslation(locale: Language = 'fr') {
  const t = useCallback((key: string) => {
    const keys = key.split('.')
    let value: string | NestedTranslations = translations[locale]
    
    for (const k of keys) {
      if (typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }, [locale])

  return { t }
} 