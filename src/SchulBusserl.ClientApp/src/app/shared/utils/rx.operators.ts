import { catchError, EMPTY, Observable, OperatorFunction, pipe, switchMap, tap } from 'rxjs';
import { ApplicationError } from '../../entities/application-error';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import ConfirmationDialogSubmission from '../dialogs/confirmation/confirmation-dialog-submission';
import FormDialogSubmission from '../dialogs/form-dialog-submission';

export function catchApplicationError<T>(handler: (error: ApplicationError) => void): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    source.pipe(
      catchError((error: unknown) => {
        handler(error as ApplicationError);
        return EMPTY;
      }),
    );
}

export function processConfirmationDialogSubmission<TContext>(process: (context: TContext) => Observable<void>, processResult?: (context: TContext) => void) {
  return rxMethod<ConfirmationDialogSubmission<TContext>>(
    pipe(
      tap(submission => submission.store.submit()),
      switchMap(submission => process(submission.context).pipe(
        tap(() => {
          if (processResult != null) {
            processResult(submission.context);
          }
          submission.store.succeeded();
        }),
        catchApplicationError(error => submission.store.failed(error))))));
}

export function processFormDialogSubmission<TContext, TValue, TResult>(process: (context: TContext, value: TValue) => Observable<TResult>, processResult?: (result: TResult) => void) {
  return rxMethod<FormDialogSubmission<TContext, TValue>>(
    pipe(
      tap(submission => submission.store.submit()),
      switchMap(submission => process(submission.context, submission.value).pipe(
        tap(result => {
          if (processResult != null) {
            processResult(result);
          }
          submission.store.succeeded();
        }),
        catchApplicationError(error => submission.store.failed(error))))));
}
