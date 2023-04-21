import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { DialogCityComponent } from 'src/app/components/dialog-city/dialog-city.component';
import { City } from 'src/app/core/interfaces/city';
import { CityService } from 'src/app/core/services/city.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { CitiesState } from 'src/app/core/state/cities.state';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AddCity } from 'src/app/core/state/cities.actions';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit{
  @Select(CitiesState.getBooks)cities$!: Observable<City[]>;


  displayedColumns: string[] = [ 'id', 'name', 'actions'];
  dataSource!: MatTableDataSource<City>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private city:CityService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private store:Store,
  ){}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.city.getCityAll().subscribe((response )=>{
      this.dataSource = new MatTableDataSource(response.model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.store.dispatch(new AddCity(response.model));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(row:City){
    const dialogRef = this.dialog.open(DialogCityComponent, {
      disableClose: true,
      width: '300px',
      data: row,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.setValuesTable();
    });
  }
  delete(row:City){
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
        this.city.deleteCity(parseInt(row.id!)).subscribe((response)=>{
        this.alertas.messageAlert(response.message);
        this.store.dispatch(new AddCity(response.model));
        this.setValuesTable();
        })
      }
    })
  }
  openDialog(){
    const dialogRef = this.dialog.open(DialogCityComponent, {
      disableClose: true,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setValuesTable();
    });
  }

  setValuesTable(){
    var dataCity;
      this.cities$.subscribe((response)=>{
        dataCity = response;
        }
      );
      this.dataSource = new MatTableDataSource(dataCity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

}


