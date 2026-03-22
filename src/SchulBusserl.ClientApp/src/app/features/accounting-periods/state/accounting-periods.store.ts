import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Loadables } from 'app/shared/entities/loadable';
import { AccountingPeriodRepository } from 'app/infrastructure/repositories/accounting-period.repository';
import { AccountingPeriodsState, initialAccountingPeriodsState } from 'app/features/accounting-periods/state/accounting-periods.state';
import { catchApplicationError, processConfirmationDialogSubmission, processFormDialogSubmission } from 'app/shared/utils/rx.operators';
import { CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogFormValue } from 'app/features/accounting-periods/components/create-accounting-period-dialog/create-accounting-period-dialog.store';
import NewAccountingPeriod from 'app/features/accounting-periods/entities/new-accounting-period';
import AccountingPeriod from 'app/features/accounting-periods/entities/accounting-period';
import UpdatedAccountingPeriod from 'app/features/accounting-periods/entities/updated-accounting-period';
import { UpdateAccountingPeriodDialogContext, UpdateAccountingPeriodDialogFormValue } from 'app/features/accounting-periods/components/update-accounting-period-dialog/update-accounting-period-dialog.store';
import { DeleteAccountingPeriodDialogContext } from 'app/features/accounting-periods/components/delete-accounting-period-dialog/delete-accounting-period-dialog.store';

export const AccountingPeriodsStore = signalStore(
  { providedIn: 'root' },
  withState<AccountingPeriodsState>(initialAccountingPeriodsState),
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
  withHooks(store => ({
    onInit() {
      store.getAccountingPeriods();
    },
  })),
);
