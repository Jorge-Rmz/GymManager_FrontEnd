import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EquipmentTypesState } from './equipment-types.state';
// import { EquipmentTypesAction } from './equipment-types.actions';

describe('EquipmentTypes actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([EquipmentTypesState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    console.log('hola');
  });

});
