import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { TokenService } from './../../service/token.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SuscriptoresService } from 'src/app/service/suscriptores.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token!: string;

  total_sus = 0;
  total_baja = 0;
  totales: number = 0;
  total_user: number = 0;
  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title,
    private tokenService:TokenService,
    private authService:AuthService,
    private susService: SuscriptoresService,
    private router: Router,

  ) {
    this.token = tokenService.getToken();
    titleService.setTitle('Tablero - Admin Proximamente')
  }

  ngOnInit(): void {

    // let body = this._document.body;
    // let script = this._renderer2.createElement('script');
    // script.type = 'application/javascript';
    // script.src = 'assets/js/page/index-0.js';
    // this._renderer2.appendChild(body, script);
    this.get_total_sus();
    this.get_total_baja_sus();
    this.get_total_user();
  }

  get_total_sus(): void{
    this.susService.get_total_suscriber(this.token).subscribe(
      res => {
        this.total_sus = res.total;
      },
      err => {
        console.log(err);

      }
    )
  }

  get_total_baja_sus(): void{
    this.susService.get_total_baja_suscriber(this.token).subscribe(
      res => {
        this.total_baja = res.total;
      },
      err => {
        console.log(err);

      }
    )
  }

  get_total_user(): void{
    this.susService.get_total_users(this.token).subscribe(
      res => {
        this.total_user = res.total;
      },
      err => {
        console.log(err);

      }
    )
  }

}
