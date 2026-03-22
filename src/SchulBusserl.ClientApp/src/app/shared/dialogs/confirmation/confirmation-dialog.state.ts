import { DialogState, initialDialogState } from 'app/shared/dialogs/dialog.state';
import { ApplicationError } from 'app/shared/entities/application-error';

export interface ConfirmationDialogState<TContext> extends DialogState<TContext> {
  isSubmitting: boolean;
  error: ApplicationError | null;
}

export function initialConfirmationDialogState<TContext>(): ConfirmationDialogState<TContext> {
  return {
    ...initialDialogState<TContext>(),
    isSubmitting: false,
    error: null,
  };
}
