import { Directive } from '@angular/core';
import ConfirmationDialogEvents from './confirmation-dialog-events';
import { ConfirmationDialogStoreLike } from './confirmation-dialog.store';
import { DialogDirective } from '../dialog.directive';

@Directive()
export abstract class ConfirmationDialogDirective<TContext, TStore extends ConfirmationDialogStoreLike<TContext>, TEvents extends ConfirmationDialogEvents = ConfirmationDialogEvents> extends DialogDirective<TContext, TStore, TEvents> {
  protected readonly isSubmitting = this.dialogStore.isSubmitting;
  protected readonly submissionError = this.dialogStore.error;

  protected get canSubmit(): boolean {
    return !this.isSubmitting();
  }

  protected onSubmitRequested() {
    this.events.submitRequested.next();
  }
}
