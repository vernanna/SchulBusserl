import DomainAccountingPeriod from 'app/features/accounting-periods/entities/accounting-period';

export interface AccountingPeriod {
  id: string;
  name: string;
}

export function accountingPeriodToDomainModel(accountingPeriod: AccountingPeriod): DomainAccountingPeriod {
  return {
    id: accountingPeriod.id,
    name: accountingPeriod.name,
  };
}
