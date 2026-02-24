import { DialogState, initialDialogState } from './dialog.state';

export interface FormDialogState<TContext, TValue> extends DialogState<TContext> {
  initialValue: Partial<TValue>;
}

export function initialFormDialogState<TContext, TValue>(): FormDialogState<TContext, TValue> {
  return {
    ...initialDialogState<TContext>(),
    initialValue: {},
  };
}
