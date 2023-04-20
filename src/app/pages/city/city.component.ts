import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCityComponent } from 'src/app/components/dialog-city/dialog-city.component';
import { City } from 'src/app/core/interfaces/city';
import { CityService } from 'src/app/core/services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit{

  displayedColumns: string[] = [ 'id', 'name', 'actions'];
  dataSource!: MatTableDataSource<City>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private city:CityService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.city.getCityAll().subscribe((response )=>{
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
  edit(row:any){
    const dialogRef = this.dialog.open(DialogCityComponent, {
      disableClose: true,
      width: '300px',
      data: row,
    });
    // console.log(row);

  }
  delete(row:any){
    console.log(row);
  }
  openDialog(){
    const dialogRef = this.dialog.open(DialogCityComponent, {
      disableClose: true,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


