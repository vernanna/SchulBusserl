import AccountingPeriod from '../entities/accounting-period';
import { Loadable, Loadables } from '../entities/loadable';

export type AppState = {
  accountingPeriods: Loadable<AccountingPeriod[]>;
};

export const initialAppState: AppState = {
  accountingPeriods: Loadables.initial(),
};