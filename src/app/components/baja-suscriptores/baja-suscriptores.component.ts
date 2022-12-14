import { TokenService } from './../../service/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SuscriptoresService } from 'src/app/service/suscriptores.service';

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
  baja_suscriptores: Array<any> =[];
  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private susService: SuscriptoresService,
    private router: Router
  ) {
    this.token = tokenService.getToken();
   }

  ngOnInit(): void {
    this.get_baja_suscribers();
  }


  get_baja_suscribers(): void{
    this.susService.get_baja_suscriber(this.token).subscribe(
      res => {
        this.baja_suscriptores = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }


  cerrarsesion(): void{
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
