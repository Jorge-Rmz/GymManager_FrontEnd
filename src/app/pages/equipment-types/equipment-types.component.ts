import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EquipmentDialogComponent } from 'src/app/components/equipment-dialog/equipment-dialog.component';
import { Equipment } from 'src/app/core/interfaces/equipment';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { EquipmentSet } from 'src/app/core/state/equipment/state/equipment-types.actions';
import { EquipmentTypesState } from 'src/app/core/state/equipment/state/equipment-types.state';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-equipment-types',
  templateUrl: './equipment-types.component.html',
  styleUrls: ['./equipment-types.component.scss']
})
export class EquipmentTypesComponent implements OnInit{
  @Select(EquipmentTypesState.getMembership)equipment$!: Observable<Equipment[]>;

  displayedColumns: string[] = [ 'id', 'name', 'description', 'actions'];
  dataSource!: MatTableDataSource<Equipment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private equipment: EquipmentService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private store: Store,
  ){}
  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    this.equipment.getEquipmentAll().subscribe(response =>{
      this.dataSource = new MatTableDataSource(response.model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.store.dispatch(new EquipmentSet(response.model));
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(){
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      disableClose: true,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setValuesTable();
    });
  }
  edit(row:Equipment){
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      disableClose: true,
      width: '900px',
      data: row,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.setValuesTable();
    });
  }
  delete(row:Equipment){
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
        this.equipment.deleteEquipment(row.id!).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new EquipmentSet(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message );
        }
          this.setValuesTable();
        })
      }
    })
  }

  setValuesTable(){
    var dataEquipment;
      this.equipment$.subscribe((response)=>{
        dataEquipment = response;
        }
      );
      this.dataSource = new MatTableDataSource(dataEquipment);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }


}
