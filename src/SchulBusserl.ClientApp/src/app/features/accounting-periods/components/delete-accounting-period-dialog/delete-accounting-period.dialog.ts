import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { SaveDialogActionsComponent } from 'app/shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';
import { DeleteAccountingPeriodDialogContext, DeleteAccountingPeriodDialogStore } from 'app/features/accounting-periods/components/delete-accounting-period-dialog/delete-accounting-period-dialog.store';
import { ConfirmationDialogDirective } from 'app/shared/dialogs/confirmation/confirmation-dialog.directive';

@Component({
  selector: 'app-delete-accounting-period-dialog',
  templateUrl: './delete-accounting-period.dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    SaveDialogActionsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountingPeriodDialogComponent extends ConfirmationDialogDirective<DeleteAccountingPeriodDialogContext, InstanceType<typeof DeleteAccountingPeriodDialogStore>> {
  constructor() {
    super();
  }
}
