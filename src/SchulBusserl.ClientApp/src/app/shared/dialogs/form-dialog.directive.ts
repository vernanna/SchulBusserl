import { computed, Directive, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogDirective } from 'app/shared/dialogs/dialog.directive';
import FormDialogEvents from 'app/shared/dialogs/form-dialog-events';
import { FormDialogStoreLike } from 'app/shared/dialogs/form-dialog.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';

@Directive()
export abstract class FormDialogDirective<TContext, TValue, TStore extends FormDialogStoreLike<TContext, TValue>, TForm extends FormGroup = FormGroup, TEvents extends FormDialogEvents<TValue> = FormDialogEvents<TValue>> extends DialogDirective<TContext, TStore, TEvents> {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly form: TForm;
  protected readonly initialValue = this.dialogStore.initialValue;
  protected readonly isSubmitting = this.dialogStore.isSubmitting;
  protected readonly submissionError = this.dialogStore.error;
  protected readonly canSubmit: Signal<boolean>;

  protected abstract createForm(formBuilder: FormBuilder, initialValue: Partial<TValue>): TForm;

  constructor() {
    super();
    this.form = this.createForm(this.formBuilder, this.initialValue());
    const formValid = toSignal(
      this.form.statusChanges.pipe(
        startWith(this.form.status),
        map(() => this.form.valid),
      ),
      { initialValue: this.form.valid },
    );
    this.canSubmit = computed(() => formValid() && !this.isSubmitting());
  }
}
