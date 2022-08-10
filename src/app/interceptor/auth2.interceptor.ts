import { Router } from '@angular/router';
import { TokenService } from './../service/token.service';
import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
const TOKEN_HEADER_KEY = 'Authorization';  // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';    // for Node.js Express back-end
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;

    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('/iniciarsesion') && error.status === 401) {
        return this.handle401Error(authReq, next);

        // this.tokenService.logOut();
        // this.router.navigateByUrl("/iniciarsesion");
      }
      return throwError(error);
    }));
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.getToken();
      if (token) {
        console.log(request);

        return this.authService.refresh_token(this.tokenService.getToken()).pipe(
          switchMap((res: any) => {
            console.log("Hasta aca entro");
            console.log("resfrescando token");

            this.isRefreshing = false;
            this.tokenService.setToken(res.token);
            this.refreshTokenSubject.next(res.token);

            return next.handle(this.addTokenHeader(request, res.token));
          }),
          catchError((err) => {
            console.log("Hasta aca entro 6");

            console.log(err);
            console.log("no se refresco token");

            this.isRefreshing = false;
            this.authService.cerrarsesion(token);
            return throwError(err);
          })
        );
      }

    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    console.log(token);


    /* for Spring Boot back-end */
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    /* for Node.js Express back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
