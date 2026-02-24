import { signalStore } from '@ngrx/signals';
import { withFormDialog } from '../../shared/dialogs/form-dialog.store';

export interface CreateAccountingPeriodDialogContext {
  text: string;
}

export interface CreateAccountingPeriodDialogFormValue {
  name: string;
}

export const CreateAccountingPeriodDialogStore = signalStore(
  { providedIn: 'root' },
  withFormDialog<CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogFormValue>(),
);
