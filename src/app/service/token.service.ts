import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  url!: string;

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.url = environment.url;
  }

  setToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }


  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || "";
  }

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  getId(): string {
    if (!this.isLogged()) {
      return '';
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const id = values.sub;
    return id;
  }

  logOut(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
