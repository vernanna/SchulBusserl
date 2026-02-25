import { FormDialogStoreLike } from './form-dialog.store';

export default class FormDialogSubmission<TValue> {
  constructor(public readonly value: TValue, public readonly store: FormDialogStoreLike) {
  }
}
