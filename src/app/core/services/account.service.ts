import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, ResponseModelLogin, ResponseModelSignUp, SignUp, User, UserResponse } from '../interfaces/user';
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
  header(){
    let httpOptionsLogin = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': "Bearer " + this.cookie.get('session')!,
      })
    }
    return httpOptionsLogin;
  }

  getUser():Observable <UserResponse>{
    let url =  `${this.urlBase}api/users`;
    
    return this.http.get<UserResponse>(url, this.header());
  }

  editUser(id: string, request: Login):Observable<UserResponse>{
    let url =  `${this.urlBase}api/users/`+id;
    return this.http.put<UserResponse>(url,request, this.header());
  }

  // deleteCity(id: number):Observable<CityResponse>{
  //   let url =  `${this.urlBase}api/city/`+id;
  //   return this.http.delete<CityResponse>(url,this.httpOptions);
  // }
}
