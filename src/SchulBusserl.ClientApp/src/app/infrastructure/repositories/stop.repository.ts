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
      { id: '1', name: 'Hauptplatz Leibnitz', longitude: 15.5340, latitude: 46.7812, address: { street: 'Hauptplatz', houseNumber: '1', postalCode: '8430', city: 'Leibnitz' } },
      { id: '2', name: 'Bahnhof Deutschlandsberg', longitude: 15.2131, latitude: 46.8139, address: { street: 'Bahnhofstraße', houseNumber: '12', postalCode: '8530', city: 'Deutschlandsberg' } },
      { id: '3', name: 'Schule Wagna', longitude: 15.5561, latitude: 46.7670, address: { street: 'Marktstraße', houseNumber: '8', postalCode: '8435', city: 'Wagna' } },
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
