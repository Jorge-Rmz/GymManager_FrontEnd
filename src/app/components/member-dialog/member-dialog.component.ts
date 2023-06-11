import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Members } from 'src/app/core/interfaces/members';
import { MembersService } from 'src/app/core/services/members.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { formatDate } from '@angular/common';
import { CityService } from 'src/app/core/services/city.service';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';
import { City } from 'src/app/core/interfaces/city';
import { Membership } from 'src/app/core/interfaces/membership';



@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent implements OnInit{
  cities!: City[];
  membershipTypes! : Membership[];
  formMember!: FormGroup;
  isEdit!: boolean;
  confirmButtonText = 'Create Member';
  

  memberFields = {
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    birthDay: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    newsletter: new FormControl(false),
    registeredOn: new FormControl('', [Validators.required]),
    
    cityId: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
    membershipTypeId: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
  };

  constructor(
    private fb: FormBuilder,
    private member:MembersService,
    private dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Members,
    private alertas: SwalAlertsService,
    private city: CityService,
    private membership: MembershipTypesService,
    private store:Store
  ){ }

  ngOnInit(): void {
    const currentDate = new Date(); // Obtener la fecha actual
    const formattedDate = currentDate.toISOString().substring(0, 16); // Formatear la fecha a 'yyyy-MM-ddTHH:mm'
  
    this.membership.getMembershipTypesAll().subscribe(response =>{
      console.log(response);
      this.membershipTypes = response.model;
    });
    
    this.memberFields['registeredOn'].disable();
    this.city.getCityAll().subscribe(response =>{
      console.log(response);
      this.cities = response.model;
    });

    this.formMember = this.fb.group({
      ...this.memberFields,
      membershipEnd: new FormControl(formattedDate, [Validators.required])
      }
    );

    if(!!this.row){
      this.isEdit = true;
      this.confirmButtonText = 'Edit Membership';
      this.formMember.patchValue(this.row);
    }else{
      this.confirmButtonText = 'Create Membership';
      this.isEdit = false;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitForm(){
    const memberValues={...this.formMember.value, registeredOn:this.getCurrentDateTime()};
    
    console.log(memberValues);
  }

  onNoClick(refresh: boolean = false): void {
    let closeData = {
      closeModal: true,
      refreshData: refresh
    }
    this.dialogRef.close(closeData);
  }

  getCurrentDateTime(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // usar padStart() para agregar 0 a los meses de un solo dígito
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const dateTimeString = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    return dateTimeString;
  }

}
