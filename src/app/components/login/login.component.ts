import { TokenService } from './../../service/token.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  data: any = {};
  token!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.token = tokenService.getToken();
   }

  ngOnInit(): void {
    if(this.token){
      this.router.navigate(['/']);
    }
  }


  cambiarTipo() {
    let elemento: any = document.getElementById('password');
    if ($('#rememberMe').is(':checked')) {
      $('#rememberMe').prop('checked', true);
      elemento.type = "text";
    } else {
      $('#rememberMe').prop('checked', false);
      elemento.type = "password";
    }
  }


  onLogin(login: any): void {
    if (login.valid) {
      this.data = {
        email: this.email,
        password: this.password
      }
      this.authService.iniciarsesion(this.data).subscribe(
        res => {
          console.log(res);
          this.email = '';
          this.password = '';
          this.tokenService.setToken(res.authorization.token);
          iziToast.success({
            title: 'ÉXITO',
            message: res.mensaje,
            position: 'topRight',
          });
          this.router.navigate(['/tablero']);
        },
        err => {
          iziToast.error({
            title: 'ERROR',
            message: err.error.message,
            position: 'topRight',
          });
        }
      )


    }
  }
}
