import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTypesComponent } from './equipment-types.component';
import { EquipmentService } from 'src/app/core/services/equipment.service';

describe('EquipmentTypesComponent', () => {
  let component: EquipmentTypesComponent;
  let fixture: ComponentFixture<EquipmentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentTypesComponent ],
      providers: [EquipmentService ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    console.log('hola');
  });
});
