
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent } from './admin-layout.component';
import { CookieService } from 'ngx-cookie/lib/cookie.service';
import { CookieModule, CookieOptionsProvider } from 'ngx-cookie';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Configura el espía para el método remove del CookieService
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['remove']);
    cookieServiceSpy.remove.and.stub(); // Configura el espía para remove

    // Configura el espía para el método navigate del Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true)); // Configura el espía para navigate

    await TestBed.configureTestingModule({
      declarations: [AdminLayoutComponent],
      providers: [
        // { provide: CookieService, useValue: cookieServiceSpy },
        // { provide: Router, useValue: routerSpy },
      ],
      imports: [CookieModule.forRoot(), RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });



  xit('should call the closeSession() method on confirm', () => {
    // Simula la alerta de SweetAlert cuando el usuario confirma el cierre de sesión
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true,
      isDenied: false,
      isDismissed: false,}));

    // Llama al método closeSession()
      component.closeSession();

      expect(cookieServiceSpy.remove).toHaveBeenCalled(); // Verifica que se haya llamado a remove
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/sign-in']);
    });


});
