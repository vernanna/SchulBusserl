import AccountingPeriod from '../entities/accounting-period';
import { Loadable, Loadables } from '../entities/loadable';

export type AppState = {
  selectedAccountingPeriod: AccountingPeriod | null;
  accountingPeriods: Loadable<AccountingPeriod[]>;
};

export const initialAppState: AppState = {
  selectedAccountingPeriod: null,
  accountingPeriods: Loadables.initial(),
};
