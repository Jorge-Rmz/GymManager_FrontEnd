import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserDialogComponent } from 'src/app/components/user-dialog/user-dialog.component';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { UserSet } from 'src/app/core/state/user/user.actions';
import { UserState } from 'src/app/core/state/user/user.state';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  @Select(UserState.getUser)users$!: Observable<User[]>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSubscription?: Subscription;
  rowSelected: User | undefined ;
  newUser = false;
  

  constructor(
    private user: AccountService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private store: Store,
  ){}
  displayedColumns: string[] = [ 'userName', 'phoneNumber', 'actions'];
  dataSource!: MatTableDataSource<User>;

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(){
    this.user.getUser().subscribe(response =>{
      this.dataSource = new MatTableDataSource(response.model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openModal(){
    this.newUser = true;
  }

  edit(row: User){
    this.rowSelected = row;
  }

  delete(row: User){
    this.newUser = false;
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
        this.user.deleteUser(row.id!).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new UserSet(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message );
        }
          this.setValuesTable();
        })
      }
    })
  }

  onCloseHandled(dataModal: any) {
    this.rowSelected =undefined;
    this.newUser = false;
    if(dataModal.refreshData){
      // this.dataSubscription?.unsubscribe();
      this.loadData();
    }
  }
  setValuesTable(){
    var dataUser;
      this.users$.subscribe((response)=>{
        dataUser = response;
        }
      );
      this.dataSource = new MatTableDataSource(dataUser);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
}


