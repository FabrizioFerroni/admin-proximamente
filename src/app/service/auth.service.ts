import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'AuthToken';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url!: string;
  constructor(
    private _http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.url = environment.url;

  }

  iniciarsesion(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', data, { headers: headers });
  }

  isAuntheticated(): boolean {

    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return false;
    }

    return true;

  }

  cerrarsesion(token: string): Observable<any> {
    localStorage.removeItem(TOKEN_KEY);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.post(this.url + 'logout', token, { headers: headers });
  }
}
