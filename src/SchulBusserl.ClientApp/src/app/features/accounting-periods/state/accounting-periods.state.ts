import AccountingPeriod from '../entities/accounting-period';
import { Loadable, Loadables } from '../../../shared/entities/loadable';

export interface AccountingPeriodsState {
  selectedAccountingPeriodId: string | null;
  accountingPeriods: Loadable<AccountingPeriod[]>;
}

export const initialAccountingPeriodsState: AccountingPeriodsState = {
  selectedAccountingPeriodId: null,
  accountingPeriods: Loadables.initial([]),
};
