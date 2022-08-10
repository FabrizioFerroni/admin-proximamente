import { Router } from '@angular/router';
import { TokenService } from './../service/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthIInterceptor implements HttpInterceptor {

  refresh = false;
  url!: string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
    this.url = environment.url;

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    const accessToken = this.tokenService.getToken();

    if (accessToken) {

      const req = request.clone({
        setHeaders: {
          authorization: `Bearer ${accessToken}`
        }
      })
      return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;
          this.tokenService.logOut();
          this.router.navigateByUrl("/iniciarsesion");
        }
        this.refresh = false;
        return throwError(() => err);
      }));
    }
    return next.handle(request)
  }
}

export const intAuth = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthIInterceptor, multi: true }
];
