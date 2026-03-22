import { ApplicationError } from 'app/shared/entities/application-error';

export interface Loadable<T> {
  value: T | null;
  isLoading: boolean;
  error: ApplicationError | null;
}

export class Loadables {
  public static initial<T>(initialValue: T): Loadable<T> {
    return { value: initialValue, isLoading: false, error: null };
  }

  public static loading<T>(previousValue: T | null = null): Loadable<T> {
    return { value: previousValue, isLoading: true, error: null };
  }

  public static success<T>(value: T): Loadable<T> {
    return { value, isLoading: false, error: null };
  }

  public static error<T>(error: ApplicationError): Loadable<T> {
    return { value: null, isLoading: false, error };
  }
}
