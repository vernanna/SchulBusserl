import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/input';
import AccountingPeriod from '../../features/accounting-periods/entities/accounting-period';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { HideSubscriptWrapperDirective } from '../../shared/directives/hide-subscript-wrapper.directive';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    HideSubscriptWrapperDirective,
    MatOption,
    MatIcon,
    MatIconButton,
    MatButton,
    MatSelectTrigger,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  selectedAccountingPeriod = input<AccountingPeriod | null>(null);
  accountingPeriods = input<AccountingPeriod[]>([]);

  selectAccountingPeriodClick = output<string>();
  createAccountingPeriodClick = output();
  updateAccountingPeriodClick = output<AccountingPeriod>();
  deleteAccountingPeriodClick = output<AccountingPeriod>();
}
