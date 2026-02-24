import { EmptyFeatureResult, patchState, SignalStoreFeature, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { DialogState, initialDialogState } from './dialog.state';
import { InjectionToken, Signal } from '@angular/core';

export type DialogStoreFeatureResult<TContext> = {
  state: DialogState<TContext>;
  props: {};
  methods: {
    open(context: TContext): void;
    close(): void;
  };
};

export type DialogStoreLike<TContext = unknown> = {
  isOpen: Signal<boolean>;
  context: Signal<TContext>;
  open(context: TContext): void;
  close(): void;
};

export function withDialog<TContext = {}>(): SignalStoreFeature<EmptyFeatureResult, DialogStoreFeatureResult<TContext>> {
  return signalStoreFeature(
    withState<DialogState<TContext>>(initialDialogState<TContext>()),
    withMethods(store => ({
      open(context: TContext): void {
        patchState(store, { isOpen: true, context } as Partial<DialogState<TContext>>);
      },
      close(): void {
        patchState(store, {
          isOpen: false,
          context: initialDialogState<TContext>().context,
        } as Partial<DialogState<TContext>>);
      },
    })),
  );
}

export const DIALOG_STORE = new InjectionToken<unknown>('DIALOG_STORE');
