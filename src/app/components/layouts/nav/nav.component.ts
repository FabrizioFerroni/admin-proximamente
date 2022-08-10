import { DOCUMENT } from '@angular/common';
import { SuscriptoresService } from 'src/app/service/suscriptores.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../service/auth.service';
import { TokenService } from './../../../service/token.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  token!: string;
  name!: string;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private susService: SuscriptoresService,
    private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    this.token = tokenService.getToken();
  }

  ngOnInit(): void {
    let body = this._document.body;
    let script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'assets/js/scripts.js';
    this._renderer2.appendChild(body, script);
    this.susService.get_user(this.token).subscribe(
      res => {
        this.name = res.usuario.name;
      },
      err => {
        console.log(err);

      }
    )
  }

  logout(): void {
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
