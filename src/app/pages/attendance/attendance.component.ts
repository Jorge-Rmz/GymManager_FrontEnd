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


  displayedColumns: string[] = [ 'id', 'name','lastName','membershipEnd','dateIn','dateOut', 'actions'];

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
      this.dataSource = new MatTableDataSource(response.model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.store.dispatch(new AddCity(response.model));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(row:Attendance){

  }
  delete(row:Attendance){

  }
  openDialog(){

  }

}
