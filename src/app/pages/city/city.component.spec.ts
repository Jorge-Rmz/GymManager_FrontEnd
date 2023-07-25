import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CityComponent } from './city.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CityService } from 'src/app/core/services/city.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { CitiesState } from 'src/app/core/state/cities.state';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { AddCity } from 'src/app/core/state/cities.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  let cityServiceMock: Partial<CityService>;
  let dialogMock: Partial<MatDialog>;
  let alertasMock: Partial<SwalAlertsService>;
  let storeMock: Partial<Store>;

  beforeEach(async () => {
    cityServiceMock = {
      getCityAll: jasmine.createSpy('getCityAll').and.returnValue(of({ model: [] } as any))
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of() } as any)
    };

    alertasMock = {
      messageAlert: jasmine.createSpy('messageAlert'),
      erorrAlert: jasmine.createSpy('erorrAlert')
    };

    storeMock = {
      dispatch: jasmine.createSpy('dispatch')
    };

    await TestBed.configureTestingModule({
      declarations: [CityComponent],
      providers: [
        { provide: CityService, useValue: cityServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: SwalAlertsService, useValue: alertasMock },
        { provide: Store, useValue: storeMock }
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
  });

  xit('debería cargar los datos al inicializar el componente', () => {
    const data = { model: [{ id: 1, name: 'Ciudad 1' }] } as any;
    cityServiceMock.getCityAll = jasmine.createSpy('getCityAll').and.returnValue(of(data));

    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(data.model);
    expect(component.dataSource.paginator).toBeDefined();
    expect(component.dataSource.sort).toBeDefined();
    expect(storeMock.dispatch).toHaveBeenCalledWith(new AddCity(data.model));
  });

});
