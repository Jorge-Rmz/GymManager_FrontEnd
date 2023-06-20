import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { MembershipSet } from './membership-state.actions';
import { Membership } from 'src/app/core/interfaces/membership';

export class MembershipStateStateModel {
  public items: Membership[] = [];
}

const defaults = {
  items: []
};

@State<MembershipStateStateModel>({
  name: 'membershipState',
  defaults
})

@Injectable()
export class MembershipStateState {
  @Selector()
  public static getMembership({items}:MembershipStateStateModel):Membership[]{
    return items;
  }

  @Action(MembershipSet)
  add({ setState }: StateContext<MembershipStateStateModel>, { membership }: MembershipSet) {
    setState({ items: [...membership ] });
  }
}
