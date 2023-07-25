import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitLayoutComponent } from './init-layout.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CookieService, CookieOptionsProvider, CookieModule } from 'ngx-cookie';
import { RouterTestingModule } from '@angular/router/testing';

describe('InitLayoutComponent', () => {
  let component: InitLayoutComponent;
  let fixture: ComponentFixture<InitLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({  
      declarations: [InitLayoutComponent, NavbarComponent ],
      providers: [CookieService, CookieOptionsProvider],
      imports: [CookieModule.forRoot(), RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
