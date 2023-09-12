import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class MyService {
  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) {}

  // Almacenar un dato en el Local Storage
  guardarDato(nombreDato: any, dato:any): void {
    this.storageService.set(nombreDato, dato);
  }

  // Obtener un dato del Local Storage
  obtenerDato(nombreDato: any): any {
    return this.storageService.get(nombreDato);
  }

  // Eliminar un dato del Local Storage
  eliminarDato(nombreDato: any): void {
    this.storageService.remove(nombreDato);
  }

  eliminarDatos():void{
    this.storageService.clear()
  }
}
