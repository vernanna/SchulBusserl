import { signalStore } from '@ngrx/signals';
import AccountingPeriod from '../../entities/accounting-period';
import { withConfirmationDialog } from '../../shared/dialogs/confirmation/confirmation-dialog.store';

export interface DeleteAccountingPeriodDialogContext {
  accountingPeriod: AccountingPeriod;
}

export const DeleteAccountingPeriodDialogStore = signalStore(
  { providedIn: 'root' },
  withConfirmationDialog<DeleteAccountingPeriodDialogContext>(),
);
