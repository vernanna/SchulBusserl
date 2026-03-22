import AccountingPeriod from '../entities/accounting-period';
import { Loadable, Loadables } from '../entities/loadable';

export interface AppState {
  selectedAccountingPeriodId: string | null;
  accountingPeriods: Loadable<AccountingPeriod[]>;
}

export const initialAppState: AppState = {
  selectedAccountingPeriodId: null,
  accountingPeriods: Loadables.initial([]),
};
