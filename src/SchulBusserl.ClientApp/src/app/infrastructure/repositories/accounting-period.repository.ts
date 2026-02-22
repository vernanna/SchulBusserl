import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountingPeriod as ApiAccountingPeriod } from './entities/accounting-period';
import { ApiService } from '../api.service';
import AccountingPeriod from '../../entities/accounting-period';
import { ApiService } from '../api.service';
import { AccountingPeriod as ApiAccountingPeriod } from './entities/accounting-period';

@Injectable({ providedIn: 'root' })
export class AccountingPeriodRepository {
  private readonly apiService = inject(ApiService);

  getAccountingPeriods(): Observable<AccountingPeriod[]> {
    return of([{ name: 'Schuljahr 2026' }, { name: 'Schuljahr 2027' }]);

    // todo vk: use real value as soon as backend is available
    return this.apiService.get<ApiAccountingPeriod[]>('accounting-periods');
  }
}
