import { TestBed } from '@angular/core/testing';


import { MembershipTypesService } from './membership-types.service';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';

describe('MembershipTypesService', () => {
  let service: MembershipTypesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete', 'get']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService',['get']);
    
    service = new MembershipTypesService(httpClientSpy, cookieServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
