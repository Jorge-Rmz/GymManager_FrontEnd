import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AttendanceState } from 'src/app/core/state/attendance/attendance.state';
import { Attendance } from 'src/app/core/interfaces/attendance';
import { AttendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @Select(AttendanceState.getCities)attendance$!: Observable<Attendance[]>;

  displayedColumns: string[] = [ 'id', 'name', 'actions'];
  dataSource!: MatTableDataSource<Attendance>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private attendance:AttendanceService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private store:Store,){  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.attendance.getAttendanceAll().subscribe((response )=>{
      console.log(response.model);
      // this.store.dispatch(new AddCity(response.model));
    });
  }
  

}
