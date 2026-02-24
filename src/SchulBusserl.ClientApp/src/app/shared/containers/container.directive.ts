import { Directive, inject, Type } from '@angular/core';
import { DialogStoreLike } from '../dialogs/dialog.store';
import { DialogDirective } from '../dialogs/dialog.directive';
import { ComponentType } from '@angular/cdk/portal';
import Dialog from '../dialogs/dialog';
import DialogEvents from '../dialogs/dialog-events';

@Directive()
export abstract class ContainerDirective {
  protected registerDialog<TContext, TStore extends DialogStoreLike<TContext>, TEvents extends DialogEvents>(
    component: ComponentType<DialogDirective<TContext, TStore, TEvents>>,
    dialogStoreType: Type<TStore>,
    dialogEventsType: Type<TEvents>,
  ): Dialog<TContext, TStore, TEvents> {
    const dialogStore = inject(dialogStoreType);
    return new Dialog(dialogStore, component, dialogEventsType);
  }
}
