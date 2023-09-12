import { EventEmitter, Injectable, Output } from '@angular/core';
import { ResponseI } from '../interfaces/response.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = 'http://127.0.0.1:8000/api/'


  // @Output()
  // loginEmitter = new EventEmitter<LoginI>();
  
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService
    ) { }

  login(form:any):Observable<ResponseI>{
    let direccion = this.url + 'auth/login'
    return this.http.post<ResponseI>(direccion, form);
  }

  logout(): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = { headers: headers };
    return this.http.post<any>(`${this.url}auth/logout`, {}, options);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  
}
