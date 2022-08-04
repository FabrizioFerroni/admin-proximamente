import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { TokenService } from './../../service/token.service';
import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent implements OnInit {

  token!: string;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
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
