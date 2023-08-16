import { TestBed } from '@angular/core/testing';

import { AttendanceService } from './attendance.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { of, throwError } from 'rxjs';
import { AttendanceResponse } from '../interfaces/attendance';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete', 'get']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService',['get']);
    service = new AttendanceService(httpClientSpy, cookieServiceSpy );
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all attendance', (done: DoneFn) => {
    const mockResponse: AttendanceResponse= {
    hasError: false,
    message: "List of attendances returned",
    model: [
      {
        id: 7,
        dateIn: new Date("2023-06-20T19:58:29.884Z"),
        dateOut: new Date("2023-06-20T19:59:44.687448"),
        "member": {
          "id": 7,
          "name": "Jorge ",
          "lastName": "Mendoza ",
          "birthDay": new Date("2016-12-22T06:00:00"),
          "email": "jorge@gmail.com",
          "allowNewsLetter": false,
          "registeredOn": new Date("0001-01-01T00:00:00"),
          "membershipEnd": new Date("2023-10-10T00:00:00"),
          "cityId": 3,
          "membershipTypeId": 2
        }
      },
      {
        "id": 17,
        "dateIn": new Date("2023-06-23T16:06:09.111511"),
        "dateOut": new Date("2023-06-23T22:29:05.283268"),
        "member": {
          "id": 3,
          "name": "Jorge Alberto",
          "lastName": "Mendoza Ramirez",
          "birthDay": new Date("2023-04-25T18:58:58.275"),
          "email": "user@example.com",
          "allowNewsLetter": true,
          "registeredOn": new Date("2023-06-17T22:08:35"),
          "membershipEnd":new Date("2023-10-17T00:00:00"),
          "cityId": 11,
          "membershipTypeId": 2
        }
      }
      ],
        "requestId": "00-c6c1b743cdf8aa3ff831fcb66a9ea464-524803b316cfbe61-00",
        };
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getAttendanceAll().subscribe((response) => {
      console.log(response);
      expect(response).toEqual(mockResponse);
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(service.urlBase, service.httpOptions);
  });

  it('should get attendance for today',(done: DoneFn)=>{
    const mockResponse: AttendanceResponse= {
      hasError: false,
      message: "List of attendances returned",
      model: [
        {
          id: 9,
          dateIn: new Date("2023-06-20T19:58:29.884Z"),
          dateOut: new Date("2023-06-20T19:59:44.687448"),
          "member": {
            "id": 7,
            "name": "Jorge ",
            "lastName": "Mendoza ",
            "birthDay": new Date("2016-12-22T06:00:00"),
            "email": "jorge@gmail.com",
            "allowNewsLetter": false,
            "registeredOn": new Date("0001-01-01T00:00:00"),
            "membershipEnd": new Date("2023-10-10T00:00:00"),
            "cityId": 3,
            "membershipTypeId": 2
          }
        },
        {
          "id": 17,
          "dateIn": new Date("2023-06-23T16:06:09.111511"),
          "dateOut": new Date("2023-06-23T22:29:05.283268"),
          "member": {
            "id": 3,
            "name": "Jorge Alberto",
            "lastName": "Mendoza Ramirez",
            "birthDay": new Date("2023-04-25T18:58:58.275"),
            "email": "user@example.com",
            "allowNewsLetter": true,
            "registeredOn": new Date("2023-06-17T22:08:35"),
            "membershipEnd":new Date("2023-10-17T00:00:00"),
            "cityId": 11,
            "membershipTypeId": 2
          }
        }
      ],
        "requestId": "00-c6c1b743cdf8aa3ff831fcb66a9ea464-524803b316cfbe61-00",
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getAttendanceToday().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(service.urlBase+'/today', service.httpOptions);
  });

  
  it('should add attendance', (done: DoneFn) => {
    const id :number = 3;
    const mockResponse: AttendanceResponse = {
      hasError: false,
      message: "In Registered",
      model: [
        {
      "id": 41,
      "dateIn": new Date("2023-08-09T20:59:25.958805-06:00"),
      "dateOut": new Date("0001-01-01T00:00:00"),
      "member": {
        "id": 3,
        "name": "Jorge Alberto",
        "lastName": "Mendoza Ramirez",
        "birthDay": new Date("2023-04-25T18:58:58.275"),
        "email": "user@example.com",
        "allowNewsLetter": true,
        "registeredOn": new Date("2023-06-17T22:08:35"),
        "membershipEnd":new Date( "2023-10-17T00:00:00"),
        "cityId": 11,
        "membershipTypeId": 2
        }
        }
      ],
        "requestId": "00-c6c1b743cdf8aa3ff831fcb66a9ea464-524803b316cfbe61-00",
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.addAttendance(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
    expect(httpClientSpy.post).toHaveBeenCalledOnceWith(service.urlBase+'/3', service.httpOptions);  
  });

  it('should edit attendance', (done: DoneFn) => {
    const id :number = 3;
    const mockResponse: AttendanceResponse = {
      hasError: false,
      message: "Out registered",
      model: [
        {
      "id": 41,
      "dateIn": new Date("2023-08-09T20:59:25.958805-06:00"),
      "dateOut": new Date("2023-08-09T21:31:43.590769-06:00"),
      "member": {
        "id": 3,
        "name": "Jorge Alberto",
        "lastName": "Mendoza Ramirez",
        "birthDay": new Date("2023-04-25T18:58:58.275"),
        "email": "user@example.com",
        "allowNewsLetter": true,
        "registeredOn": new Date("2023-06-17T22:08:35"),
        "membershipEnd":new Date( "2023-10-17T00:00:00"),
        "cityId": 11,
        "membershipTypeId": 2
        }
        },
         {
          "id": 21,
          "dateIn": new Date("2023-06-23T21:59:17.26046"),
          "dateOut": new Date("2023-06-23T21:59:48.886198"),
          "member": {
            "id": 5,
            "name": "JOrge",
            "lastName": "AF1",
            "birthDay": new Date("2023-06-05T19:02:09.933"),
            "email": "user@example.com",
            "allowNewsLetter": true,
            "registeredOn": new Date("2023-06-16T10:09:33"),
            "membershipEnd": new Date("2023-07-16T00:00:00"),
            "cityId": 3,
            "membershipTypeId": 14
          }
        },
      ],
        "requestId": "00-c6c1b743cdf8aa3ff831fcb66a9ea464-524803b316cfbe61-00",
    };
    httpClientSpy.put.and.returnValue(of(mockResponse));

    service.editAttendance(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
    expect(httpClientSpy.put).toHaveBeenCalledOnceWith(service.urlBase+'/3', service.httpOptions);  
  });


  it('should delete attendance', (done: DoneFn) => {
    const id :number = 3;
    const mockResponse: AttendanceResponse = {
      hasError: false,
      message: "Attendance Deleted",
      model: [
         {
          "id": 21,
          "dateIn": new Date("2023-06-23T21:59:17.26046"),
          "dateOut": new Date("2023-06-23T21:59:48.886198"),
          "member": {
            "id": 5,
            "name": "JOrge",
            "lastName": "AF1",
            "birthDay": new Date("2023-06-05T19:02:09.933"),
            "email": "user@example.com",
            "allowNewsLetter": true,
            "registeredOn": new Date("2023-06-16T10:09:33"),
            "membershipEnd": new Date("2023-07-16T00:00:00"),
            "cityId": 3,
            "membershipTypeId": 14
          }
        },
      ],
        "requestId": "00-c6c1b743cdf8aa3ff831fcb66a9ea464-524803b316cfbe61-00",
    };
    httpClientSpy.delete.and.returnValue(of(mockResponse));

    service.deleteAttendance(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
    expect(httpClientSpy.delete).toHaveBeenCalledOnceWith(service.urlBase+'/3', service.httpOptions);  
  });



});
