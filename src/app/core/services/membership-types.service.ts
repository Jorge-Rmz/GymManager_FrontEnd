import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipTypesService {
  urlBase:string ='https://localhost:7025/api/MembershipTypes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': "Bearer " + this.cookie.get('session')!,
    })
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }
  // cambiar por interfaces
  getMembershipTypesAll(): Observable<any>{
    return this.http.get<any>(this.urlBase, this.httpOptions);
  }
}
