import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store,Select } from '@ngxs/store';
import { MembershipDialogComponent } from 'src/app/components/membership-dialog/membership-dialog.component';
import { Membership } from 'src/app/core/interfaces/membership';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { MembershipSet } from 'src/app/core/state/membership/state/membership-state.actions';
import { MembershipStateState } from 'src/app/core/state/membership/state/membership-state.state';
import Swal from 'sweetalert2';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-membership-types',
  templateUrl: './membership-types.component.html',
  styleUrls: ['./membership-types.component.scss']
})
export class MembershipTypesComponent implements OnInit {
  @Select(MembershipStateState.getMembership)membership$!: Observable<Membership[]>;

  displayedColumns: string[] = [ 'id', 'name', 'cost','createdOn','duration', 'actions'];
  dataSource!: MatTableDataSource<Membership>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private membership:MembershipTypesService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private store: Store
  ){}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.membership.getMembershipTypesAll().subscribe(response =>{
      this.dataSource = new MatTableDataSource(response.model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.store.dispatch(new MembershipSet(response.model));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(){
    const dialogRef = this.dialog.open(MembershipDialogComponent, {
      disableClose: true,
      width: '900px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setValuesTable();
    });
  }
  edit(row:Membership){
    const dialogRef = this.dialog.open(MembershipDialogComponent, {
      disableClose: true,
      width: '900px',
      data: row,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.setValuesTable();
    });
  }
  delete(row:Membership){
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
        this.membership.deleteMembership(row.id!).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new MembershipSet(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message );
        }
          this.setValuesTable();
        })
      }
    })
  }

  setValuesTable(){
    var dataMembership;
      this.membership$.subscribe((response)=>{
        dataMembership = response;
        }
      );
      this.dataSource = new MatTableDataSource(dataMembership);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }



}
