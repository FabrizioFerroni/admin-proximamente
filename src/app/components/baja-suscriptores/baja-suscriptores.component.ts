import { Title } from '@angular/platform-browser';
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
  load_data: boolean = true;
  page: number = 1;
  pageSize: number = 20;

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private susService: SuscriptoresService,
    private router: Router,
    private titleService: Title
  ) {
    this.token = tokenService.getToken();
    titleService.setTitle('Baja Suscriptores - Admin Proximamente')
   }

  ngOnInit(): void {
    this.get_baja_suscribers();
  }


  get_baja_suscribers(): void{
    this.susService.get_baja_suscriber(this.token).subscribe(
      res => {
        this.baja_suscriptores = res.data;
        this.load_data = false;
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
