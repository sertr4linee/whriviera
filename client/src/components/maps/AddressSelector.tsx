'use client'

import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface AddressSelectorProps {
  onAddressSelect: (address: { 
    Address: string;
    Latitude: number;
    Longitude: number;
    Street?: string;
    City?: string;
    PostalCode?: string;
    Country?: string;
  }) => void
  defaultAddress?: string
}

interface Suggestion {
  title: string
  address: string
  position: { lat: number; lng: number }
  details: {
    street?: string
    city?: string
    postalCode?: string
    country?: string
  }
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function AddressSelector({ onAddressSelect, defaultAddress }: AddressSelectorProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [searchValue, setSearchValue] = useState(defaultAddress || '')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearchValue = useDebounce(searchValue, 300)

  useEffect(() => {
    const searchAddress = async () => {
      if (!debouncedSearchValue.trim() || debouncedSearchValue.length < 3) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const apiKey = process.env.NEXT_PUBLIC_HERE_API_KEY
        const response = await fetch(
          `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
            debouncedSearchValue
          )}&apiKey=${apiKey}&in=countryCode:FRA&limit=5`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Réponse de l\'API HERE:', data)
        
        const newSuggestions = data.items.map((item: any) => {
          console.log('Item d\'adresse:', item)
          // S'assurer que nous avons une rue valide
          const street = item.address.street || item.address.label.split(',')[0]
          return {
            title: street,
            address: item.address.label,
            position: {
              lat: item.position.lat,
              lng: item.position.lng
            },
            details: {
              street: street,
              city: item.address.city || '',
              postalCode: item.address.postalCode || '',
              country: 'France'
            }
          }
        })

        console.log('Suggestions formatées:', newSuggestions)
        setSuggestions(newSuggestions)
        setShowSuggestions(newSuggestions.length > 0)
      } catch (err) {
        console.error('Erreur lors de la recherche:', err)
        setError('Erreur lors de la recherche d\'adresses')
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setIsLoading(false)
      }
    }

    searchAddress()
  }, [debouncedSearchValue])

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setSearchValue(suggestion.address)
    // Formatage de l'adresse pour correspondre exactement au modèle attendu par l'API
    const addressData = {
      Address: suggestion.address,
      Latitude: Number(suggestion.position.lat.toFixed(6)),
      Longitude: Number(suggestion.position.lng.toFixed(6)),
      Street: suggestion.details.street || '',
      City: suggestion.details.city || '',
      PostalCode: suggestion.details.postalCode || '',
      Country: 'France'
    }
    
    console.log('Données d\'adresse sélectionnées:', addressData)
    onAddressSelect(addressData)
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    // Petit délai pour permettre le clic sur une suggestion
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="address">Adresse</Label>
      <div className="relative">
        <Input
          type="text"
          id="address"
          placeholder="Rechercher une adresse..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={`w-full ${isLoading ? 'pr-10' : ''}`}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent" />
          </div>
        )}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
            <ul className="py-1 max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{suggestion.title}</span>
                    <span className="text-sm text-gray-500">{suggestion.address}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
} 