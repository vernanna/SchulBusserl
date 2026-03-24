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
import { LeafletMap } from 'app/shared/maps/leaflet-map';
import { Marker } from 'app/shared/maps/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  private readonly mapContainer = viewChild.required<ElementRef<HTMLElement>>('map');
  private readonly destroyRef = inject(DestroyRef);

  private leafletMap: LeafletMap | null = null;

  protected readonly mapIsAvailable = signal(true);

  readonly markers = input<Marker[]>([]);
  readonly selectedMarkerId = input<string | null>(null);
  readonly markerClicked = output<string | null>();

  constructor() {
    effect(() => {
      if (this.mapIsAvailable()) {
        this.leafletMap?.setMarkers(this.markers(), this.selectedMarkerId());
        this.leafletMap?.zoomAndPanToFitMarkers();
      } else {
        this.leafletMap?.removeAllMarkers();
      }
    });

    effect(() => {
      const selectedId = this.selectedMarkerId();
      this.leafletMap?.selectMarker(selectedId);
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    try {
      this.leafletMap = new LeafletMap(this.mapContainer().nativeElement);

      this.leafletMap.onMarkerClick = markerId => this.markerClicked.emit(markerId);
      this.leafletMap.onMapClick = () => this.markerClicked.emit(null);
      this.leafletMap.onTileError = () => this.mapIsAvailable.set(false);

      this.leafletMap.setMarkers(this.markers(), this.selectedMarkerId());
      this.leafletMap.zoomAndPanToFitMarkers();

      this.destroyRef.onDestroy(() => {
        this.leafletMap?.destroy();
        this.leafletMap = null;
      });
    } catch {
      this.mapIsAvailable.set(false);
    }
  }
}
