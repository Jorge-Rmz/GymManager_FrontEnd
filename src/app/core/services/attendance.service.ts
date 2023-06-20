import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance, AttendanceResponse } from '../interfaces/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  urlBase:string ='https://localhost:7025/api/Attendance';
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


  getAttendanceAll(): Observable<AttendanceResponse>{
    return this.http.get<AttendanceResponse>(this.urlBase, this.httpOptions);
  }
  addAttendance(request: Attendance):Observable<AttendanceResponse>{
    return this.http.post<AttendanceResponse>(this.urlBase,request, this.httpOptions);
  }

  editAttendance(id: number, request: Attendance):Observable<AttendanceResponse>{
    return this.http.put<AttendanceResponse>(this.urlBase+`/${id}`,request, this.httpOptions);
  }

  deleteAttendance(id: number):Observable<AttendanceResponse>{
    return this.http.delete<AttendanceResponse>(this.urlBase+`/${id}`,this.httpOptions);
  }

}

