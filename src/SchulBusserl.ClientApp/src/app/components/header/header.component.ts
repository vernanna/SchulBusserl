import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { SaveDialogActionsComponent } from '../../shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';
import AccountingPeriod from '../../entities/accounting-period';
import { MatOption, MatSelect } from '@angular/material/select';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  selectedAccountingPeriod = input<AccountingPeriod | null>(null);
  accountingPeriods = input<AccountingPeriod[]>([]);
  
  selectAccountingPeriodClick = output<string>();
  createAccountingPeriodClick = output();
  updateAccountingPeriodClick = output<AccountingPeriod>();
}
