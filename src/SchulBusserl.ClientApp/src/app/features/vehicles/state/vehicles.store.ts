import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Loadables } from 'app/shared/entities/loadable';
import { VehicleRepository } from 'app/infrastructure/repositories/vehicle.repository';
import { VehiclesState, initialVehiclesState } from 'app/features/vehicles/state/vehicles.state';
import { catchApplicationError, processConfirmationDialogSubmission, processFormDialogSubmission } from 'app/shared/utils/rx.operators';
import { CreateVehicleDialogContext, CreateVehicleDialogFormValue } from 'app/features/vehicles/components/create-vehicle-dialog/create-vehicle-dialog.store';
import NewVehicle from 'app/features/vehicles/entities/new-vehicle';
import Vehicle from 'app/features/vehicles/entities/vehicle';
import UpdatedVehicle from 'app/features/vehicles/entities/updated-vehicle';
import { UpdateVehicleDialogContext, UpdateVehicleDialogFormValue } from 'app/features/vehicles/components/update-vehicle-dialog/update-vehicle-dialog.store';
import { DeleteVehicleDialogContext } from 'app/features/vehicles/components/delete-vehicle-dialog/delete-vehicle-dialog.store';
import { AccountingPeriodsStore } from 'app/features/accounting-periods/state/accounting-periods.store';

export const VehiclesStore = signalStore(
  { },
  withState<VehiclesState>(initialVehiclesState),
  withMethods(
    (store, vehicleRepository = inject(VehicleRepository)) => ({
      getVehicles: rxMethod<string | null>(
        pipe(
          tap(() => patchState(store, { vehicles: Loadables.loading() })),
          switchMap(accountingPeriodId =>
            vehicleRepository.getVehicles(accountingPeriodId).pipe(
              tap(vehicles => patchState(
                store,
                {
                  vehicles: Loadables.success(vehicles),
                },
              )),
              catchApplicationError(error => patchState(store, { vehicles: Loadables.error(error) })))))),
      createVehicle: processFormDialogSubmission<CreateVehicleDialogContext, CreateVehicleDialogFormValue, Vehicle>(
        (_, value) => vehicleRepository.create(new NewVehicle(value.name, value.licensePlate, value.numberOfPassengerSeats)),
        vehicle => patchState(
          store,
          {
            vehicles: Loadables.success([...(store.vehicles().value ?? []), vehicle]),
          },
        )),
      updateVehicle: processFormDialogSubmission<UpdateVehicleDialogContext, UpdateVehicleDialogFormValue, Vehicle>(
        (context, value) => vehicleRepository.update(new UpdatedVehicle(context.id, value.name, value.licensePlate, value.numberOfPassengerSeats)),
        vehicle => patchState(
          store,
          {
            vehicles: Loadables.success((store.vehicles().value ?? []).map(v => v.id === vehicle.id ? vehicle : v)),
          },
        )),
      deleteVehicle: processConfirmationDialogSubmission<DeleteVehicleDialogContext>(
        context => vehicleRepository.delete(context.vehicle.id),
        context => {
          const remaining = (store.vehicles().value ?? []).filter(vehicle => vehicle.id !== context.vehicle.id);
          patchState(
            store,
            {
              vehicles: Loadables.success(remaining),
            },
          );
        }),
    }),
  ),
  withHooks(
    (store, accountingPeriodsStore = inject(AccountingPeriodsStore)) => ({
      onInit() {
        store.getVehicles(accountingPeriodsStore.selectedAccountingPeriodId);
      },
    }),
  ),
);
