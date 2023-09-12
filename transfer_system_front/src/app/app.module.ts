import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyService } from './services/storage.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './pages/auth/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NabvarComponent } from './pages/navbar/nabvar.component';
import { SingupComponent } from './pages/singup/singup.component';


export function jwtOptionsFactory(cookieService: CookieService) {
  return {
    tokenGetter: () => cookieService.get('token'),
    allowedDomains: ['localhost:4200'], // Dominio(s) permitido(s) para las solicitudes
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NabvarComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [CookieService],
      },
    }),
    
  ],
  providers: [MyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
