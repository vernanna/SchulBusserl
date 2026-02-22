import { catchError, EMPTY, Observable, OperatorFunction } from 'rxjs';
import { ApplicationError } from '../entities/application-error';

export function catchApplicationError<T>(handler: (error: ApplicationError) => void): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    source.pipe(
      catchError((error: unknown) => {
        handler(error as ApplicationError);
        return EMPTY;
      }),
    );
}
