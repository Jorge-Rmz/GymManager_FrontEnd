import { TestBed } from '@angular/core/testing';

import { MembersService } from './members.service';

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
