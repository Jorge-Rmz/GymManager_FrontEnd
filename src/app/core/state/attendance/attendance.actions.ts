import { Attendance } from "../../interfaces/attendance";

export class AddAttendance{
  static readonly type = '[Attendance] Add item';
  constructor(public attendance: Attendance[]) {}
}

export class AddAttendanceToday{
  static readonly type = '[Attendance] Add item Today';
  constructor(public attendanceToday: Attendance[]) {}
}

