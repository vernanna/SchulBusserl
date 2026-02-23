import { Directive, inject } from '@angular/core';
import DialogEvents from './dialog-events';
import { DialogDirective } from './dialog.directive';
import { FormBuilder } from '@angular/forms';

@Directive()
export abstract class FormDialogDirective<TContext, TEvents extends DialogEvents = DialogEvents> extends DialogDirective<TContext, TEvents> {
  protected readonly formBuilder = inject(FormBuilder);
}
