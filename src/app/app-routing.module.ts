import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { BajaSuscriptoresComponent } from './components/baja-suscriptores/baja-suscriptores.component';
import { SuscriptoresComponent } from './components/suscriptores/suscriptores.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'tablero', component: DashboardComponent, canActivate:[AdminGuard]},
  {path:'suscriptores', component: SuscriptoresComponent, canActivate:[AdminGuard]},
  {path:'baja-suscriptores', component: BajaSuscriptoresComponent, canActivate:[AdminGuard]},
  {path:'usuarios', component: UsuariosComponent, canActivate:[AdminGuard]},
  {path:'iniciarsesion', component: LoginComponent},
  {path:'', redirectTo:'tablero', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
