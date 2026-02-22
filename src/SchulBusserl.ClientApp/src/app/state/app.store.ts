import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AppState, initialAppState } from './app.state';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { AccountingPeriodRepository } from '../infrastructure/repositories/accounting-period.repository';
import { Loadables } from '../entities/loadable';
import { catchApplicationError } from '../utils/rx.operators';

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
            ),
          ),
        ),
      ),
    }),
  ),
);