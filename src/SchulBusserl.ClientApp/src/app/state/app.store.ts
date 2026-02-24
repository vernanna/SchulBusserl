import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Loadables } from '../entities/loadable';
import { AccountingPeriodRepository } from '../infrastructure/repositories/accounting-period.repository';
import { AppState, initialAppState } from './app.state';
import { catchApplicationError } from '../shared/utils/rx.operators';
import { CreateAccountingPeriodDialogFormValue } from '../dialogs/create-accounting-period-dialog/create-accounting-period-dialog.store';
import { FormDialogStoreLike } from '../shared/dialogs/form-dialog.store';
import FormDialogSubmission from '../shared/dialogs/dialog-submission';
import NewAccountingPeriod from '../entities/new-accounting-period';

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
              ),
            ),
          ),
        ),
        // todo vk: make reusable and maybe use effect instead of subscribing to events?
        createAccountingPeriod: rxMethod<FormDialogSubmission<CreateAccountingPeriodDialogFormValue>>(
          pipe(
            tap(submission => submission.store.submit()),
            switchMap(submission => accountingPeriodRepository.create(new NewAccountingPeriod(submission.value.name)).pipe(
              tap(accountingPeriod => {
                patchState(store, { accountingPeriods: Loadables.success([...store.accountingPeriods().value, accountingPeriod]) })
                submission.store.succeeded();
              }),
              catchApplicationError(error => submission.store.failed(error)))
            )
          )),
        selectAccountingPeriodRequested: rxMethod<string>
        (
          pipe(
            tap(accountingPeriodId => patchState(store, { selectedAccountingPeriod: store.accountingPeriods.value()?.find(period => period.id === accountingPeriodId) ?? null })),
          ),
        ),
      }),
    ),
  )
;
