import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDialogComponent } from './member-dialog.component';

describe('MemberDialogComponent', () => {
  let component: MemberDialogComponent;
  let fixture: ComponentFixture<MemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    console.log('hola');
  });
});
