import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app/app.routes';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // ← ова го овозможува routing
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule,RouterModule)
  ]
}).catch(err => console.error(err));



