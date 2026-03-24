import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Loadables } from 'app/shared/entities/loadable';
import { StopRepository } from 'app/infrastructure/repositories/stop.repository';
import { StopsState, initialStopsState } from 'app/features/stops/state/stops.state';
import { catchApplicationError, processConfirmationDialogSubmission, processFormDialogSubmission } from 'app/shared/utils/rx.operators';
import { CreateStopDialogContext, CreateStopDialogFormValue } from 'app/features/stops/components/create-stop-dialog/create-stop-dialog.store';
import NewStop from 'app/features/stops/entities/new-stop';
import Stop from 'app/features/stops/entities/stop';
import UpdatedStop from 'app/features/stops/entities/updated-stop';
import { UpdateStopDialogContext, UpdateStopDialogFormValue } from 'app/features/stops/components/update-stop-dialog/update-stop-dialog.store';
import { DeleteStopDialogContext } from 'app/features/stops/components/delete-stop-dialog/delete-stop-dialog.store';
import { AccountingPeriodsStore } from 'app/features/accounting-periods/state/accounting-periods.store';

export const StopsStore = signalStore(
  { },
  withState<StopsState>(initialStopsState),
  withMethods(
    (store, stopRepository = inject(StopRepository)) => ({
      getStops: rxMethod<string | null>(
        pipe(
          tap(() => patchState(store, { stops: Loadables.loading() })),
          switchMap(accountingPeriodId =>
            stopRepository.getStops(accountingPeriodId).pipe(
              tap(stops => patchState(
                store,
                {
                  stops: Loadables.success(stops),
                },
              )),
              catchApplicationError(error => patchState(store, { stops: Loadables.error(error) })))))),
      createStop: processFormDialogSubmission<CreateStopDialogContext, CreateStopDialogFormValue, Stop>(
        (_, value) => stopRepository.create(new NewStop(
          value.name, value.longitude, value.latitude,
          { street: value.street, houseNumber: value.houseNumber, postalCode: value.postalCode, city: value.city },
        )),
        stop => patchState(
          store,
          {
            stops: Loadables.success([...(store.stops().value ?? []), stop]),
          },
        )),
      updateStop: processFormDialogSubmission<UpdateStopDialogContext, UpdateStopDialogFormValue, Stop>(
        (context, value) => stopRepository.update(new UpdatedStop(
          context.id, value.name, value.longitude, value.latitude,
          { street: value.street, houseNumber: value.houseNumber, postalCode: value.postalCode, city: value.city },
        )),
        stop => patchState(
          store,
          {
            stops: Loadables.success((store.stops().value ?? []).map(s => s.id === stop.id ? stop : s)),
          },
        )),
      deleteStop: processConfirmationDialogSubmission<DeleteStopDialogContext>(
        context => stopRepository.delete(context.stop.id),
        context => {
          const remaining = (store.stops().value ?? []).filter(stop => stop.id !== context.stop.id);
          patchState(
            store,
            {
              stops: Loadables.success(remaining),
            },
          );
        }),
    }),
  ),
  withHooks(
    (store, accountingPeriodsStore = inject(AccountingPeriodsStore)) => ({
      onInit() {
        store.getStops(accountingPeriodsStore.selectedAccountingPeriodId);
      },
    }),
  ),
);
