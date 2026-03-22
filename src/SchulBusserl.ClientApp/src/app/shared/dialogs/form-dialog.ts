import DialogBase from 'app/shared/dialogs/dialog-base';
import { Type } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FormDialogDirective } from 'app/shared/dialogs/form-dialog.directive';
import FormDialogEvents from 'app/shared/dialogs/form-dialog-events';
import { FormDialogStoreLike } from 'app/shared/dialogs/form-dialog.store';
import { FormGroup } from '@angular/forms';

export default class FormDialog<TContext, TValue, TStore extends FormDialogStoreLike<TContext, TValue>, TEvents extends FormDialogEvents<TValue>> extends DialogBase<TContext, TStore, TEvents> {
  constructor(
    dialogStore: TStore,
    component: ComponentType<FormDialogDirective<TContext, TValue, TStore, FormGroup, TEvents>>,
    dialogEventsType?: Type<TEvents>,
  ) {
    super(dialogStore, component, dialogEventsType == null ? new FormDialogEvents<TValue>() as TEvents : new dialogEventsType());
  }

  public open(context: TContext, value?: TValue): void {
    this.dialogStore.open(context, value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormContextOf<T> = T extends FormDialogDirective<infer TContext, any, any, any, any> ? TContext : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueOf<T> = T extends FormDialogDirective<any, infer TValue, any, any, any> ? TValue : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormStoreOf<T> = T extends FormDialogDirective<any, any, infer TStore extends FormDialogStoreLike<FormContextOf<T>, ValueOf<T>>, any, any> ? TStore : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormEventsOf<T> = T extends FormDialogDirective<any, any, any, any, infer TEvents> ? TEvents : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormDialogFor<TComponent> = TComponent extends FormDialogDirective<any, any, any, any, any>
  ? FormDialog<FormContextOf<TComponent>, ValueOf<TComponent>, FormStoreOf<TComponent>, FormEventsOf<TComponent>>
  : never;
