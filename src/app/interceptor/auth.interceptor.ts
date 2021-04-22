import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.token;//On recupère la clée
    const newRequest = request.clone({//On fait une nouvelle requete depuis l'ancienne
      headers: request.headers.set('Authorization', 'Bearer ' + token)//on ajoute l'autorisation à notre clée token
    })
    return next.handle(newRequest);//relancer la nouvelle requete
  }
}
