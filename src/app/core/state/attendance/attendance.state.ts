import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddAttendance, AddAttendanceToday } from './attendance.actions';
import { Attendance } from '../../interfaces/attendance';

export class AttendanceStateModel {
  public items: Attendance[]= [];
  public itemsToday: Attendance[]= [];
}

const defaults = {
  items: [],
  itemsToday:[],
};

@State<AttendanceStateModel>({
  name: 'attendance',
  defaults
})
@Injectable()


export class AttendanceState {
  @Selector()
  public static getAttendance({items}:AttendanceStateModel):Attendance[]{
    return items;
  }

  @Selector()
  public static getAttendanceToday({itemsToday}:AttendanceStateModel):Attendance[]{
    return itemsToday;
  }

  @Action(AddAttendance)
  add({ setState,  getState }: StateContext<AttendanceStateModel>, { attendance }: AddAttendance) {
    
    const state = getState();
    setState({ items: [...attendance], itemsToday: [...state.itemsToday] });
  }

  @Action(AddAttendanceToday)
  addToday({ setState,  getState }: StateContext<AttendanceStateModel>, { attendanceToday }: AddAttendanceToday) {
    const state = getState();
    setState({ items: [...state.items], itemsToday: [...attendanceToday] });
  }
}
