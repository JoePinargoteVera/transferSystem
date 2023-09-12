import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
// import { Store } from '@ngrx/store'; , private store: Store<any>
import { CookieService } from 'ngx-cookie-service';
// import { loginSuccess } from 'src/app/state/actions/login.actions'; 
import { AppComponent } from 'src/app/app.component';
import { MyService } from 'src/app/services/storage.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage!: string;

  // loginForm = new FormGroup({
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required)
  // })

  constructor(private formBuilder: FormBuilder, private appComponent: AppComponent,private myService: MyService, private api: ApiService, private router: Router, private cookieService: CookieService) {
    this.appComponent.showNavbar = false;

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  
  ngOnInit(): void {
    
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
