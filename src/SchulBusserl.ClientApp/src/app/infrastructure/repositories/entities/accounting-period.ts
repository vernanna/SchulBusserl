import DomainAccountingPeriod from '../../../entities/accounting-period';

export interface AccountingPeriod {
  name: string;
}

export function accountingPeriodToDomainModel(accountingPeriod: AccountingPeriod): DomainAccountingPeriod {
  return {
    name: accountingPeriod.name,
  }
}