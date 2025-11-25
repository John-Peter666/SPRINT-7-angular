import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importe o withFetch

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    
    provideHttpClient(withFetch()) 
  ]
}).catch((err) => console.error(err));