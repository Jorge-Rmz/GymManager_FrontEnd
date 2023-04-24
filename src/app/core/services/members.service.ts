import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Members, MembersResponse } from '../interfaces/members';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  urlBase:string ='https://localhost:7025/api/Members';
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
  getMembersAll(): Observable<MembersResponse>{
    return this.http.get<MembersResponse>(this.urlBase, this.httpOptions);
  }
  addMembers(request: Members):Observable<MembersResponse>{
    return this.http.post<MembersResponse>(this.urlBase,request, this.httpOptions);
  }

  editMembers(id: number, request: Members):Observable<MembersResponse>{
    return this.http.put<MembersResponse>(this.urlBase+`/${id}`,request, this.httpOptions);
  }

  deleteMembers(id: number):Observable<MembersResponse>{
    return this.http.delete<MembersResponse>(this.urlBase+`/${id}`,this.httpOptions);
  }
}
