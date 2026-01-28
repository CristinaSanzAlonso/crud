import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

//decimos que vamos a usar HTTPCLient
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)] //Con esto, HttpClient ya se puede inyectar en servicios y componentes.
},).catch((err) => console.error(err));

