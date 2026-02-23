import { signalStore } from '@ngrx/signals';
import { withDialog } from '../../shared/dialogs/dialog.store';

export interface CreateAccountingPeriodDialogContext {
}

export const CreateAccountingPeriodDialogStore = signalStore(
  { providedIn: 'root' },
  withDialog<CreateAccountingPeriodDialogContext>(),
);
