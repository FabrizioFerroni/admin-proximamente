import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';

const TOKEN_KEY = 'AuthToken';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

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
    // return this._http.post(this.url + 'logout', token);

  }


  refresh_token(token: string): Observable<any>{
    // let headers = new HttpHeaders().set('Authorization', 'Bearer ' +  token );
    // return this._http.post(this.url + 'refresh', token, { headers: headers });
    return this._http.post(this.url + 'refresh', token);
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' +  dto );
    return this._http.post<JwtDTO>(this.url + 'refresh', dto);
    // return this._http.post<JwtDTO>(this.url + 'refresh', dto, { headers: headers });
  }
}
