import { Injectable } from '@angular/core';
import { State, Action, StateContext,Selector } from '@ngxs/store';
import { AddCity, GetCityById } from './cities.actions';
import { City } from '../interfaces/city';

export class CitiesStateModel {
  public items: City[]= [];
}

const defaults = {
  items: [],
};

@State<CitiesStateModel>({
  name: 'cities',
  defaults,

})
@Injectable()
export class CitiesState {

  @Selector()
  public static getCities({items}:CitiesStateModel):City[]{
    return items;
  }

  
  // @Action(GetCityById)
  // getById({ setState, getState }: StateContext<CitiesStateModel>, { id }: GetCityById) {
  //   const state = getState();
  //   const selectedCity = state.items.find(city => city.id === id);
    
  //   setState({
  //     ...state,
  //     selectedCity// Agrega una propiedad "selectedCity" al estado
  //   });
  // }
  
  
  @Action(AddCity)
  add({ setState }: StateContext<CitiesStateModel>, { city }: AddCity) {
    setState({ items: [ ...city ]});
  }

}
