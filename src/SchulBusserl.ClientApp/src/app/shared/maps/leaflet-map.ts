import * as L from 'leaflet';
import { Marker } from 'app/shared/maps/marker';

const TILE_SERVER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const MAXIMUM_ZOOM = 19;

function createMarkerIcon(cssColorVariable: string): L.DivIcon {
  return L.divIcon({
    className: 'map-marker',
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="-1 -1 27 43">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0Z"
        fill="var(${cssColorVariable})" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
      <circle cx="12.5" cy="12.5" r="4.5" fill="white" opacity="0.9"/>
    </svg>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

const defaultIcon = createMarkerIcon('--app-primary');
const selectedIcon = createMarkerIcon('--app-secondary');

export class LeafletMap {
  private readonly map: L.Map;
  private readonly markers = new Map<string, L.Marker>();

  public onMarkerClick: ((markerId: string) => void) | null = null;
  public onMapClick: (() => void) | null = null;
  public onTileError: (() => void) | null = null;

  constructor(container: HTMLElement) {
    this.map = L.map(container);

    const tileLayer = L.tileLayer(TILE_SERVER_URL, {
      maxZoom: MAXIMUM_ZOOM,
      attribution: TILE_ATTRIBUTION,
    });
    tileLayer.addTo(this.map);

    tileLayer.on('tileerror', () => {
      this.onTileError?.();
    });

    this.map.on('click', () => {
      this.onMapClick?.();
    });
  }

  public setMarkers(markers: Marker[], selectedMarkerId: string | null): void {
    this.removeAllMarkers();
    for (const mapMarker of markers) {
      const leafletMarker = L.marker(
        [mapMarker.latitude, mapMarker.longitude],
        { icon: mapMarker.id === selectedMarkerId ? selectedIcon : defaultIcon },
      );

      leafletMarker.bindTooltip(mapMarker.tooltip);

      leafletMarker.on('click', (event: L.LeafletEvent) => {
        L.DomEvent.stopPropagation(event as L.LeafletMouseEvent);
        this.onMarkerClick?.(mapMarker.id);
      });

      leafletMarker.addTo(this.map);
      this.markers.set(mapMarker.id, leafletMarker);
    }
  }

  public removeAllMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers.clear();
  }

  public selectMarker(markerId: string | null): void {
    this.markers.forEach((marker, id) => {
      marker.setIcon(id === markerId ? selectedIcon : defaultIcon);
    });

    if (markerId != null) {
      const marker = this.markers.get(markerId);
      if (marker != null) {
        this.map.panTo(marker.getLatLng());
      }
    }
  }

  public destroy(): void {
    this.map.remove();
  }

  public zoomAndPanToFitMarkers(): void {
    if (this.markers.size === 0) {
      return;
    }

    const bounds = L.latLngBounds(
      Array.from(this.markers.values()).map(marker => marker.getLatLng()),
    );
    this.map.fitBounds(bounds, { padding: [40, 40] });
  }
}
