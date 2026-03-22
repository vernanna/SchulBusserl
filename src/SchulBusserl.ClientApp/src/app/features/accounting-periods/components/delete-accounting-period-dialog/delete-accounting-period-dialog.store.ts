import { signalStore } from '@ngrx/signals';
import AccountingPeriod from 'app/features/accounting-periods/entities/accounting-period';
import { withConfirmationDialog } from 'app/shared/dialogs/confirmation/confirmation-dialog.store';

export interface DeleteAccountingPeriodDialogContext {
  accountingPeriod: AccountingPeriod;
}

export const DeleteAccountingPeriodDialogStore = signalStore(
  { providedIn: 'root' },
  withConfirmationDialog<DeleteAccountingPeriodDialogContext>(),
);
