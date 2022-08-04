import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerticalComponent } from './components/nav/vertical/vertical.component';
import { FooterComponent } from './components/footer/footer.component';
import { SuscriptoresComponent } from './components/suscriptores/suscriptores.component';
import { BajaSuscriptoresComponent } from './components/baja-suscriptores/baja-suscriptores.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    VerticalComponent,
    FooterComponent,
    SuscriptoresComponent,
    BajaSuscriptoresComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
