'use client'

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

declare global {
  interface Window {
    H: any
  }
}

const loadHereMapsScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.H) {
      resolve()
      return
    }

    // Add UI stylesheet
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = 'https://js.api.here.com/v3/3.1/mapsjs-ui.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js'
    script.onload = () => {
      const service = document.createElement('script')
      service.type = 'text/javascript'
      service.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js'
      service.onload = () => {
        const events = document.createElement('script')
        events.type = 'text/javascript'
        events.src = 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js'
        events.onload = () => {
          const ui = document.createElement('script')
          ui.type = 'text/javascript'
          ui.src = 'https://js.api.here.com/v3/3.1/mapsjs-ui.js'
          ui.onload = () => resolve()
          ui.onerror = reject
          document.head.appendChild(ui)
        }
        events.onerror = reject
        document.head.appendChild(events)
      }
      service.onerror = reject
      document.head.appendChild(service)
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

interface MapMarker {
  id: string
  latitude: number
  longitude: number
  title?: string
  description?: string
}

interface MapProps {
  markers: MapMarker[]
  center?: { latitude: number; longitude: number }
  zoom?: number
  onMarkerClick?: (marker: MapMarker) => void
  className?: string
}

interface MapInstance {
  map: H.Map
  objects: H.map.Marker[]
  behavior: H.mapevents.Behavior
  ui: H.ui.UI
}

export function Map({ 
  markers, 
  center,
  zoom = 13,
  onMarkerClick,
  className = ''
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  // Load scripts only once
  useEffect(() => {
    if (!isScriptLoaded) {
      loadHereMapsScript()
        .then(() => {
          setIsScriptLoaded(true)
        })
        .catch((err) => {
          console.error('Error loading HERE Maps:', err)
          setError('Unable to load map')
          setIsLoading(false)
        })
    }
  }, [isScriptLoaded])

  // Initialize map after scripts are loaded
  useEffect(() => {
    if (isScriptLoaded && !mapInstance) {
      initializeMap()
    }

    return () => {
      if (mapInstance) {
        mapInstance.map.dispose()
      }
    }
  }, [isScriptLoaded])

  const initializeMap = () => {
    if (!mapRef.current) return

    try {
      const platform = new window.H.service.Platform({
        apikey: process.env.NEXT_PUBLIC_HERE_API_KEY || ''
      })

      const defaultLayers = platform.createDefaultLayers()
      
      const map = new window.H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom,
          center: { 
            lat: center?.latitude || markers[0]?.latitude || 48.8566,
            lng: center?.longitude || markers[0]?.longitude || 2.3522
          }
        }
      )

      const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map))
      const ui = window.H.ui.UI.createDefault(map, defaultLayers)

      setMapInstance({
        map,
        objects: [],
        behavior,
        ui
      })
      setIsLoading(false)
    } catch (err) {
      console.error('Error initializing map:', err)
      setError('Unable to load map')
      setIsLoading(false)
    }
  }

  // Update markers when they change
  useEffect(() => {
    if (mapInstance) {
      updateMarkers()
    }
  }, [mapInstance, markers])

  // Update viewport when center or zoom changes
  useEffect(() => {
    if (mapInstance) {
      updateViewport()
    }
  }, [mapInstance, center, zoom])

  const updateMarkers = () => {
    if (!mapInstance) return

    // Remove existing markers
    mapInstance.objects.forEach(marker => {
      mapInstance.map.removeObject(marker)
    })

    // Add new markers
    const newMarkers = markers.map(markerData => {
      const marker = new window.H.map.Marker({
        lat: markerData.latitude,
        lng: markerData.longitude
      })

      if (onMarkerClick) {
        marker.addEventListener('tap', () => onMarkerClick(markerData))
      }

      mapInstance.map.addObject(marker)
      return marker
    })

    setMapInstance(prev => prev ? {
      ...prev,
      objects: newMarkers
    } : null)
  }

  const updateViewport = () => {
    if (!mapInstance) return

    mapInstance.map.setCenter({
      lat: center?.latitude || markers[0]?.latitude || 48.8566,
      lng: center?.longitude || markers[0]?.longitude || 2.3522
    })
    mapInstance.map.setZoom(zoom)
  }

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
    <div 
      ref={mapRef}
      className={`w-full h-full min-h-[400px] rounded-lg overflow-hidden ${className}`}
    />
    
  )
} 