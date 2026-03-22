import { signalStore } from '@ngrx/signals';
import { withFormDialog } from 'app/shared/dialogs/form-dialog.store';

export interface UpdateVehicleDialogContext {
  id: string;
}

export interface UpdateVehicleDialogFormValue {
  name: string;
  licensePlate: string;
  numberOfPassengerSeats: number;
}

export const UpdateVehicleDialogStore = signalStore(
  { providedIn: 'root' },
  withFormDialog<UpdateVehicleDialogContext, UpdateVehicleDialogFormValue>(),
);
