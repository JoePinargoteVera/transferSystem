import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { MyService } from 'src/app/services/storage.service';
import { tap, catchError } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {

  loginForm: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,private myService: MyService, private api: ApiService,
     private router: Router, private cookieService: CookieService, private appComponent: AppComponent) {
      this.appComponent.showNavbar = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit(form: any) {
    this.api.login(form).pipe(
      tap(dato => {
        this.cookieService.set('token', dato.token);
    
        if (dato.status == '200' && form?.email) {
          // this.store.dispatch(loginSuccess(form));
          console.log(dato.user.tipo_usuario);
          this.myService.guardarDato('tipo_usuario', dato.user.tipo_usuario);
          this.myService.guardarDato('email', form?.email);
          this.router.navigate(['/home']);
        }
      }),
      catchError(error => {
        this.errorMessage = error.error.error;
        console.log(error.error.error);
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
        throw error;
      })
    ).subscribe();
    

  }

  
}
