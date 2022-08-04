import { TokenService } from './../../service/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-baja-suscriptores',
  templateUrl: './baja-suscriptores.component.html',
  styleUrls: ['./baja-suscriptores.component.css']
})
export class BajaSuscriptoresComponent implements OnInit {

  token!: string;
  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router: Router
  ) {
    this.token = tokenService.getToken();
   }

  ngOnInit(): void {
  }


  cerrarsesion(): void{
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
