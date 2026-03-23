import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Stop from 'app/features/stops/entities/stop';
import { ApiService } from 'app/infrastructure/api.service';
import { Stop as ApiStop } from 'app/infrastructure/entities/stop';
import NewStop from 'app/features/stops/entities/new-stop';
import UpdatedStop from 'app/features/stops/entities/updated-stop';
import { resourceWithUrlParameters } from 'app/shared/utils/string-utils';

@Injectable({ providedIn: 'root' })
export class StopRepository {
  private readonly apiService = inject(ApiService);

  getStops(accountingPeriodId: string | null): Observable<Stop[]> {
    return of([
      { id: '1', name: 'Hauptplatz', longitude: 13.8558, latitude: 46.6103, address: { street: 'Hauptplatz', houseNumber: '1', postalCode: '9500', city: 'Villach' } },
      { id: '2', name: 'Bahnhof', longitude: 13.8494, latitude: 46.6117, address: { street: 'Bahnhofstraße', houseNumber: '15', postalCode: '9500', city: 'Villach' } },
      { id: '3', name: 'Schule Landskron', longitude: 13.8412, latitude: 46.6350, address: { street: 'Schulweg', houseNumber: '3', postalCode: '9523', city: 'Landskron' } },
    ]);

    // todo vk: use real value as soon as backend is available
    return this.apiService.get<ApiStop[]>(resourceWithUrlParameters('stops', { accountingPeriodId }));
  }

  create(stop: NewStop): Observable<Stop> {
    return of({ id: '4', name: stop.name, longitude: stop.longitude, latitude: stop.latitude, address: stop.address });

    // todo vk: use real value as soon as backend is available
    return this.apiService.post<ApiStop>('stops', stop);
  }

  update(stop: UpdatedStop): Observable<Stop> {
    return of({ id: stop.id, name: stop.name, longitude: stop.longitude, latitude: stop.latitude, address: stop.address });

    // todo vk: use real value as soon as backend is available
    return this.apiService.patch<ApiStop>('stops', stop);
  }

  delete(id: string): Observable<void> {
    return of(undefined);

    // todo vk: use real value as soon as backend is available
    return this.apiService.delete(resourceWithUrlParameters('stops', { id }));
  }
}
