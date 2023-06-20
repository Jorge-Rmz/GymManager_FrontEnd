import {  Members } from "./members";

export interface AttendanceResponse {
  hasError:  boolean;
  message:   string;
  model:     Attendance[];
  requestId: string;
}

export interface Attendance {
  id:      number;
  dateIn:  Date;
  dateOut: Date;
  member:  Members;
}

