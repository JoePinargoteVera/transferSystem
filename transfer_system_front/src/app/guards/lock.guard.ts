
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class LockGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(): boolean {
    if (this.apiService.isAuthenticated()) {
      this.router.navigate(['/home']); // Redirige a la página de inicio si ya está autenticado
      return false;
    } else {
      return true;
    }
  }
}
