import { signalStore } from '@ngrx/signals';
import { withFormDialog } from 'app/shared/dialogs/form-dialog.store';

export interface CreateAccountingPeriodDialogContext {
}

export interface CreateAccountingPeriodDialogFormValue {
  name: string;
}

export const CreateAccountingPeriodDialogStore = signalStore(
  { providedIn: 'root' },
  withFormDialog<CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogFormValue>(),
);
