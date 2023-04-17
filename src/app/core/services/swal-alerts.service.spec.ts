import { TestBed } from '@angular/core/testing';

import { SwalAlertsService } from './swal-alerts.service';

describe('SwalAlertsService', () => {
  let service: SwalAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
