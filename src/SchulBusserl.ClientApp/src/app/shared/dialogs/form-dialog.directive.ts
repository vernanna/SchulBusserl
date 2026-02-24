import { Directive, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogDirective } from './dialog.directive';
import FormDialogEvents from './form-dialog-events';
import { FormDialogStoreLike } from './form-dialog.store';

@Directive()
export abstract class FormDialogDirective<TContext, TValue, TStore extends FormDialogStoreLike<TContext, TValue>, TEvents extends FormDialogEvents<TValue> = FormDialogEvents<TValue>> extends DialogDirective<TContext, TStore, TEvents> {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly initialValue = this.dialogStore.initialValue;
}
