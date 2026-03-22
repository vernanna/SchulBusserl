import { inject } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { AppState, initialAppState } from 'app/state/app.state';
import { AccountingPeriodsStore } from 'app/features/accounting-periods/state/accounting-periods.store';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(initialAppState),
  withComputed(() => {
    const accountingPeriodsStore = inject(AccountingPeriodsStore);
    return {
      selectedAccountingPeriod: accountingPeriodsStore.selectedAccountingPeriod,
    };
  }),
);
