import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Membership, MembershipResponse } from '../interfaces/membership';

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
  getMembershipTypesAll(): Observable<MembershipResponse>{
    return this.http.get<MembershipResponse>(this.urlBase, this.httpOptions);
  }
  addMembership(request: Membership):Observable<MembershipResponse>{
    return this.http.post<MembershipResponse>(this.urlBase,request, this.httpOptions);
  }

  editMembership(id: number, request: Membership):Observable<MembershipResponse>{
    return this.http.put<MembershipResponse>(this.urlBase+`/${id}`,request, this.httpOptions);
  }

  deleteMembership(id: number):Observable<MembershipResponse>{
    return this.http.delete<MembershipResponse>(this.urlBase+`/${id}`,this.httpOptions);
  }
}
