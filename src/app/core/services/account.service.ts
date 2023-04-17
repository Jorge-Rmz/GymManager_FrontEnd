import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, ResponseModelLogin, ResponseModelSignUp, SignUp, UserResponse } from '../interfaces/user';

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

  constructor(private http: HttpClient) { }
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
        'Authorization': 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI4MjFlNDllZS1mYjUyLTQ2NTgtODk4OC1mNjcyNDFmNGJhZDEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiam9yZ2VAZ21haWwuY29tIiwiZXhwIjoxNjgxNDA2ODA2LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.GifUzt-BcG3GOlblr2M-AuI03EJ-Rz9Ow0bmuyj_fP8',
      })
    }
    return this.http.get<UserResponse>(url, this.httpOptions);
  }
}
