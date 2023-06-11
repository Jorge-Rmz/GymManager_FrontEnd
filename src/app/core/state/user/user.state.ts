import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UserSet } from './user.actions';
import { User } from "../../interfaces/user";


export class UserStateModel {
  public items: User[] = [];
}

const defaults = {
  items: []
};

@State<UserStateModel>({
  name: 'user',
  defaults
})

@Injectable()
export class UserState {
  @Selector()
  public static getUser({items}:UserStateModel):User[]{
    return items;
  }

  @Action(UserSet)
  add({ setState }: StateContext<UserStateModel>, { user }: UserSet) {
    setState({ items: [...user ] });
  }
}
