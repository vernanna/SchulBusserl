import { FormDialogStoreLike } from 'app/shared/dialogs/form-dialog.store';

export default class FormDialogSubmission<TContext, TValue> {
  constructor(public readonly context: TContext, public readonly value: TValue, public readonly store: FormDialogStoreLike) {
  }
}
