'use client'

import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDebounce } from '@/lib/hooks/useDebounce'

export interface Address {
  title: string
  id: string
  position: {
    lat: number
    lng: number
  }
  address: {
    label: string
  }
}

interface AddressSelectorProps {
  onSelect: (address: Address) => void
  defaultValue?: string
  className?: string
}

export function AddressSelector({ onSelect, defaultValue = '', className = '' }: AddressSelectorProps) {
  const [query, setQuery] = useState(defaultValue)
  const [results, setResults] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      return
    }

    const searchAddress = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(debouncedQuery)}&apiKey=${process.env.NEXT_PUBLIC_HERE_API_KEY}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch address suggestions')
        }

        const data = await response.json()
        setResults(data.items || [])
      } catch (err) {
        console.error('Error fetching address suggestions:', err)
        setError('Failed to load address suggestions')
      } finally {
        setIsLoading(false)
      }
    }

    searchAddress()
  }, [debouncedQuery])

  return (
    <div className={className}>
      <Input
        type="text"
        placeholder="Enter an address..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-2"
      />
      
      {error && (
        <p className="text-sm text-red-500 mb-2">{error}</p>
      )}

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading suggestions...</p>
      ) : (
        <div className="space-y-2">
          {results.map((result) => (
            <Button
              key={result.id}
              variant="ghost"
              className="w-full justify-start text-left"
              onClick={() => onSelect(result)}
            >
              {result.address.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
} 