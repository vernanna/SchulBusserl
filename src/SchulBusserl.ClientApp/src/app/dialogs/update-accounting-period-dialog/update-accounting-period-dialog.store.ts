import { signalStore } from '@ngrx/signals';
import { withFormDialog } from '../../shared/dialogs/form-dialog.store';

export interface UpdateAccountingPeriodDialogContext {
  id: string;
}

export interface UpdateAccountingPeriodDialogFormValue {
  name: string;
}

export const UpdateAccountingPeriodDialogStore = signalStore(
  { providedIn: 'root' },
  withFormDialog<UpdateAccountingPeriodDialogContext, UpdateAccountingPeriodDialogFormValue>(),
);
