import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import ApplicationError from './application-error';
import { ApplicationError as DomainApplicationError } from '../../entities/application-error';

export const errorHandlingInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(request).pipe(
    catchError((response: unknown) => {
      if (response instanceof HttpErrorResponse) {
        const applicationError = response.error as ApplicationError | null | undefined;
        const domainApplicationError: DomainApplicationError = {
          message: applicationError?.message ?? response.message ?? 'An error occurred while performing the request',
        };
        return throwError(() => domainApplicationError);
      }

      return throwError(() => response);
    }),
  );
};