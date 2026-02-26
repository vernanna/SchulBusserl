import { EmptyFeatureResult, patchState, SignalStoreFeature, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { Signal } from '@angular/core';
import { ConfirmationDialogState, initialConfirmationDialogState } from './confirmation-dialog.state';
import { DialogStoreFeatureResult, DialogStoreLike } from '../dialog.store';
import { ApplicationError } from '../../../entities/application-error';
import { DialogState } from '../dialog.state';

export type ConfirmationDialogStoreFeatureResult<TContext> = Omit<DialogStoreFeatureResult<TContext>, 'state' | 'methods'> & {
  state: ConfirmationDialogState<TContext>;
  methods: DialogStoreFeatureResult<TContext>['methods'] & {
    submit(): void;
    succeeded(stayOpen?: boolean): void;
    failed(error: ApplicationError): void;
  };
};

export type ConfirmationDialogStoreLike<TContext = unknown> = DialogStoreLike<TContext> & {
  isSubmitting: Signal<boolean>;
  error: Signal<ApplicationError | null>;
  submit(): void;
  succeeded(stayOpen?: boolean): void;
  failed(error: ApplicationError): void;
};

export function withConfirmationDialog<TContext>(): SignalStoreFeature<EmptyFeatureResult, ConfirmationDialogStoreFeatureResult<TContext>> {
  const initialState = initialConfirmationDialogState<TContext>();

  return signalStoreFeature(
    withState<ConfirmationDialogState<TContext>>(initialState),
    withMethods(store => ({
      open(context: TContext): void {
        patchState(store, { isOpen: true, context } as Partial<ConfirmationDialogState<TContext>>);
      },
      submit(): void {
        patchState(store, { isSubmitting: true } as Partial<DialogState<TContext>>);
      },
      succeeded(stayOpen?: boolean): void {
        patchState(store, { isSubmitting: false, isOpen: stayOpen ?? false } as Partial<DialogState<TContext>>);
      },
      failed(error: ApplicationError): void {
        patchState(store, { isSubmitting: false, error } as Partial<DialogState<TContext>>);
      },
      close(): void {
        patchState(store, initialState);
      },
    })));
}
