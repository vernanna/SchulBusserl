import { Directive, inject } from '@angular/core';
import { DIALOG_STORE, DialogStore } from './dialog.store';
import DialogEvents, { DIALOG_EVENTS } from './dialog-events';

@Directive()
export abstract class DialogDirective<TContext, TEvents extends DialogEvents = DialogEvents> {
  protected readonly dialogStore = inject(DIALOG_STORE) as DialogStore<TContext>;
  protected readonly events = inject(DIALOG_EVENTS) as TEvents;

  protected get context(): TContext {
    return this.dialogStore.context();
  }

  protected onCloseClicked(): void {
    this.events.closeClicked.next();
  }
}
