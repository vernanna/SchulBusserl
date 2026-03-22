import { ConfirmationDialogStoreLike } from 'app/shared/dialogs/confirmation/confirmation-dialog.store';

export default class ConfirmationDialogSubmission<TContext> {
  constructor(public readonly context: TContext, public readonly store: ConfirmationDialogStoreLike) {
  }
}
