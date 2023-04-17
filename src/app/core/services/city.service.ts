import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  token: string = "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI4MjFlNDllZS1mYjUyLTQ2NTgtODk4OC1mNjcyNDFmNGJhZDEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiam9yZ2VAZ21haWwuY29tIiwiZXhwIjoxNjgxNzk0MTQ4LCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.96sSIIk5UMIkqWGpnKsTilSKQS_7olI211mJ5RuUWc4";

  urlBase:string ='https://localhost:7025/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.token,
    })
  }
  constructor(
    private http: HttpClient
  ) { }
  // cambiar a la interface
  getCityAll(): Observable<any>{
    let url =  `${this.urlBase}api/city`;
    return <any>this.http.get(url, this.httpOptions);
  }
  addCity(request: City):Observable<any>{
    let url =  `${this.urlBase}api/city`;
    return <any>this.http.post(url,request, this.httpOptions);
  }

}
