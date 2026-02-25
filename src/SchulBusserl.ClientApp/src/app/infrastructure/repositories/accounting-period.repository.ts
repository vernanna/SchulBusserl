import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import AccountingPeriod from '../../entities/accounting-period';
import { ApiService } from '../api.service';
import { AccountingPeriod as ApiAccountingPeriod } from './entities/accounting-period';
import NewAccountingPeriod from '../../entities/new-accounting-period';
import UpdatedAccountingPeriod from '../../entities/updated-accounting-period';

@Injectable({ providedIn: 'root' })
export class AccountingPeriodRepository {
  private readonly apiService = inject(ApiService);

  getAccountingPeriods(): Observable<AccountingPeriod[]> {
    return of([{ id: '1', name: 'Schuljahr 2026' }, { id: '2', name: 'Schuljahr 2027' }]);

    // todo vk: use real value as soon as backend is available
    return this.apiService.get<ApiAccountingPeriod[]>('accounting-periods');
  }

  create(accountingPeriod: NewAccountingPeriod): Observable<AccountingPeriod> {
    return of({ id: '3', name: accountingPeriod.name });

    // todo vk: use real value as soon as backend is available
    return this.apiService.post<ApiAccountingPeriod>('accounting-periods', accountingPeriod);
  }

  update(accountingPeriod: UpdatedAccountingPeriod): Observable<AccountingPeriod> {
    return of({ id: accountingPeriod.id, name: accountingPeriod.name });

    // todo vk: use real value as soon as backend is available
    return this.apiService.patch<ApiAccountingPeriod>('accounting-periods', accountingPeriod);
  }
}
