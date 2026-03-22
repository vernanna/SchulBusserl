import { signalStore } from '@ngrx/signals';
import { withFormDialog } from 'app/shared/dialogs/form-dialog.store';

export interface CreateVehicleDialogContext {
}

export interface CreateVehicleDialogFormValue {
  name: string;
  licensePlate: string;
  numberOfPassengerSeats: number;
}

export const CreateVehicleDialogStore = signalStore(
  { providedIn: 'root' },
  withFormDialog<CreateVehicleDialogContext, CreateVehicleDialogFormValue>(),
);
