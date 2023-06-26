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
import { AddAttendance } from 'src/app/core/state/attendance/attendance.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @Select(AttendanceState.getAttendance)attendance$!: Observable<Attendance[]>;


  displayedColumns: string[] = [ 'id', 'name','lastName','membershipEnd','dateIn','dateOut', 'actions'];

  dataSource!: MatTableDataSource<Attendance>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private isToday:boolean = false;

  constructor(
    private attendance:AttendanceService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private store:Store,
    private route: ActivatedRoute,){  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const parametro = params['parametro'];
      if(parametro == 2){
        this.isToday = true;
        this.changeToday();
      }else{
        this.isToday = false;
        this.loadData();
      }
      // console.log('parametro pasado es: ', parametro);
      // Utiliza el valor del parámetro como necesites en tu componente
    });
  }
  loadData(){
    this.attendance.getAttendanceAll().subscribe((response )=>{
      this.dataSource = new MatTableDataSource(response.model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.store.dispatch(new AddAttendance(response.model));
    });
  }
  changeToday(){
    this.attendance.getAttendanceToday().subscribe((response )=>{
      this.dataSource = new MatTableDataSource(response.model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.store.dispatch(new AddAttendance(response.model));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(row:Attendance){
    Swal.fire({
      title: 'Are you sure you want to delete? ',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.attendance.deleteAttendance(row.id).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new AddAttendance(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message );
        }{{}}
          this.setValuesTable();
        })
      }
    })
  }

  check_out(row:Attendance ){
    Swal.fire({
      title: 'Are you sure you want to check out this member?',
      text: "Register Member: " + row.member.name + " " +row.member.lastName +"!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, register it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.attendance.editAttendance(row.member.id!).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new AddAttendance(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message);
        }
          this.setValuesTable();
        })
      }
    })
  }

  

  setValuesTable(){
    var dataAttendance;
      this.attendance$.subscribe((response)=>{
        dataAttendance = response;
        }
      );
      this.dataSource = new MatTableDataSource(dataAttendance);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }


}
