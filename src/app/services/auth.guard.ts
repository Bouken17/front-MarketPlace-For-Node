import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router:Router){}
  canActivate(): Promise<boolean | UrlTree>{
    return new Promise(
      (resolve, reject) => {
        this.auth.isAuth$.subscribe(
          (bool: boolean) => {
            const isAuth = bool;
            if (isAuth) {
              resolve(isAuth);
            } else {
              this.router.navigate(['/signin'])
              reject(isAuth)
            }
          }
        )
      }
    );
  }

}
