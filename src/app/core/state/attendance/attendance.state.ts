import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddAttendance } from './attendance.actions';
import { Attendance } from '../../interfaces/attendance';

export class AttendanceStateModel {
  public items: Attendance[]= [];
}

const defaults = {
  items: []
};

@State<AttendanceStateModel>({
  name: 'attendance',
  defaults
})
@Injectable()


export class AttendanceState {
  @Selector()
  public static getCities({items}:AttendanceStateModel):Attendance[]{
    return items;
  }

  @Action(AddAttendance)
  add({ setState }: StateContext<AttendanceStateModel>, { attendance }: AddAttendance) {
    setState({ items: [ ...attendance ] });
  }
}
