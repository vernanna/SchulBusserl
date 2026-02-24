import { Directive, inject } from '@angular/core';
import DialogEvents from './dialog-events';
import { DialogDirective } from './dialog.directive';
import { FormBuilder } from '@angular/forms';
import { DialogStoreLike } from './dialog.store';

@Directive()
export abstract class FormDialogDirective<TContext, TStore extends DialogStoreLike<TContext>, TEvents extends DialogEvents = DialogEvents> extends DialogDirective<TContext, TStore, TEvents> {
  protected readonly formBuilder = inject(FormBuilder);
}
