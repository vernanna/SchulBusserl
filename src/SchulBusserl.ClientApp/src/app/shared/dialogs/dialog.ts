import DialogBase from './dialog-base';
import { DialogStoreLike } from './dialog.store';
import { Type } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DialogDirective } from './dialog.directive';
import DialogEvents from './dialog-events';

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
