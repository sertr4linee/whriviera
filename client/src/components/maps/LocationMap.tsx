'use client'

import { useEffect, useRef, useState } from 'react'

interface LocationMapProps {
  lat: number
  lng: number
  address: string
}

export function LocationMap({ lat, lng, address }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<H.Map | null>(null)

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || typeof H === 'undefined' || !H.service || !H.service.Platform) return

      try {
        // Initialiser la plateforme HERE
        const platform = new H.service.Platform({
          apikey: process.env.NEXT_PUBLIC_HERE_API_KEY as string
        })

        // Créer la carte
        const defaultLayers = platform.createDefaultLayers()
        const mapInstance = new H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            center: { lat, lng },
            zoom: 15,
            pixelRatio: window.devicePixelRatio || 1
          }
        )

        // Ajouter les contrôles
        new H.mapevents.Behavior(new H.mapevents.MapEvents(mapInstance))
        H.ui.UI.createDefault(mapInstance, defaultLayers)

        // Ajouter le marqueur
        const marker = new H.map.Marker({ lat, lng })
        mapInstance.addObject(marker)

        // Gérer le redimensionnement
        window.addEventListener('resize', () => {
          if (mapInstance && mapInstance.getViewPort()) {
            mapInstance.getViewPort().resize()
          }
        })

        setMap(mapInstance)
      } catch (err) {
        console.error('Erreur d\'initialisation de la carte:', err)
      }
    }

    const waitForHere = () => {
      if (typeof H !== 'undefined' && H.service && H.service.Platform) {
        initMap()
      } else {
        setTimeout(waitForHere, 100)
      }
    }

    waitForHere()

    return () => {
      if (map) {
        map.dispose()
      }
    }
  }, [lat, lng])

  return (
    <div className="space-y-2">
      <div ref={mapRef} className="h-[300px] w-full rounded-md border" />
      <p className="text-sm text-muted-foreground">{address}</p>
    </div>
  )
} 