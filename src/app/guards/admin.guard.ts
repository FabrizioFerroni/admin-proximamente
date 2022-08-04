import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    public router: Router,
  ) {

  }

  canActivate(): any {
    if (!this.authService.isAuntheticated()) {
      this.router.navigate(['/iniciarsesion']);
      return false;
    } else {
      return true;
    }
  }

}
