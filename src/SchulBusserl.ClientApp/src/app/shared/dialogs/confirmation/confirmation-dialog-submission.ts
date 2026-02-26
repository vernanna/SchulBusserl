import { ConfirmationDialogStoreLike } from './confirmation-dialog.store';

export default class ConfirmationDialogSubmission<TContext> {
  constructor(public readonly context: TContext, public readonly store: ConfirmationDialogStoreLike) {
  }
}
