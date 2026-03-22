import { Directive, inject } from '@angular/core';
import { DIALOG_STORE, DialogStoreLike } from 'app/shared/dialogs/dialog.store';
import DialogEvents, { DIALOG_EVENTS } from 'app/shared/dialogs/dialog-events';

@Directive()
export abstract class DialogDirective<TContext, TStore extends DialogStoreLike<TContext>, TEvents extends DialogEvents = DialogEvents> {
  protected readonly dialogStore = inject(DIALOG_STORE) as TStore;
  protected readonly events = inject(DIALOG_EVENTS) as TEvents;
  protected readonly context = this.dialogStore.context;

  protected oncloseRequested(): void {
    this.events.closeRequested.next();
  }
}
