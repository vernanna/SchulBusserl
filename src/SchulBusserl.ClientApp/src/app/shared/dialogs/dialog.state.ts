export interface DialogState<TContext> {
  isOpen: boolean;
  context: TContext;
}

export function initialDialogState<TContext>(): DialogState<TContext> {
  return {
    isOpen: false,
    context: undefined!,
  };
}
