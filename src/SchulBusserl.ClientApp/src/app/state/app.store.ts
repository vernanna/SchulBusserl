import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Loadables } from '../entities/loadable';
import { AccountingPeriodRepository } from '../infrastructure/repositories/accounting-period.repository';
import { AppState, initialAppState } from './app.state';
import { catchApplicationError, processConfirmationDialogSubmission, processFormDialogSubmission } from '../shared/utils/rx.operators';
import { CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogFormValue } from '../dialogs/create-accounting-period-dialog/create-accounting-period-dialog.store';
import NewAccountingPeriod from '../entities/new-accounting-period';
import AccountingPeriod from '../entities/accounting-period';
import UpdatedAccountingPeriod from '../entities/updated-accounting-period';
import { UpdateAccountingPeriodDialogContext, UpdateAccountingPeriodDialogFormValue } from '../dialogs/update-accounting-period-dialog/update-accounting-period-dialog.store';
import { DeleteAccountingPeriodDialogContext } from '../dialogs/delete-accounting-period-dialog/delete-accounting-period-dialog.store';

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
              catchApplicationError(error => patchState(store, { accountingPeriods: Loadables.error(error) })))))),
      createAccountingPeriod: processFormDialogSubmission<CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogFormValue, AccountingPeriod>(
        (_, value) => accountingPeriodRepository.create(new NewAccountingPeriod(value.name)),
        accountingPeriod => patchState(store, { accountingPeriods: Loadables.success([...store.accountingPeriods().value, accountingPeriod]) })),
      updateAccountingPeriod: processFormDialogSubmission<UpdateAccountingPeriodDialogContext, UpdateAccountingPeriodDialogFormValue, AccountingPeriod>(
        (context, value) => accountingPeriodRepository.update(new UpdatedAccountingPeriod(context.id, value.name)),
        accountingPeriod => patchState(store, { accountingPeriods: Loadables.success([...store.accountingPeriods().value.filter(period => period.id !== accountingPeriod.id), accountingPeriod]) })),
      deleteAccountingPeriod: processConfirmationDialogSubmission<DeleteAccountingPeriodDialogContext>(
        context => accountingPeriodRepository.delete(context.accountingPeriod.id),
        context => patchState(store, { accountingPeriods: Loadables.success(store.accountingPeriods().value.filter(period => period.id !== context.accountingPeriod.id)), selectedAccountingPeriod: store.accountingPeriods().value[0] ?? null })),
      selectAccountingPeriodRequested: rxMethod<string>(
        pipe(tap(accountingPeriodId => patchState(store, { selectedAccountingPeriod: store.accountingPeriods.value()?.find(period => period.id === accountingPeriodId) ?? null })))),
    }),
  ),
)
;
