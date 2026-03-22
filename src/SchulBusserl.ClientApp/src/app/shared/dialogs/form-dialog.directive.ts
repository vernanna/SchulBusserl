import { Directive, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogDirective } from './dialog.directive';
import FormDialogEvents from './form-dialog-events';
import { FormDialogStoreLike } from './form-dialog.store';

@Directive()
export abstract class FormDialogDirective<TContext, TValue, TStore extends FormDialogStoreLike<TContext, TValue>, TEvents extends FormDialogEvents<TValue> = FormDialogEvents<TValue>> extends DialogDirective<TContext, TStore, TEvents> {
  protected readonly formBuilder = inject(FormBuilder);
  protected abstract readonly form: FormGroup;
  protected readonly initialValue = this.dialogStore.initialValue;
  protected readonly isSubmitting = this.dialogStore.isSubmitting;
  protected readonly submissionError = this.dialogStore.error;

  protected get isValid(): boolean {
    return this.form.valid;
  }

  protected get canSubmit(): boolean {
    return this.isValid && !this.isSubmitting();
  }
}
