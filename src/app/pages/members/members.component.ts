import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Members } from 'src/app/core/interfaces/members';
import { MembersService } from 'src/app/core/services/members.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  // @Select(EquipmentTypesState.getMembership)equipment$!: Observable<Equipment[]>;
 
  displayedColumns: string[] = [ 'id', 'name', 'lastName', 
  'birthDay', 'email', 'allowNewsLetter', 
  'registeredOn', 'membershipEnd', 'cityId', 'membershipTypeId',
  'actions'];
  dataSource!: MatTableDataSource<Members>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private member: MembersService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private store: Store,
  ){}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.member.getMembersAll().subscribe(response =>{
      this.dataSource = new MatTableDataSource(response.model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.store.dispatch(new EquipmentSet(response.model));
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
    
  }
  edit(row:Members){
    
  }
  delete(row:Members){
   
  }

}
