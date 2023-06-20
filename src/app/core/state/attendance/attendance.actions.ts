import { Attendance } from "../../interfaces/attendance";


export class AddAttendance{
  static readonly type = '[Attendance] Add item';
  constructor(public attendance: Attendance[]) {}
}
