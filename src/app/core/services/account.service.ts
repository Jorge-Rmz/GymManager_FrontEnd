import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, ResponseModelLogin, ResponseModelSignUp, SignUp, UserResponse } from '../interfaces/user';
import { CookieService } from 'ngx-cookie';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  urlBase:string ='https://localhost:7025/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }
  // cambiar a la interface
  SingIn(request: Login): Observable<ResponseModelLogin>{
    let url =  `${this.urlBase}api/account`;
    return this.http.post<ResponseModelLogin>(url,request, this.httpOptions);
  }
  SingUp(request: SignUp):Observable<ResponseModelSignUp>{
    let url =  `${this.urlBase}api/users`;
    return this.http.post<ResponseModelSignUp>(url,request, this.httpOptions);
  }

  getUser():Observable <UserResponse>{
    let url =  `${this.urlBase}api/users`;
    let httpOptionsLogin = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': "Bearer " + this.cookie.get('session')!,
      })
    }
    return this.http.get<UserResponse>(url, httpOptionsLogin);
  }
}
