import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceComponent } from './attendance.component';
import { AttendanceService } from 'src/app/core/services/attendance.service';

describe('AttendanceComponent', () => {
  let service:AttendanceService;
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceComponent ],
    })
    .compileComponents();

    service = TestBed.inject(AttendanceService);
    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    console.log('hola');
  });



});
