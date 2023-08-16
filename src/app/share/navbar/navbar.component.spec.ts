import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieModule, CookieOptionsProvider, CookieService } from 'ngx-cookie';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [CookieOptionsProvider],
      imports: [CookieModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests that isLoggedIn is initialized to false
  it('should initialize isLoggedIn to false', () => {
    expect(component.isLoggedIn).toBeFalse();
  });

});

