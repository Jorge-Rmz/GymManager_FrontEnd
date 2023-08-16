import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { UserSet } from 'src/app/core/state/user/user.actions';
import { UserState } from 'src/app/core/state/user/user.state';
import { UsersComponent } from './users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSwalAlertsService: jasmine.SpyObj<SwalAlertsService>;
  let mockUserState: jasmine.SpyObj<UserState>;

  const mockUsers: User[] = [
    // mock user data here
  ];

  beforeEach(() => {
    mockAccountService = jasmine.createSpyObj('AccountService', ['getUser', 'deleteUser']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSwalAlertsService = jasmine.createSpyObj('SwalAlertsService', ['messageAlert', 'erorrAlert']);
    mockUserState = jasmine.createSpyObj('UserState', ['getUser']);

    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: SwalAlertsService, useValue: mockSwalAlertsService },
        { provide: UserState, useValue: mockUserState },
      ],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    // mockUserState.getUser.and.returnValue(of(mockUsers));
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load data on init', () => {
  //   mockAccountService.getUser.and.returnValue(of({ model: mockUsers }));
  //   component.ngOnInit();
  //   fixture.detectChanges();

  //   expect(component.dataSource.data).toEqual(mockUsers);
  // });

  // it('should open dialog on edit', () => {
  //   const mockUser: User = {
  //     // mock user data here
  //   };
  //   component.edit(mockUser);

  //   expect(mockDialog.open).toHaveBeenCalledWith(UserDialogComponent, {
  //     data: { user: mockUser },
  //   });
  // });

  // it('should delete user', () => {
  //   const mockUser: User = {
  //     // mock user data here
  //   };
  //   mockAccountService.deleteUser.and.returnValue(of({ model: mockUser }));
  //   mockDialog.open.and.returnValue({ afterClosed: () => of(true) } as MatDialog);
  //   component.delete(mockUser);

  //   expect(mockSwalAlertsService.erorrAlert).not.toHaveBeenCalled();
  //   expect(mockAccountService.deleteUser).toHaveBeenCalledWith(mockUser.id);
  //   expect(mockSwalAlertsService.messageAlert).toHaveBeenCalledWith('Success message');
  //   expect(mockUserState.getUser).toHaveBeenCalled();
  // });


});

