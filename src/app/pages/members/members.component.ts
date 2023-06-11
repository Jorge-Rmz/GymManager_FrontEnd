import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store, UpdateState } from '@ngxs/store';
import { MemberDialogComponent } from 'src/app/components/member-dialog/member-dialog.component';
import { City } from 'src/app/core/interfaces/city';
import { Members, MembersTem } from 'src/app/core/interfaces/members';
import { CityService } from 'src/app/core/services/city.service';
import { MembersService } from 'src/app/core/services/members.service';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { AddCity, GetCityById } from 'src/app/core/state/cities.actions';
import { CitiesState } from 'src/app/core/state/cities.state';
import { MembershipSet } from 'src/app/core/state/membership/state/membership-state.actions';
import { Observable } from 'rxjs';
import { MembershipStateState } from 'src/app/core/state/membership/state/membership-state.state';
import { Membership } from 'src/app/core/interfaces/membership';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  // @Select(EquipmentTypesState.getMembership)equipment$!: Observable<Equipment[]>;
  @Select(CitiesState.getCities)cities$!: Observable<City[]>;
  @Select(MembershipStateState.getMembership)membership$!: Observable<Membership[]>;


  displayedColumns: string[] = [ 'id', 'name', 'lastName',
  'birthDay', 'email', 
  'registeredOn', 'membershipEnd', 'cityId', 'membershipTypeId',
  'actions'];
  dataSource!: MatTableDataSource<MembersTem>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private member: MembersService,
    private dialog: MatDialog,
    private alertas: SwalAlertsService,
    private city: CityService,
    private membership: MembershipTypesService,
    private store: Store,
  ){}
  ngOnInit(): void {
    this.loadData();
  }
 
  loadData() {
    var dataCity: City[] = [];
    var dataMembership: Membership[] = [];
  
    const membershipTypes$ = this.membership.getMembershipTypesAll().pipe(
      map(response => {
        dataMembership = response.model;
        this.store.dispatch(new MembershipSet(response.model));
      })
    );
  
    const cities$ = this.city.getCityAll().pipe(
      map(response => {
        dataCity = response.model;
        this.store.dispatch(new AddCity(response.model));
      })
    );
  
    forkJoin([membershipTypes$, cities$]).subscribe(() => {
      this.member.getMembersAll().subscribe(response => {
        let updatedModel: MembersTem[] = [];
  
        for (let i = 0; i < response.model.length; i++) {
          let cityTem = response.model[i].cityId;
          let membershipTem = response.model[i].membershipTypeId;
  
          let cityFind = dataCity.find((ciudad) => ciudad.id === cityTem);
          let membershipFind = dataMembership.find((membership) => membership.id === membershipTem);
  
          let cityName = cityFind ? cityFind.name : "Ciudad no encontrada";
          let membershipName = membershipFind ? membershipFind.name : "Membership no encontrado";
  
          let member: MembersTem = {
            name: response.model[i].name,
            lastName: response.model[i].lastName,
            birthDay: response.model[i].birthDay,
            email: response.model[i].email,
            allowNewsLetter: response.model[i].allowNewsLetter,
            registeredOn: response.model[i].registeredOn,
            membershipEnd: response.model[i].membershipEnd,
            cityId: cityName,
            membershipTypeId: membershipName
          };
          updatedModel.push(member);
        }
        this.dataSource = new MatTableDataSource(updatedModel);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.store.dispatch(new EquipmentSet(response.model));
      });
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
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      disableClose: true,
      width: '900px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.setValuesTable();
    });
  
  }
  edit(row:Members){

  }
  delete(row:Members){

  }

}
