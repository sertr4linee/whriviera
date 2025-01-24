import { translations } from './translations'
import { create } from 'zustand'

type Language = 'fr' | 'en'

interface I18nStore {
    language: Language
    setLanguage: (language: Language) => void
    t: (key: string) => string
}

export const useI18n = create<I18nStore>((set, get) => ({
    language: 'fr',
    setLanguage: (language) => set({ language }),
    t: (key: string) => {
        const { language } = get()
        const keys = key.split('.')
        let current: any = translations[language]
        
        for (const k of keys) {
            if (current[k] === undefined) {
                console.warn(`Translation missing for key: ${key} in language: ${language}`)
                return key
            }
            current = current[k]
        }
        
        return current
    }
})) 