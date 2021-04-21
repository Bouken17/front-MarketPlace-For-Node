import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.api;
  token: string;
  userId: string;
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.initAuth();
  }

  initAuth(): void{
    if (typeof localStorage !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('auth'));//On recupère les authData stocker sur le navig sous chaine de carac et les transform en objet
      if (data) {//On verifie s'il y'a des données ds la variable data recuperer?
        if (data.userId && data.token) {//On regarde si ca contient le token et le userId?
          this.userId = data.userId;
          this.token = data.token;
          this.isAuth$.next(true);
        }
      }
    }
  }

  signUp(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.post(this.api + '/users/signup', { email: email, password: password }).subscribe(
          (signupData:{status:number,message:string}) => {

            if (signupData.status == 201) {
              //authentifier l'utilisateur
              this.signIn(email, password)
                .then(() => {
                  resolve(true);
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              reject(signupData.message);
            }
          },
          (err) => {
            reject(err)
          }
        )
      }
    )
  }

  signIn(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.post(this.api + '/users/login', { email: email, password: password }).subscribe(
          (authData:{token:string,userId:string}) => {//On recup le token et idUser des données recus
            this.token = authData.token;//On le met ds nos variables locals
            this.userId = authData.userId;//On le met ds nos variables locals
            this.isAuth$.next(true);//On declara que l'utilisateur est connecté
            //save authData in local
            if (typeof localStorage !== "undefined") {//Verifie si le navigateur supporte stockage local
              localStorage.setItem('auth', JSON.stringify(authData));//On le stock le authData convertit en chaine de carac
            }
            resolve(true);
          },
          (err) => {
            reject(err);
          }
      )

      }
    )
  }

  logOut() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth', null);
    }
  }

}
