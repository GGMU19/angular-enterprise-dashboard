import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { appReducers } from './store/app.reducer';
import { DashboardEffects } from './features/dashboard/store/dashboard.effects';
import { WorkflowEffects } from './features/workflow/store/workflow.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // NgRx Store Configuration
    provideStore(appReducers),
    // NgRx Effects (register feature effects here)
    provideEffects([DashboardEffects, WorkflowEffects]),
    // NgRx DevTools (Redux DevTools for debugging)
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode in production
      autoPause: true, // Pauses recording actions when extension window is not open
      trace: false, // If set to true, will include stack trace for every action
      traceLimit: 75 // Maximum stack trace frames to be stored
    })
  ]
};
