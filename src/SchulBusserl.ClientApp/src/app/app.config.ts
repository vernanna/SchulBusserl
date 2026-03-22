import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from 'app/app.routes';
import { API_URL } from 'app/infrastructure/api-base-url.token';
import { errorHandlingInterceptor } from 'app/infrastructure/interceptors/error-handling.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
    { provide: API_URL, useValue: 'http://localhost:5000/api/' },
  ],
};
