'use client'

import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { useState, useEffect } from 'react'

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div> // ou votre composant de loading
  }

  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
} 