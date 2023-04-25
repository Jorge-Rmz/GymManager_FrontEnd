import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UserDialogComponent } from 'src/app/components/user-dialog/user-dialog.component';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSubscription?: Subscription;
  rowSelected: User | undefined ;
  newUser = false;
  

  constructor(
    private user: AccountService,
    private dialog: MatDialog
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
    this.rowSelected = row;
  }

  onCloseHandled(dataModal: any) {
    this.rowSelected =undefined;
    this.newUser = false;
    if(dataModal.refreshData){
      // this.dataSubscription?.unsubscribe();
      this.loadData();
    }
  }

}


