import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Loadables } from '../entities/loadable';
import { AccountingPeriodRepository } from '../infrastructure/repositories/accounting-period.repository';
import { catchApplicationError } from '../utils/rx.operators';
import { AppState, initialAppState } from './app.state';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(initialAppState),
  withMethods(
    (store, accountingPeriodRepository = inject(AccountingPeriodRepository)) => ({
      getAccountingPeriods: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { accountingPeriods: Loadables.loading() })),
          switchMap(() =>
            accountingPeriodRepository.getAccountingPeriods().pipe(
              tap(accountingPeriods => patchState(store, { accountingPeriods: Loadables.success(accountingPeriods) })),
              catchApplicationError(error => patchState(store, { accountingPeriods: Loadables.error(error) })),
            )
          ),
        ),
      ),
    }),
  ),
);
