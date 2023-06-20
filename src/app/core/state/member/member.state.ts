import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { MemberSet } from './member.actions';
import { MemberEDA } from '../../interfaces/members';

export class MemberStateModel {
  public items: MemberEDA[] = [];
}

const defaults = {
  items: []
};

@State<MemberStateModel>({
  name: 'member',
  defaults
})
@Injectable()
export class MemberState {

  @Selector()
  public static getMembers({items}:MemberStateModel):MemberEDA[]{
    return items;
  }

  @Action(MemberSet)
  add({ setState }: StateContext<MemberStateModel>, { member }: MemberSet) {

    setState({ items: [ ...member ] });
  }
}
