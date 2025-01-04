'use client'

import { useEffect, useRef, useState } from 'react'

interface MapProps {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  markers?: Array<{
    position: {
      lat: number
      lng: number
    }
    title: string
  }>
}

declare global {
  interface Window {
    H: any
  }
}

const SCRIPTS = [
  { id: 'here-core', src: 'https://js.api.here.com/v3/3.1/mapsjs-core.js' },
  { id: 'here-service', src: 'https://js.api.here.com/v3/3.1/mapsjs-service.js' },
  { id: 'here-events', src: 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js' },
  { id: 'here-ui', src: 'https://js.api.here.com/v3/3.1/mapsjs-ui.js' }
]

const CSS = {
  id: 'here-ui-css',
  href: 'https://js.api.here.com/v3/3.1/mapsjs-ui.css'
}

export function Map({ center, zoom, markers }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const mapObjects = useRef<{
    map?: any
    platform?: any
    behavior?: any
    ui?: any
    markers: any[]
  }>({
    markers: []
  })

  // Fonction pour charger les scripts de manière séquentielle
  const loadScripts = async () => {
    try {
      // Vérifier si les scripts sont déjà chargés
      if (window.H) return true

      // Ajouter le CSS
      if (!document.getElementById(CSS.id)) {
        const link = document.createElement('link')
        link.id = CSS.id
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = CSS.href
        document.head.appendChild(link)
      }

      // Charger les scripts de manière séquentielle
      for (const script of SCRIPTS) {
        if (!document.getElementById(script.id)) {
          await new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script')
            scriptElement.id = script.id
            scriptElement.src = script.src
            scriptElement.async = true
            scriptElement.onload = resolve
            scriptElement.onerror = reject
            document.head.appendChild(scriptElement)
          })
        }
      }

      return true
    } catch (error) {
      console.error('Erreur lors du chargement des scripts HERE Maps:', error)
      setError('Erreur lors du chargement de la carte')
      return false
    }
  }

  // Initialiser la carte
  const initializeMap = () => {
    if (!mapRef.current || mapObjects.current.map) return

    try {
      // Créer la plateforme HERE
      mapObjects.current.platform = new window.H.service.Platform({
        apikey: process.env.NEXT_PUBLIC_HERE_API_KEY
      })

      const layers = mapObjects.current.platform.createDefaultLayers()

      // Créer la carte
      mapObjects.current.map = new window.H.Map(
        mapRef.current,
        layers.raster.normal.map,
        {
          center,
          zoom,
          pixelRatio: window.devicePixelRatio || 1
        }
      )

      // Ajouter les contrôles d'interaction
      mapObjects.current.behavior = new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(mapObjects.current.map)
      )

      // Ajouter les contrôles UI
      mapObjects.current.ui = new window.H.ui.UI(mapObjects.current.map, layers)

      // Gérer le redimensionnement
      const handleResize = () => mapObjects.current.map.getViewPort().resize()
      window.addEventListener('resize', handleResize)

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize)
        if (mapObjects.current.map) {
          mapObjects.current.map.dispose()
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error)
      setError('Erreur lors de l\'initialisation de la carte')
    }
  }

  // Gérer les marqueurs
  const updateMarkers = () => {
    if (!mapObjects.current.map) return

    // Supprimer les marqueurs existants
    mapObjects.current.markers.forEach(marker => {
      mapObjects.current.map.removeObject(marker)
    })
    mapObjects.current.markers = []

    // Ajouter les nouveaux marqueurs
    if (markers?.length) {
      markers.forEach(({ position, title }) => {
        const marker = new window.H.map.Marker(position)
        mapObjects.current.map.addObject(marker)
        mapObjects.current.markers.push(marker)
      })
    }
  }

  // Mettre à jour le centre et le zoom
  const updateViewport = () => {
    if (!mapObjects.current.map) return

    mapObjects.current.map.setCenter(center)
    mapObjects.current.map.setZoom(zoom)
  }

  // Effet pour charger les scripts et initialiser la carte
  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      const scriptsLoaded = await loadScripts()
      if (scriptsLoaded) {
        initializeMap()
      }
      setIsLoading(false)
    }

    init()
  }, [])

  // Effet pour mettre à jour les marqueurs
  useEffect(() => {
    if (!isLoading && !error) {
      updateMarkers()
    }
  }, [markers, isLoading, error])

  // Effet pour mettre à jour le viewport
  useEffect(() => {
    if (!isLoading && !error) {
      updateViewport()
    }
  }, [center, zoom, isLoading, error])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500">
        {error}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        Chargement de la carte...
      </div>
    )
  }

  return <div ref={mapRef} className="w-full h-full" />
} 