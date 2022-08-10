import { Title } from '@angular/platform-browser';
import { SuscriptoresService } from 'src/app/service/suscriptores.service';
import { TokenService } from './../../service/token.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  token!: string;
  usuarios: Array<any> = [];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private susService: SuscriptoresService,
    private router: Router,
    private titleService: Title
    ) {
    this.token = tokenService.getToken();
    titleService.setTitle('Usuarios - Admin Proximamente')
  }

  ngOnInit(): void {
    this.get_users();
  }

  get_users(): void {
    this.susService.get_users(this.token).subscribe(
      res=> {
        this.usuarios = res.usuarios;
        console.log(res);

      },
      err =>{
        console.log(err);

      }
    )
  }

  cerrarsesion(): void {
    this.authService.cerrarsesion(this.token).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/iniciarsesion']);
      },
      err => {
        console.log(err);
        this.router.navigate(['/iniciarsesion']);

      }
    )
  }

}
