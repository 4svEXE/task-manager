import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(routes), // Setup routing
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
