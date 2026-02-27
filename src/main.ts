import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

Sentry.init({
  dsn: 'https://fec12888810e76bb656c33af1be3f1b5@o1203807.ingest.us.sentry.io/4510958180368384',
  sendDefaultPii: true,
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
