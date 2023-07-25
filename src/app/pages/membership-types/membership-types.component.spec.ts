import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTypesComponent } from './membership-types.component';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';
import { of } from 'rxjs';
import { MembershipResponse } from 'src/app/core/interfaces/membership';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { MembershipStateState } from 'src/app/core/state/membership/state/membership-state.state';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MembershipTypesComponent', () => {
  let component: MembershipTypesComponent;
  let fixture: ComponentFixture<MembershipTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipTypesComponent ],
      imports: [CookieModule.forRoot(), HttpClientModule, 
        MatDialogModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([MembershipStateState]),
        MatFormFieldModule, ], // Importa el HttpClientModule para proporcionar HttpClient
      providers: [MembershipTypesService], 
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 

  it('test_load_data_successfully', () => {
    const fixture = TestBed.createComponent(MembershipTypesComponent);
    const component = fixture.componentInstance;
    const membershipTypesService = fixture.debugElement.injector.get(MembershipTypesService);
    const responseData = { model: [{ id: 1, name: 'Test', cost: 10, createdOn: new Date(), duration: 1 }] };
    spyOn(membershipTypesService, 'getMembershipTypesAll').and.returnValue(of(responseData as MembershipResponse));
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(1);
  });


});
