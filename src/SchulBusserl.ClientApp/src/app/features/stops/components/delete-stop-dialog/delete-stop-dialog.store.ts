import { signalStore } from '@ngrx/signals';
import Stop from 'app/features/stops/entities/stop';
import { withConfirmationDialog } from 'app/shared/dialogs/confirmation/confirmation-dialog.store';

export interface DeleteStopDialogContext {
  stop: Stop;
}

export const DeleteStopDialogStore = signalStore(
  { providedIn: 'root' },
  withConfirmationDialog<DeleteStopDialogContext>(),
);
