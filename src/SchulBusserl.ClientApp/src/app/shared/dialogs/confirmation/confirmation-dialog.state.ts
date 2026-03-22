import { DialogState, initialDialogState } from '../dialog.state';
import { ApplicationError } from '../../../entities/application-error';

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
