import { Injectable } from '@angular/core';
import { State, Action, StateContext,Selector } from '@ngxs/store';
import { AddCity } from './cities.actions';
import { City } from '../interfaces/city';

export class CitiesStateModel {
  public items: City[]= [];
}

const defaults = {
  items: []
};

@State<CitiesStateModel>({
  name: 'cities',
  defaults
})
@Injectable()
export class CitiesState {

  @Selector()
  public static getCities({items}:CitiesStateModel):City[]{
    return items;
  }
  @Action(AddCity)
  add({ setState }: StateContext<CitiesStateModel>, { city }: AddCity) {

    setState({ items: [ ...city ] });
  }

}
