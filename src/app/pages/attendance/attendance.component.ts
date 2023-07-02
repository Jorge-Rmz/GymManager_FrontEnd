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
import { AddAttendance, AddAttendanceToday } from 'src/app/core/state/attendance/attendance.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  
  @Select(AttendanceState.getAttendance)attendance$!: Observable<Attendance[]>;
  @Select(AttendanceState.getAttendanceToday)attendanceToday$!: Observable<Attendance[]>;

  displayedColumns: string[] = ['id', 'name', 'lastName', 'membershipEnd', 'dateIn', 'dateOut', 'actions'];

  dataSource!: MatTableDataSource<Attendance>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private isToday: boolean = false;

  constructor(
    private attendance: AttendanceService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.handleRouteParams();
  }

  handleRouteParams(): void {
    this.route.params.subscribe(params => {
      const parametro = params['parametro'];
      if (parametro == 2) {
        this.isToday = true;
        this.changeToday();
      } else {
        this.isToday = false;
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.isToday = false;
    this.attendance.getAttendanceAll().subscribe((response) => {
      this.updateDataSource(response.model);
      this.store.dispatch(new AddAttendance(response.model));
    });
  }

  changeToday(): void {
    this.isToday = true;
    this.attendance.getAttendanceToday().subscribe((response) => {
      this.updateDataSource(response.model);
      this.store.dispatch(new AddAttendanceToday(response.model));
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async delete(row: Attendance): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete? ',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      this.attendance.deleteAttendance(row.id).subscribe((response) => {
        if (!response.hasError) {
          this.alertas.messageAlert(response.message);
          if (this.isToday) {
            this.changeToday();
          } else {
            this.store.dispatch(new AddAttendance(response.model));
          }
        } else {
          this.alertas.erorrAlert('Error', response.message);
        }
        if (!this.isToday) {
          this.setValuesTable();
        }
      });
    }
  }

  async check_out(row: Attendance): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure you want to check out this member?',
      text: "Register Member: " + row.member.name + " " + row.member.lastName + "!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, register it!'
    });
    if (result.isConfirmed) {
      this.attendance.editAttendance(row.member.id!).subscribe((response) => {
        if (!response.hasError) {
          this.alertas.messageAlert(response.message);
          console.log('is Today value: ', this.isToday);
          if (this.isToday) {
            this.changeToday();
          } else {
            this.store.dispatch(new AddAttendance(response.model));
          }
        } else {
          this.alertas.erorrAlert('Error', response.message);
        }
        if (!this.isToday) {
          this.setValuesTable();
        }
      });
    }
  }

  setValuesTable(): void {
    this.attendance$.subscribe((response) => {
      this.updateDataSource(response);
    });
  }

  setValuesTableToday(): void {
    this.attendanceToday$.subscribe((response) => {
      this.updateDataSource(response);
    });
  }

  private updateDataSource(data: Attendance[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}