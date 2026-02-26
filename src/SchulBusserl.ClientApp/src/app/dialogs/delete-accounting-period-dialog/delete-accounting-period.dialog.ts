import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SaveDialogActionsComponent } from '../../shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';
import { DeleteAccountingPeriodDialogContext, DeleteAccountingPeriodDialogStore } from './delete-accounting-period-dialog.store';
import { ConfirmationDialogDirective } from '../../shared/dialogs/confirmation/confirmation-dialog.directive';

@Component({
  selector: 'app-delete-accounting-period-dialog',
  templateUrl: './delete-accounting-period.dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    SaveDialogActionsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountingPeriodDialogComponent extends ConfirmationDialogDirective<DeleteAccountingPeriodDialogContext, InstanceType<typeof DeleteAccountingPeriodDialogStore>> {
  constructor() {
    super();
  }
}
