import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { SaveDialogActionsComponent } from 'app/shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';
import { DeleteStopDialogContext, DeleteStopDialogStore } from 'app/features/stops/components/delete-stop-dialog/delete-stop-dialog.store';
import { ConfirmationDialogDirective } from 'app/shared/dialogs/confirmation/confirmation-dialog.directive';

@Component({
  selector: 'app-delete-stop-dialog',
  templateUrl: './delete-stop.dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    SaveDialogActionsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteStopDialogComponent extends ConfirmationDialogDirective<DeleteStopDialogContext, InstanceType<typeof DeleteStopDialogStore>> {
  constructor() {
    super();
  }
}
