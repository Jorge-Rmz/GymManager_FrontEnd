import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { EquipmentSet } from './equipment-types.actions';
import { Equipment } from 'src/app/core/interfaces/equipment';

export class EquipmentTypesStateModel {
  public items: Equipment[] = [];
}

const defaults = {
  items: []
};

@State<EquipmentTypesStateModel>({
  name: 'equipmentTypes',
  defaults
})
@Injectable()
export class EquipmentTypesState {
  @Selector()
  public static getMembership({items}:EquipmentTypesStateModel):Equipment[]{
    return items;
  }

  @Action(EquipmentSet)
  add({ setState }: StateContext<EquipmentTypesStateModel>, { equipment }: EquipmentSet) {

    setState({ items: [ ...equipment ] });
  }
}
