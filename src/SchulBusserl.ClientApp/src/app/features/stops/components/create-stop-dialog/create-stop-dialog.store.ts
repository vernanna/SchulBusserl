import { signalStore } from '@ngrx/signals';
import { withFormDialog } from 'app/shared/dialogs/form-dialog.store';

export interface CreateStopDialogContext {
}

export interface CreateStopDialogFormValue {
  name: string;
  longitude: number;
  latitude: number;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export const CreateStopDialogStore = signalStore(
  { providedIn: 'root' },
  withFormDialog<CreateStopDialogContext, CreateStopDialogFormValue>(),
);
