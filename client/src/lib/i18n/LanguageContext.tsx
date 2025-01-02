"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Language } from './useTranslation'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
      setLanguageState(storedLanguage as Language)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (isClient) {
      localStorage.setItem('language', lang)
    }
  }

  if (!isClient) {
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