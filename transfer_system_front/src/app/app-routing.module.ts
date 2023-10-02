import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LockGuard } from './guards/lock.guard';
import { AuthGuard } from './guards/auth.guard';
import { SingupComponent } from './pages/singup/singup.component';
import { TransferComponent } from './pages/transfer/transfer.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path:'login', component:LoginComponent, canActivate: [LockGuard]},
  {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path: 'singup', component:SingupComponent, canActivate: [LockGuard]},
  {path: 'transfer', component:TransferComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
