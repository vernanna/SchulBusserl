import { catchError, EMPTY, Observable, OperatorFunction, pipe, switchMap, tap } from 'rxjs';
import { ApplicationError } from '../../entities/application-error';
import FormDialogSubmission from '../dialogs/dialog-submission';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export function catchApplicationError<T>(handler: (error: ApplicationError) => void): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    source.pipe(
      catchError((error: unknown) => {
        handler(error as ApplicationError);
        return EMPTY;
      }),
    );
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
