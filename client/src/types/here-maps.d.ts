declare namespace H {
  interface MapEvents {
    addEventListener(eventType: string, handler: (event: Event) => void): void;
    removeEventListener(eventType: string, handler: (event: Event) => void): void;
  }

  interface ViewPort {
    resize(): void;
  }

  class Map {
    constructor(container: HTMLElement, layers: DefaultLayers['vector']['normal']['map'], options?: MapOptions);
    setCenter(point: { lat: number; lng: number }): void;
    setZoom(zoom: number): void;
    addObject(object: MapObject): void;
    removeObject(object: MapObject): void;
    getCenter(): { lat: number; lng: number };
    getZoom(): number;
    getObjects(): MapObject[];
    getViewPort(): ViewPort;
    dispose(): void;
    addEventListener(eventType: string, handler: (event: Event) => void): void;
    removeEventListener(eventType: string, handler: (event: Event) => void): void;
  }

  interface Platform {
    createDefaultLayers(): DefaultLayers;
  }

  interface DefaultLayers {
    vector: {
      normal: {
        map: object;
      };
    };
  }

  type MapObjectType = 'Marker' | 'Circle' | 'Polyline' | 'Polygon';

  interface MapObject {
    type: MapObjectType;
    setGeometry(geometry: Point | LineString | Polygon): void;
    setVisibility(visible: boolean): void;
    setData(data: Record<string, unknown>): void;
    getData(): Record<string, unknown>;
    setStyle(style: Style): void;
  }

  interface Style {
    strokeColor?: string;
    fillColor?: string;
    lineWidth?: number;
    lineDash?: number[];
  }

  interface Point {
    lat: number;
    lng: number;
  }

  interface LineString {
    points: Point[];
  }

  interface Polygon {
    points: Point[];
  }

  interface Event {
    type: string;
    target: MapObject;
    currentTarget: Map;
  }

  namespace service {
    class Platform {
      constructor(config: PlatformConfig);
      createDefaultLayers(): DefaultLayers;
    }
  }

  namespace map {
    class Marker implements MapObject {
      constructor(coords: { lat: number; lng: number });
      type: MapObjectType;
      setGeometry(geometry: Point | LineString | Polygon): void;
      setVisibility(visible: boolean): void;
      setData(data: Record<string, unknown>): void;
      getData(): Record<string, unknown>;
      setStyle(style: Style): void;
    }
  }

  namespace mapevents {
    class Behavior {
      constructor(events: MapEvents);
    }
    class MapEvents {
      constructor(map: Map);
    }
  }

  namespace ui {
    class UI {
      static createDefault(map: Map, layers: DefaultLayers): UI;
    }
  }

  interface Service {
    service: typeof service;
    map: typeof map;
    mapevents: typeof mapevents;
    ui: typeof ui;
    Map: typeof Map;
  }

  interface PlatformConfig {
    apikey: string;
    app_id?: string;
    app_code?: string;
    useHTTPS?: boolean;
  }

  interface MapOptions {
    zoom?: number;
    center?: {
      lat: number;
      lng: number;
    };
  }

  interface SearchResult {
    Response: {
      View: Array<{
        Result: Array<{
          Location: {
            Address: {
              Label: string;
            };
            DisplayPosition: {
              Latitude: number;
              Longitude: number;
            };
          };
        }>;
      }>;
    };
  }

  interface GeocodingResult {
    items: Array<{
      title: string;
      id: string;
      resultType: string;
      address: {
        label: string;
      };
      position: {
        lat: number;
        lng: number;
      };
    }>;
  }
}

declare const H: H.Service; 