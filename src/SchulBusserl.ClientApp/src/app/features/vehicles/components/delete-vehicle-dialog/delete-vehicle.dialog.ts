import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { SaveDialogActionsComponent } from 'app/shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';
import { DeleteVehicleDialogContext, DeleteVehicleDialogStore } from 'app/features/vehicles/components/delete-vehicle-dialog/delete-vehicle-dialog.store';
import { ConfirmationDialogDirective } from 'app/shared/dialogs/confirmation/confirmation-dialog.directive';

@Component({
  selector: 'app-delete-vehicle-dialog',
  templateUrl: './delete-vehicle.dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    SaveDialogActionsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteVehicleDialogComponent extends ConfirmationDialogDirective<DeleteVehicleDialogContext, InstanceType<typeof DeleteVehicleDialogStore>> {
  constructor() {
    super();
  }
}
