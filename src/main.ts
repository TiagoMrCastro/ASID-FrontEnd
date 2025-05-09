import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // <-- Certifica-te que tem provideHttpClient

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
