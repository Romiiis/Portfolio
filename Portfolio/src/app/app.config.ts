import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TechnologiesService } from './services/technologies.service';

import { routes } from './app.routes';
import {ProjectsService} from './services/projects.service';

/**
 * Create a TranslateLoader for loading translation files.
 * @param http The HttpClient instance to use for making HTTP requests.
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * Initialize the technologies service when the application starts.
 * @param techService The TechnologiesService instance to use for loading technologies.
 */
export function initializeTechnologiesFactory(techService: TechnologiesService) {
  return () => techService.loadTechnologies().toPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ),

    // Initialize the technologies service
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTechnologiesFactory,
      deps: [TechnologiesService],
      multi: true
    }
  ]
};
