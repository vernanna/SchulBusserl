import { ApplicationError } from './application-error';

export interface Loadable<T> {
  value: T,
  isLoading: boolean,
  error: ApplicationError | null,
}

export class Loadables {
  public static initial<T>(): Loadable<T> {
    return { value: null!, isLoading: false, error: null };
  }

  public static loading<T>(previousValue: T | null = null): Loadable<T> {
    return { value: previousValue!, isLoading: true, error: null };
  }

  public static success<T>(value: T): Loadable<T> {
    return { value, isLoading: false, error: null };
  }

  public static error<T>(error: ApplicationError): Loadable<T> {
    return { value: null!, isLoading: false, error };
  }
}