import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store, UpdateState } from '@ngxs/store';
import { MemberDialogComponent } from 'src/app/components/member-dialog/member-dialog.component';
import { City } from 'src/app/core/interfaces/city';
import { MemberEDA, Members } from 'src/app/core/interfaces/members';
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
import Swal from 'sweetalert2';
import { MemberState } from 'src/app/core/state/member/member.state';
import { MemberSet } from 'src/app/core/state/member/member.actions';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  @Select(MemberState.getMembers)members$!: Observable<MemberEDA[]>;
  @Select(CitiesState.getCities)cities$!: Observable<City[]>;
  @Select(MembershipStateState.getMembership)membership$!: Observable<Membership[]>;


  displayedColumns: string[] = [ 'id', 'name', 'lastName',
  'birthDay', 'email',
  'registeredOn', 'membershipEnd', 'cityId', 'membershipTypeId',
  'actions', 'attendance'];
  dataSource!: MatTableDataSource<MemberEDA>;

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
        console.log("valores de members ", response);
        let updatedModel: MemberEDA[] = [];

        for (let i = 0; i < response.model.length; i++) {
          let cityTem = response.model[i].cityId;
          let membershipTem = response.model[i].membershipTypeId;

          let cityFind = dataCity.find((ciudad) => ciudad.id === cityTem);
          let membershipFind = dataMembership.find((membership) => membership.id === membershipTem);

          // let cityName = cityFind ? cityFind.name : "Ciudad no encontrada";
          // let membershipName = membershipFind ? membershipFind.name : "Membership no encontrado";

          let member: MemberEDA = {
            id: response.model[i].id,
            name: response.model[i].name,
            lastName: response.model[i].lastName,
            birthDay: response.model[i].birthDay,
            email: response.model[i].email,
            allowNewsLetter: response.model[i].allowNewsLetter,
            registeredOn: response.model[i].registeredOn,
            membershipEnd: response.model[i].membershipEnd,
            city: cityFind!,
            membershipType: membershipFind!,
          };
          updatedModel.push(member);
        }
        this.dataSource = new MatTableDataSource(updatedModel);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.store.dispatch(new MemberSet(updatedModel));
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
      this.setValuesTable();
    });

  }
  edit(row:MemberEDA){
    // console.log("resultados al editar ", row);
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      disableClose: true,
      width: '900px',
      data: { row: row, membershipId: row.membershipType.id, cityId: row.city.id },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.setValuesTable();
    });
  }
  delete(row:Members){
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
        this.member.deleteMembers(row.id!).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new MemberSet(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message );
        }
          this.setValuesTable();
        })
      }
    })
  }


  setValuesTable(){
    let dataMembers :MemberEDA[] =[];
    this.members$.subscribe((response) => {
      dataMembers = response;
    });

      this.dataSource = new MatTableDataSource(dataMembers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }


  check(){

  }
}
