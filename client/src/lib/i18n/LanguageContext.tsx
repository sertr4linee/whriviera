"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Language } from './useTranslation'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const DEFAULT_LANGUAGE: Language = 'fr'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage && (storedLanguage === 'fr' || storedLanguage === 'en')) {
      setLanguageState(storedLanguage as Language)
    } else {
      localStorage.setItem('language', DEFAULT_LANGUAGE)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 