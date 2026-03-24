import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import * as L from 'leaflet';

const TILE_SERVER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const MAXIMUM_ZOOM = 19;
const DEFAULT_ZOOM = 12;
const DEFAULT_LATITUDE = 46.78;
const DEFAULT_LONGITUDE = 15.53;

function createDraggableMarkerIcon(): L.DivIcon {
  return L.divIcon({
    className: 'map-marker',
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="-1 -1 27 43">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0Z"
        fill="var(--app-primary)" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
      <circle cx="12.5" cy="12.5" r="4.5" fill="white" opacity="0.9"/>
    </svg>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
}

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrl: './location-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPickerComponent implements AfterViewInit {
  private readonly mapContainer = viewChild.required<ElementRef<HTMLElement>>('map');
  private readonly destroyRef = inject(DestroyRef);

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  protected readonly mapIsAvailable = signal(true);

  readonly latitude = input(DEFAULT_LATITUDE);
  readonly longitude = input(DEFAULT_LONGITUDE);
  readonly locationChanged = output<{ latitude: number; longitude: number; }>();

  constructor() {
    effect(() => {
      const latitude = this.latitude();
      const longitude = this.longitude();
      if (this.marker != null) {
        const currentLatLng = this.marker.getLatLng();
        if (currentLatLng.lat !== latitude || currentLatLng.lng !== longitude) {
          this.marker.setLatLng([latitude, longitude]);
          this.map?.panTo([latitude, longitude]);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    try {
      const latitude = this.latitude();
      const longitude = this.longitude();

      this.map = L.map(this.mapContainer().nativeElement).setView([latitude, longitude], DEFAULT_ZOOM);

      const tileLayer = L.tileLayer(TILE_SERVER_URL, {
        maxZoom: MAXIMUM_ZOOM,
        attribution: TILE_ATTRIBUTION,
      });
      tileLayer.addTo(this.map);

      tileLayer.on('tileerror', () => {
        this.mapIsAvailable.set(false);
      });

      this.marker = L.marker([latitude, longitude], {
        icon: createDraggableMarkerIcon(),
        draggable: true,
      }).addTo(this.map);

      this.marker.on('dragend', () => {
        const position = this.marker!.getLatLng();
        this.locationChanged.emit({
          latitude: Math.round(position.lat * 10000) / 10000,
          longitude: Math.round(position.lng * 10000) / 10000,
        });
      });

      this.destroyRef.onDestroy(() => {
        this.map?.remove();
        this.map = null;
        this.marker = null;
      });
    } catch {
      this.mapIsAvailable.set(false);
    }
  }
}
