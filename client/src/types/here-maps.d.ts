declare namespace H {
  namespace geo {
    class Point {
      lat: number
      lng: number
      constructor(lat: number, lng: number)
    }
  }

  interface MapOptions {
    center: { lat: number; lng: number }
    zoom: number
    pixelRatio?: number
    padding?: { top: number; right: number; bottom: number; left: number }
  }

  class Map {
    constructor(element: HTMLElement, layer: any, options: MapOptions)
    setCenter(point: { lat: number; lng: number }): void
    addObject(object: any): void
    getViewPort(): { resize: () => void }
    dispose(): void
    addEventListener(eventName: string, handler: (event: any) => void): void
    screenToGeo(x: number, y: number): H.geo.Point
  }

  namespace service {
    interface LayerOptions {
      tileSize?: number
      ppi?: number
    }

    interface Platform {
      createDefaultLayers(options?: LayerOptions): any
      getGeocodingService(): GeocodingService
    }

    class Platform {
      constructor(options: { apikey: string })
      createDefaultLayers(options?: LayerOptions): any
      getGeocodingService(): GeocodingService
    }

    class GeocodingService {
      geocode(
        params: { 
          searchText: string; 
          jsonattributes?: number;
          country?: string;
        },
        onSuccess: (result: any) => void,
        onError: (error: any) => void
      ): void
      reverseGeocode(
        params: { 
          prox: string;
          mode: string;
          maxresults: number;
          jsonattributes: number;
        },
        onSuccess: (result: any) => void,
        onError: (error: any) => void
      ): void
    }
  }

  namespace map {
    interface MarkerOptions {
      volatility?: boolean
      draggable?: boolean
    }

    class Marker {
      constructor(point: { lat: number; lng: number }, options?: MarkerOptions)
      setGeometry(point: { lat: number; lng: number }): void
      addEventListener(eventName: string, handler: (event: any) => void): void
      getGeometry(): H.geo.Point
    }
  }

  namespace mapevents {
    class Behavior {
      constructor(events: MapEvents)
      disable(): void
      enable(): void
    }

    class MapEvents {
      constructor(map: Map)
    }
  }

  namespace ui {
    interface Control {
      setAlignment(alignment: string): void
    }

    class UI {
      static createDefault(map: Map, layers: any): UI
      getControl(name: string): Control
    }
  }
} 