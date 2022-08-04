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
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) {
    this.token = tokenService.getToken();
  }

  ngOnInit(): void {
  }


  cerrarsesion(): void {
    this.authService.cerrarsesion(this.token).subscribe(
      res => {
        iziToast.success({
          title: 'ÉXITO',
          message: res.message,
          position: 'topRight',
        });
        this.router.navigate(['/iniciarsesion']);
      },
      err => {
        console.log(err);
        iziToast.error({
          title: 'ERROR',
          message: err.error.message,
          position: 'topRight',
        });
      }
    )
  }

}
