import { Directive, inject, Type } from '@angular/core';
import { DialogStore } from '../dialogs/dialog.store';
import { DialogDirective } from '../dialogs/dialog.directive';
import { ComponentType } from '@angular/cdk/portal';
import Dialog from '../dialogs/dialog';
import DialogEvents from '../dialogs/dialog-events';

@Directive()
export abstract class ContainerDirective {
  protected registerDialog<TContext, TEvents extends DialogEvents, TDialogStore extends DialogStore<TContext>>(component: ComponentType<DialogDirective<TContext, TEvents>> & {
    dialogStore: Type<TDialogStore>;
    dialogEvents: Type<TEvents>;
  }): Dialog<TContext, TEvents> {
    const dialogStore = inject(component.dialogStore);
    return new Dialog(dialogStore, component);
  }
}
