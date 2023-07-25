import { TestBed } from '@angular/core/testing';

import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
