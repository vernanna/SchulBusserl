import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
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
  withComputed(store => ({
    selectedAccountingPeriod: computed(() => store.accountingPeriods().value?.find(p => p.id === store.selectedAccountingPeriodId()) ?? null),
  })),
  withMethods(
    (store, accountingPeriodRepository = inject(AccountingPeriodRepository)) => ({
      getAccountingPeriods: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { accountingPeriods: Loadables.loading() })),
          switchMap(() =>
            accountingPeriodRepository.getAccountingPeriods().pipe(
              tap(accountingPeriods => patchState(
                store,
                {
                  accountingPeriods: Loadables.success(accountingPeriods),
                  selectedAccountingPeriodId: accountingPeriods[0]?.id ?? null,
                },
              )),
              catchApplicationError(error => patchState(store, { accountingPeriods: Loadables.error(error) })))))),
      createAccountingPeriod: processFormDialogSubmission<CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogFormValue, AccountingPeriod>(
        (_, value) => accountingPeriodRepository.create(new NewAccountingPeriod(value.name)),
        accountingPeriod => patchState(
          store,
          {
            accountingPeriods: Loadables.success([...(store.accountingPeriods().value ?? []), accountingPeriod]),
          },
        )),
      updateAccountingPeriod: processFormDialogSubmission<UpdateAccountingPeriodDialogContext, UpdateAccountingPeriodDialogFormValue, AccountingPeriod>(
        (context, value) => accountingPeriodRepository.update(new UpdatedAccountingPeriod(context.id, value.name)),
        accountingPeriod => patchState(
          store,
          {
            accountingPeriods: Loadables.success((store.accountingPeriods().value ?? []).map(period => period.id === accountingPeriod.id ? accountingPeriod : period)),
          },
        )),
      deleteAccountingPeriod: processConfirmationDialogSubmission<DeleteAccountingPeriodDialogContext>(
        context => accountingPeriodRepository.delete(context.accountingPeriod.id),
        context => {
          const remaining = (store.accountingPeriods().value ?? []).filter(
            period => period.id !== context.accountingPeriod.id);
          patchState(
            store,
            {
              accountingPeriods: Loadables.success(remaining),
              selectedAccountingPeriodId: remaining[0]?.id ?? null,
            },
          );
        }),
      selectAccountingPeriodRequested(accountingPeriodId: string): void {
        patchState(store, { selectedAccountingPeriodId: accountingPeriodId });
      },
    }),
  ),
);
