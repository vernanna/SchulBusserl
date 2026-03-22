import { computed, Directive } from '@angular/core';
import ConfirmationDialogEvents from 'app/shared/dialogs/confirmation/confirmation-dialog-events';
import { ConfirmationDialogStoreLike } from 'app/shared/dialogs/confirmation/confirmation-dialog.store';
import { DialogDirective } from 'app/shared/dialogs/dialog.directive';

@Directive()
export abstract class ConfirmationDialogDirective<TContext, TStore extends ConfirmationDialogStoreLike<TContext>, TEvents extends ConfirmationDialogEvents = ConfirmationDialogEvents> extends DialogDirective<TContext, TStore, TEvents> {
  protected readonly isSubmitting = this.dialogStore.isSubmitting;
  protected readonly submissionError = this.dialogStore.error;
  protected readonly canSubmit = computed(() => !this.isSubmitting());

  protected onSubmitRequested() {
    this.events.submitRequested.next();
  }
}
