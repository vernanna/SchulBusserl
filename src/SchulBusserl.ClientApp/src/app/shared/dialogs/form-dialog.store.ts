import { EmptyFeatureResult, patchState, SignalStoreFeature, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { Signal } from '@angular/core';
import { DialogStoreFeatureResult, DialogStoreLike } from './dialog.store';
import { FormDialogState, initialFormDialogState } from './form-dialog.state';
import { ApplicationError } from '../entities/application-error';
import { DialogState } from './dialog.state';

export type FormDialogStoreFeatureResult<TContext, TValue> = Omit<DialogStoreFeatureResult<TContext>, 'state' | 'methods'> & {
  state: FormDialogState<TContext, TValue>;
  methods: Omit<DialogStoreFeatureResult<TContext>['methods'], 'open'> & {
    open(context: TContext, value?: Partial<TValue>): void;
    submit(): void;
    succeeded(stayOpen?: boolean): void;
    failed(error: ApplicationError): void;
  };
};

export type FormDialogStoreLike<TContext = unknown, TValue = unknown> = Omit<DialogStoreLike<TContext>, 'open'> & {
  initialValue: Signal<Partial<TValue>>;
  isSubmitting: Signal<boolean>;
  error: Signal<ApplicationError | null>;
  open(context: TContext, value?: Partial<TValue>): void;
  submit(): void;
  succeeded(stayOpen?: boolean): void;
  failed(error: ApplicationError): void;
};

export function withFormDialog<TContext, TValue>(): SignalStoreFeature<EmptyFeatureResult, FormDialogStoreFeatureResult<TContext, TValue>> {
  const initialState = initialFormDialogState<TContext, TValue>();

  return signalStoreFeature(
    withState<FormDialogState<TContext, TValue>>(initialState),
    withMethods(store => ({
      open(context: TContext, value?: Partial<TValue>): void {
        patchState(store, { isOpen: true, context, initialValue: value ?? {} } as Partial<FormDialogState<TContext, TValue>>);
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
