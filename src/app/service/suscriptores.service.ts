import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuscriptoresService {

  url!: string;
  // token!: string;
  constructor(
    private _http: HttpClient,
    // private tokenService: TokenService,
  ) {
    this.url = environment.url;
    // this.token = tokenService.getToken();
  }

  get_total_suscriber(token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.get(this.url + 'suscriptores/count', { headers: headers });
  }

  get_total_baja_suscriber(token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.get(this.url + 'baja-suscriptores/count', { headers: headers });
  }

  get_total_users(token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.get(this.url + 'usuarios/count', { headers: headers });
  }

  get_suscriber(token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.get(this.url + 'suscriptores', { headers: headers });
  }

  get_suscriber_per_id(id: number, token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.get(this.url + 'suscriptor/' + id, { headers: headers });
  }

  put_suscriber_per_id(id: number, data: any, token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.put(this.url + 'suscriptor/' + id + '/editar', data, { headers: headers });
  }

  get_baja_suscriber(token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.get(this.url + 'baja-suscriptores', { headers: headers });
  }

  get_users(token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.get(this.url + 'usuarios', { headers: headers });
  }

  get_user(token: string): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    return this._http.get(this.url + 'user', { headers: headers });
  }
}
