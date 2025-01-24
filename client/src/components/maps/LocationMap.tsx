'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface LocationMapProps {
  address: string
  latitude: number
  longitude: number
  className?: string
}

export function LocationMap({ address, latitude, longitude, className = '' }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<H.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const platform = new H.service.Platform({
      apikey: process.env.NEXT_PUBLIC_HERE_API_KEY || ''
    })

    const defaultLayers = platform.createDefaultLayers()
    let currentMap: H.Map | null = null

    try {
      const newMap = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom: 15,
          center: { lat: latitude, lng: longitude }
        }
      )

      const marker = new H.map.Marker({ lat: latitude, lng: longitude })
      newMap.addObject(marker)

      new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap))
      H.ui.UI.createDefault(newMap, defaultLayers)

      const handleResize = () => {
        newMap.getViewPort().resize()
      }
      window.addEventListener('resize', handleResize)

      currentMap = newMap
      setMap(newMap)
      setIsLoading(false)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (currentMap) {
          currentMap.dispose()
        }
      }
    } catch (err) {
      console.error('Erreur lors de l\'initialisation de la carte:', err)
      setError('Impossible de charger la carte')
      setIsLoading(false)
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (!map) return

    const marker = new H.map.Marker({ lat: latitude, lng: longitude })
    map.setCenter({ lat: latitude, lng: longitude })
    
    const objects = map.getObjects()
    objects.forEach(obj => map.removeObject(obj))
    map.addObject(marker)
  }, [map, latitude, longitude])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className={className}>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '300px' }}
      />
      <p className="mt-2 text-sm text-gray-500">{address}</p>
    </div>
  )
} 