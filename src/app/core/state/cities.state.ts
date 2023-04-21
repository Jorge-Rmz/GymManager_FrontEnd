import { Injectable } from '@angular/core';
import { State, Action, StateContext,Selector } from '@ngxs/store';
import { AddCity } from './cities.actions';
import { CityService } from '../services/city.service';
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
  constructor(private cityService: CityService) {}

  @Selector()
  public static getBooks({items}:CitiesStateModel):City[]{
    return items;
  }
  @Action(AddCity)
  add({ getState, setState }: StateContext<CitiesStateModel>, { city }: AddCity) {
    // const state = getState();
    setState({ items: [ ...city ] });
  }

}
