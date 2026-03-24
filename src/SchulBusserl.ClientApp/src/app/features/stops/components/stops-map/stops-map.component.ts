import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import Stop from 'app/features/stops/entities/stop';
import { MapComponent } from 'app/shared/maps/map/map.component';
import { Marker } from 'app/shared/maps/marker';

@Component({
  selector: 'app-stops-map',
  templateUrl: './stops-map.component.html',
  styleUrl: './stops-map.component.scss',
  imports: [MapComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopsMapComponent {
  readonly stops = input.required<Stop[]>();
  readonly selectedStopId = input.required<string | null>();
  readonly stopClicked = output<string | null>();

  protected readonly markers = computed(() =>
    this.stops().map(stop => new Marker(
      stop.id,
      stop.latitude,
      stop.longitude,
      `<strong>${stop.name}</strong><br>${stop.address.street} ${stop.address.houseNumber}, ${stop.address.postalCode} ${stop.address.city}`,
    )),
  );
}
