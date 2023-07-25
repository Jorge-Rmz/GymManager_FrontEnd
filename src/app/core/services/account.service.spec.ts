import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieModule, CookieService } from 'ngx-cookie';
import { Login, ResponseModelLogin, ResponseModelSignUp, SignUp, UserResponse } from '../interfaces/user';


describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CookieModule.forRoot()],
      providers: [AccountService, CookieService]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call SignIn API', () => {
    const mockLogin: Login = {
      userName: 'testuser',
      password: 'testpassword',
      phoneNumber: '1234567890',
    };

    const mockResponse: ResponseModelLogin = {
      hasError: false,
      message: 'Login successful',
      model: {
        title: 'Mr.',
        accessToken: 'sampleAccessToken123',
        code: '',
        description: ''
      },
      requestId: 'sampleRequestId123',
    };

    service.SingIn(mockLogin).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.urlBase}api/account`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });


  it('should call SignUp API', () => {
    const mockSignUp: SignUp = {
      email: 'test@example.com',
      password: 'testpassword',
      phoneNumber: '1234567890',
    };

    const mockResponse: ResponseModelSignUp = {
      hasError: false,
      message: 'Sign-up successful',
      model: [
        {
          code: '1',
          description: 'User created successfully',
        },
      ],
      requestId: 'sampleRequestId123',
    };

    service.SingUp(mockSignUp).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.urlBase}api/users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });


  it('should call getUser API', () => {
    const mockResponse: UserResponse = {
      hasError: false,
      message: 'User data retrieved successfully',
      model: [
        {
          id: '3',
          userName: 'johndoe@example.com',
          phoneNumber: '1234567890',
        },
      ],
      requestId: 'sampleRequestId123',
    };

    service.getUser().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.urlBase}api/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


it('should call editUser API', () => {
  const mockUserId = 'sampleUserId'; // Provide a sample user ID
  const mockRequest: SignUp = {
    email: 'updatedemail@example.com',
    password: 'newpassword', // Include password if required
    phoneNumber: '9876543210',
  };

  const mockResponse: UserResponse = {
    hasError: false,
    message: 'User updated successfully',
    model: [
      {
        id: '3',
        userName: 'johndoe@example.com',
        phoneNumber: '1234567890',
      },
    ],
    requestId: 'sampleRequestId123', // Replace with a generated request ID
  };

  service.editUser(mockUserId, mockRequest).subscribe((response) => {
    expect(response).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${service.urlBase}api/users/${mockUserId}`);
  expect(req.request.method).toBe('PUT');
  req.flush(mockResponse);
});

it('should call deleteUser API', () => {
  const mockUserId = 'sampleUserId'; // Provide a sample user ID

  const mockResponse: UserResponse = {
    hasError: false,
    message: 'User deleted successfully',
    model: [],
    requestId: 'sampleRequestId123', // Replace with a generated request ID
  };

  service.deleteUser(mockUserId).subscribe((response) => {
    expect(response).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${service.urlBase}api/users/${mockUserId}`);
  expect(req.request.method).toBe('DELETE');
  req.flush(mockResponse);
});


});
