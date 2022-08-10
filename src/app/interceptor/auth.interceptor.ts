import { switchMap } from 'rxjs/operators';
import { JwtDTO } from './../models/jwt-dto';
import { catchError, concatMap, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';

@Injectable()
export class PortfolioInterceptorService implements HttpInterceptor {

  url!: string;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.url = environment.url;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    // let intReq = req;
    const token = this.tokenService.getToken();

    let intReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(intReq);



    let tokenrefresh = '';

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 500) {
        console.log('Error 500');
      }

      if (err.status === 401 || err.error.message === "Unauthenticated.") {
        const dto: JwtDTO = new JwtDTO(token);
        console.log(dto);

        // return this.http.post(this.url + 'refresh', {}).pipe(
        //   switchMap((res: any) => {
        //     console.log(res);
        //     tokenrefresh = res.token;

        //     this.tokenService.setToken(res.token);

        //     return next.handle(req.clone({
        //       setHeaders: {
        //         Authorization: `Bearer ${tokenrefresh}`
        //       }
        //     }));
        //   })
        //   );




        return this.authService.refresh(dto).pipe(concatMap((data: any) => {
          console.log('Refrescando token');
          console.log(data);

          this.tokenService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      } else {
        this.tokenService.logOut();
        return throwError(err);
      }


    }));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    // return req.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
  }

}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: PortfolioInterceptorService, multi: true }];
