import DialogBase from 'app/shared/dialogs/dialog-base';
import { DialogStoreLike } from 'app/shared/dialogs/dialog.store';
import { Type } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DialogDirective } from 'app/shared/dialogs/dialog.directive';
import DialogEvents from 'app/shared/dialogs/dialog-events';

export default class Dialog<TContext, TStore extends DialogStoreLike<TContext>, TEvents extends DialogEvents> extends DialogBase<TContext, TStore, TEvents> {
  constructor(
    dialogStore: TStore,
    component: ComponentType<DialogDirective<TContext, TStore, TEvents>>,
    dialogEventsType: Type<TEvents>,
  ) {
    super(dialogStore, component, new dialogEventsType());
  }

  public open(context: TContext): void {
    this.dialogStore.open(context);
  }
}

export type DialogFor<TComponent> = TComponent extends DialogDirective<infer TContext, infer TStore, infer TEvents>
  ? Dialog<TContext, TStore, TEvents>
  : never;
