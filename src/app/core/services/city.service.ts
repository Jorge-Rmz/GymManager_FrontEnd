import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, CityResponse } from '../interfaces/city';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  urlBase:string ='https://localhost:7025/';
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
  // cambiar a la interface
  getCityAll(): Observable<CityResponse>{
    let url =  `${this.urlBase}api/city`;
    return this.http.get<CityResponse>(url, this.httpOptions);
  }
  addCity(request: City):Observable<CityResponse>{
    let url =  `${this.urlBase}api/city`;
    return this.http.post<CityResponse>(url,request, this.httpOptions);
  }
  editCity(id: number, request: City):Observable<CityResponse>{
    let url =  `${this.urlBase}api/city/`+id;
    return this.http.put<CityResponse>(url,request, this.httpOptions);
  }

}
