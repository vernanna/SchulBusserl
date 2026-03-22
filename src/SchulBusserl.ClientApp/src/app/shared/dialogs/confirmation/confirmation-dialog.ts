import DialogBase from 'app/shared/dialogs/dialog-base';
import { Type } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { ConfirmationDialogDirective } from 'app/shared/dialogs/confirmation/confirmation-dialog.directive';
import ConfirmationDialogEvents from 'app/shared/dialogs/confirmation/confirmation-dialog-events';
import { ConfirmationDialogStoreLike } from 'app/shared/dialogs/confirmation/confirmation-dialog.store';

export default class ConfirmationDialog<TContext, TStore extends ConfirmationDialogStoreLike<TContext>, TEvents extends ConfirmationDialogEvents> extends DialogBase<TContext, TStore, TEvents> {
  constructor(
    dialogStore: TStore,
    component: ComponentType<ConfirmationDialogDirective<TContext, TStore, TEvents>>,
    dialogEventsType?: Type<TEvents>,
  ) {
    super(dialogStore, component, dialogEventsType == null ? new ConfirmationDialogEvents() as TEvents : new dialogEventsType());
  }

  public open(context: TContext): void {
    this.dialogStore.open(context);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfirmationContextOf<T> = T extends ConfirmationDialogDirective<infer TContext, any, any> ? TContext : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfirmationStoreOf<T> = T extends ConfirmationDialogDirective<any, infer TStore extends ConfirmationDialogStoreLike<ConfirmationContextOf<T>>, any> ? TStore : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfirmationEventsOf<T> = T extends ConfirmationDialogDirective<any, any, infer TEvents> ? TEvents : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfirmationDialogFor<TComponent> = TComponent extends ConfirmationDialogDirective<any, any, any>
  ? ConfirmationDialog<ConfirmationContextOf<TComponent>, ConfirmationStoreOf<TComponent>, ConfirmationEventsOf<TComponent>>
  : never;
