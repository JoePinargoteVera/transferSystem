import { Component, OnInit } from "@angular/core";
import { LoginI } from "src/app/interfaces/login.interface";
import { Observable } from "rxjs";
import { UserI } from "src/app/interfaces/user.interface";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { MyService } from "src/app/services/storage.service";
import { tap, catchError } from 'rxjs/operators';
import { ProductoI } from "src/app/interfaces/producto.interface";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    url: string = 'http://127.0.0.1:8000/api/';
    login$: Observable<LoginI> = new Observable()
    email: any;
    user2$: Observable<UserI> = new Observable()
    name: any;
    id: any;
    producto: Observable<ProductoI> = new Observable()
    obj: any;
    obj3: any;
    user_email!: string;
    tipo_usuario!: string
    errorMessage!: string;


    constructor(private appComponent: AppComponent, private myService: MyService, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
        this.appComponent.showNavbar = true;
    }


    ngOnInit(): void {



        this.email = this.myService.obtenerDato('email');
        this.tipo_usuario = this.myService.obtenerDato('tipo_usuario')

        this.user2$ = this.getUser2(this.email);
        this.user2$.subscribe(dato => {
            this.name = dato.name;
            this.id = dato.id
            // this.store.dispatch(loginSuccess({ email: this.email, id: this.id }))
            if (this.tipo_usuario == 'owner') {
                // this.empresas = this.getEmpresa(this.id)
            } else if (this.tipo_usuario == 'admin') {
                // this.empresas = this.getEmpresas()
            }
            // this.empresas = this.getEmpresa(this.id)
            // console.log(this.empresas);

            // this.empresas.pipe(
            //     tap(dato => {
            //         this.obj3 = dato
            //         this.obj = Object.values(this.obj3)
            //     })
            //     ,
            //     catchError(error => {
            //         this.errorMessage = error.error.error;
            //         throw error;
            //     })
            // ).subscribe();
        })

    }


    OnClick(id_empresa: number, nombre: string, id_user: number) {
        this.router.navigate(['/employ'], { queryParams: { id: id_empresa, nombre_empresa: nombre, id_user } });
    }

    OnClickRol(id: number) {
        this.router.navigate(['/nominas'], { queryParams: { id: id } });
    }
    OnClickConf(id: number) {
        this.router.navigate(['/config'], { queryParams: { id: id } });
    }
    OnCLickInfo(id: number) {
        this.router.navigate(['/empresa-info'], { queryParams: { id: id } });
    }
    OnClickDelete(id: number) {
        const resp = this.http.delete<ProductoI>(this.url + 'producto/eliminar?id=' + id)
        resp.subscribe(dato => {
            this.obj = this.obj.filter((empresa: { id: number; }) => empresa.id !== id)
            if (Object.keys(this.obj).length === 0) {
                this.errorMessage = 'no se encontraron productos registrados para esta categoria';
            } else {
                this.errorMessage = ''
            }
        })

        return resp
    }
    getUser2(dato: string) {
        // let direccion = this.url + 'loglogin'
        const resp = this.http.get<UserI>(this.url + 'user/find?email=' + dato);
        return resp
    }

    // actualizarEmpresas() {
    //     this.empresas.subscribe(dato => {

    //         this.obj3 = dato
    //         this.obj = Object.values(this.obj3)
    //         this.errorMessage = '';
    //     })
    // }
    // getEmpleados(id:number) {
    //     const resp = this.http.get<EmpleadoI>(this.url + 'empleado/listar-por-empresa?empresa_id=' +id);
    //     return resp
    // }
    // getEmpresa(dato: string) {
    //     // let direccion = this.url + 'loglogin'
    //     const resp = this.http.get<Empresa>(this.url + 'empresa/buscar?user_id=' + dato);
    //     return resp
    // }

    // getEmpresas() {
    //     const resp = this.http.get<Empresa>(this.url + 'empresa/ver')
    //     return resp
    // }

}