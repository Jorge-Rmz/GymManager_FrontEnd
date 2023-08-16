import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie';
import { CityService } from './city.service';
import { City, CityResponse } from '../interfaces/city';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('CityService', () => {
  let service: CityService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete', 'get']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService',['get']);

    service = new CityService(httpClientSpy, cookieServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all cities', (done: DoneFn) => {
    const mockResponse: CityResponse = {
      "hasError": false,
      "message": "List of cities returned",
      "model": [
        {
          "id": 2,
          "name": "Santa Maria",
        },
        {
          "id": 4,
          "name": "San Pedro",
        },
        {
          "id": 9,
          "name": "new City",
        },
        {
          "id": 10,
          "name": "City 10",
        },
        {
          "id": 11,
          "name": "city Test",
        },

      ],
      "requestId": "00-67b571f417f834d1b81cb7ce28ba6282-f6e7f32966276417-00"
    }
    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getCityAll().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(service.urlBase+'api/city', service.httpOptions);
  });

  it('should add a city successfully', (done: DoneFn) => {
    const mockResponse : CityResponse = {
      "hasError": false,
      "message": "List of cities returned",
      "model": [
        {
          "id": 2,
          "name": "Santa Maria",
        },
        {
          "id": 4,
          "name": "San Pedro",
        },
        {
          "id": 9,
          "name": "new City",
        },
        {
          "id": 10,
          "name": "City 10",
        },
        {
          "id": 11,
          "name": "New City",
        },

      ],
      "requestId": "00-67b571f417f834d1b81cb7ce28ba6282-f6e7f32966276417-00"
    }
    let city : City ={
      name:'New City'
    }
    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.addCity(city).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
    expect(httpClientSpy.post).toHaveBeenCalledOnceWith(service.urlBase+'api/city', city, service.httpOptions);
  });

  it('should edit a city successfully', (done: DoneFn) => {
    const mockResponse: CityResponse = {
      "hasError": false,
      "message": "City edited successfully",
      "model": [{
        "id": 1,
        "name": "New City Edited",
      },
      ],
      "requestId": "00-67b571f417f834d1b81cb7ce28ba6282-f6e7f32966276417-00"
    }
    const city: City = {
      name: 'New City Edited'
    }
    httpClientSpy.put.and.returnValue(of(mockResponse));

      service.editCity(1, city).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });
      expect(httpClientSpy.put).toHaveBeenCalledOnceWith(service.urlBase+'api/city/1', city, service.httpOptions);
    });




});
