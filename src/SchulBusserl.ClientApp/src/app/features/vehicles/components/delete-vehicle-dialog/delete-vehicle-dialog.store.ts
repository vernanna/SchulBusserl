import { signalStore } from '@ngrx/signals';
import Vehicle from 'app/features/vehicles/entities/vehicle';
import { withConfirmationDialog } from 'app/shared/dialogs/confirmation/confirmation-dialog.store';

export interface DeleteVehicleDialogContext {
  vehicle: Vehicle;
}

export const DeleteVehicleDialogStore = signalStore(
  { providedIn: 'root' },
  withConfirmationDialog<DeleteVehicleDialogContext>(),
);
