import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { TokenService } from './../../service/token.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title,
    private tokenService:TokenService,
    private authService:AuthService,
    private router: Router
  ) {
    this.token = tokenService.getToken();
  }

  ngOnInit(): void {
    console.log(this.token);

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
