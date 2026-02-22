import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Loadables } from '../entities/loadable';
import { AccountingPeriodRepository } from '../infrastructure/repositories/accounting-period.repository';
import { AppState, initialAppState } from './app.state';
import { catchApplicationError } from '../shared/utils/rx.operators';
import AccountingPeriod from '../entities/accounting-period';

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
              tap(accountingPeriods => patchState(store, { accountingPeriods: Loadables.success(accountingPeriods), selectedAccountingPeriod: accountingPeriods[0] ?? null })),
              catchApplicationError(error => patchState(store, { accountingPeriods: Loadables.error(error) })),
            )
          ),
        ),
      ),
      selectAccountingPeriodRequested: rxMethod<string>(
        pipe(
          tap(accountingPeriodId => patchState(store, { selectedAccountingPeriod: store.accountingPeriods.value()?.find(period => period.id === accountingPeriodId) ?? null })),
        ),
      ),
    }),
  ),
);
