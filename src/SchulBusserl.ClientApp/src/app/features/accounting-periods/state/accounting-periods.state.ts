import AccountingPeriod from 'app/features/accounting-periods/entities/accounting-period';
import { Loadable, Loadables } from 'app/shared/entities/loadable';

export interface AccountingPeriodsState {
  selectedAccountingPeriodId: string | null;
  accountingPeriods: Loadable<AccountingPeriod[]>;
}

export const initialAccountingPeriodsState: AccountingPeriodsState = {
  selectedAccountingPeriodId: null,
  accountingPeriods: Loadables.initial([]),
};
