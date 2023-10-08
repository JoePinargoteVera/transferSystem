import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginI } from '../../interfaces/login.interface';
import { UserI } from '../../interfaces/user.interface';
import { ApiService } from '../../services/api.service';
import { MyService } from '../../services/storage.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {

  url: string = 'http://127.0.0.1:8000/api/';
  login$: Observable<LoginI> = new Observable()
  email: any;
  user!: UserI;
  user2$: Observable<UserI> = new Observable()
  name: any;
  id: any;
  obj: any;
  obj3: any;
  tipo_usuario:any

    // , private router: Router
  constructor( private apiService: ApiService, private router: Router, private myService:MyService, private cookieService: CookieService) {
  }
  ngOnInit(): void {

    this.email = this.myService.obtenerDato('email');
    this.tipo_usuario = this.myService.obtenerDato('tipo_usuario')
    console.log(this.email);


    

  }
  navTransfer(){
    this.router.navigate(['transferencia'])
}

  navHistory(){
  this.router.navigate(['historial'])
}

  navIngreso(){
  this.router.navigate(['ingreso'])
}

  navPerfil(){
  this.router.navigate(['perfil'])
}

  navConfig(){
  this.router.navigate(['configuracion'])
}

  OnClick(email:string){
    this.router.navigate(['perfil'], { queryParams: {  email: email } });
  }
  OnClickHome(email:string){
    this.router.navigate(['home'])//
  }
  OnClickPlan(){
    this.router.navigate(['planes'])//
  }
  OnClickUser(){
    this.router.navigate(['users'])//
  }
  logOut(){
    this.apiService.logout().subscribe(() => {
      this.router.navigate(['login']);
      this.cookieService.delete('token');
        this.myService.eliminarDatos();
      
    });
  }

}
