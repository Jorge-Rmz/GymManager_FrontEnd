import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment, EquipmentResponse } from '../interfaces/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  urlBase:string ='https://localhost:7025/api/EquipmentTypes';
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
  getEquipmentAll(): Observable<EquipmentResponse>{
    return this.http.get<EquipmentResponse>(this.urlBase, this.httpOptions);
  }
  addEquipment(request: Equipment):Observable<EquipmentResponse>{
    return this.http.post<EquipmentResponse>(this.urlBase,request, this.httpOptions);
  }

  editEquipment(id: number, request: Equipment):Observable<EquipmentResponse>{
    return this.http.put<EquipmentResponse>(this.urlBase+`/${id}`,request, this.httpOptions);
  }

  deleteEquipment(id: number):Observable<EquipmentResponse>{
    return this.http.delete<EquipmentResponse>(this.urlBase+`/${id}`,this.httpOptions);
  }
}
