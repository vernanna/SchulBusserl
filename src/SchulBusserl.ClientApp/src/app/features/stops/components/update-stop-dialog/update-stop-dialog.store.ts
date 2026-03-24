import { signalStore } from '@ngrx/signals';
import { withFormDialog } from 'app/shared/dialogs/form-dialog.store';

export interface UpdateStopDialogContext {
  id: string;
}

export interface UpdateStopDialogFormValue {
  name: string;
  longitude: number;
  latitude: number;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export const UpdateStopDialogStore = signalStore(
  { providedIn: 'root' },
  withFormDialog<UpdateStopDialogContext, UpdateStopDialogFormValue>(),
);
