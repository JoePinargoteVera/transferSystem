import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LockGuard } from './guards/lock.guard';
import { AuthGuard } from './guards/auth.guard';
import { SingupComponent } from './pages/singup/singup.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { HistorialTransferenciasComponent } from './pages/historial-transferencias/historial-transferencias.component';
import { FormularioDeDepositoComponent } from './pages/formulario-de-deposito/formulario-de-deposito.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path:'login', component:LoginComponent, canActivate: [LockGuard]},
  {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path: 'singup', component:SingupComponent, canActivate: [LockGuard]},
  {path: 'transferencia', component:TransferComponent, canActivate: [AuthGuard]},
  {path: 'historial', component:HistorialTransferenciasComponent, canActivate: [AuthGuard]},
  {path: 'ingreso', component:FormularioDeDepositoComponent, canActivate: [AuthGuard]},
  {path: 'perfil', component:ProfileComponent, canActivate: [AuthGuard]},
  {path: 'configuracion', component:ConfiguracionComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
