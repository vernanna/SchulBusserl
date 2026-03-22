import { DialogState, initialDialogState } from 'app/shared/dialogs/dialog.state';
import { ApplicationError } from 'app/shared/entities/application-error';

export interface FormDialogState<TContext, TValue> extends DialogState<TContext> {
  initialValue: Partial<TValue>;
  isSubmitting: boolean;
  error: ApplicationError | null;
}

export function initialFormDialogState<TContext, TValue>(): FormDialogState<TContext, TValue> {
  return {
    ...initialDialogState<TContext>(),
    initialValue: {},
    isSubmitting: false,
    error: null,
  };
}
