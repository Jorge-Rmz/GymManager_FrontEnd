import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  urlBase:string ='';
  httpOptions = {
    headers:  {
      'Content-Type':'application/json'
    }
  }

  constructor(private http: HttpClient) { }
  // cambiar a la interface
  SingIn(request: any){
    let url =  `${this.urlBase}api/Account`;
    this.http.post<any>(url,request, this.httpOptions);
  }
}
