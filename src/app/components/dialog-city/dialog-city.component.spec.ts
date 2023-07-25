import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DialogCityComponent } from './dialog-city.component';
import { CityService } from 'src/app/core/services/city.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';

describe('DialogCityComponent', () => {
  let component: DialogCityComponent;
  let fixture: ComponentFixture<DialogCityComponent>;
  let mockDialogRef: MatDialogRef<DialogCityComponent>;

  beforeEach(async () => {
    const mockCityService = jasmine.createSpyObj('CityService', ['addCity', 'editCity']);
    const mockSwalAlertsService = jasmine.createSpyObj('SwalAlertsService', ['messageAlert', 'erorrAlert']);
    const mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    const mockFormBuilder = {
      group: jasmine.createSpy('group').and.returnValue({
        value: {},
        patchValue: jasmine.createSpy('patchValue')
      })
    };

    await TestBed.configureTestingModule({
      declarations: [DialogCityComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: CityService, useValue: mockCityService },
        { provide: SwalAlertsService, useValue: mockSwalAlertsService },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should call addCity method when isEdit is false', () => {
    const mockCityService = TestBed.inject(CityService);
    const mockSwalAlertsService = TestBed.inject(SwalAlertsService);
    const mockStore = TestBed.inject(Store);

    component.isEdit = false;
    component.formCity = { value: {} } as any;

    component.onSaveClick();

    expect(mockCityService.addCity).toHaveBeenCalledWith(component.formCity.value);
    expect(mockSwalAlertsService.messageAlert).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
