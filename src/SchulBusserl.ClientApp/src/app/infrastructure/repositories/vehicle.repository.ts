import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Vehicle from 'app/features/vehicles/entities/vehicle';
import { ApiService } from 'app/infrastructure/api.service';
import { Vehicle as ApiVehicle } from 'app/features/vehicles/entities/api-vehicle';
import NewVehicle from 'app/features/vehicles/entities/new-vehicle';
import UpdatedVehicle from 'app/features/vehicles/entities/updated-vehicle';
import { resourceWithUrlParameters } from 'app/shared/utils/string-utils';

@Injectable({ providedIn: 'root' })
export class VehicleRepository {
  private readonly apiService = inject(ApiService);

  getVehicles(accountingPeriodId: string | null): Observable<Vehicle[]> {
    return of([
      { id: '1', name: 'Schulbus 1', licensePlate: 'KR-SB 101', numberOfPassengerSeats: 45 },
      { id: '2', name: 'Schulbus 2', licensePlate: 'KR-SB 102', numberOfPassengerSeats: 30 },
      { id: '3', name: 'Kleinbus 1', licensePlate: 'KR-SB 201', numberOfPassengerSeats: 18 },
    ]);

    // todo vk: use real value as soon as backend is available
    return this.apiService.get<ApiVehicle[]>(resourceWithUrlParameters('vehicles', { accountingPeriodId }));
  }

  create(vehicle: NewVehicle): Observable<Vehicle> {
    return of({ id: '4', name: vehicle.name, licensePlate: vehicle.licensePlate, numberOfPassengerSeats: vehicle.numberOfPassengerSeats });

    // todo vk: use real value as soon as backend is available
    return this.apiService.post<ApiVehicle>('vehicles', vehicle);
  }

  update(vehicle: UpdatedVehicle): Observable<Vehicle> {
    return of({ id: vehicle.id, name: vehicle.name, licensePlate: vehicle.licensePlate, numberOfPassengerSeats: vehicle.numberOfPassengerSeats });

    // todo vk: use real value as soon as backend is available
    return this.apiService.patch<ApiVehicle>('vehicles', vehicle);
  }

  delete(id: string): Observable<void> {
    return of(undefined);

    // todo vk: use real value as soon as backend is available
    return this.apiService.delete(resourceWithUrlParameters('vehicles', { id }));
  }
}
