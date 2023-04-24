import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Membership } from 'src/app/core/interfaces/membership';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { MembershipSet } from 'src/app/core/state/membership/state/membership-state.actions';

@Component({
  selector: 'app-membership-dialog',
  templateUrl: './membership-dialog.component.html',
  styleUrls: ['./membership-dialog.component.scss']
})
export class MembershipDialogComponent implements OnInit {
  formMembership!: FormGroup;
  isEdit!: boolean;
  confirmButtonText = 'Create Membership'
  value = this.getCurrentDateTime();
  membershipFields = {
    name: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required]),
    createdOn: new FormControl('', [Validators.required, ]),
    duration: new FormControl('', [Validators.required, Validators.pattern('^(?:[1-9]|[1-3][0-9]|4[0-8])$')]),
  };

  constructor(
    private fb: FormBuilder,
    private membership:MembershipTypesService ,
    private dialogRef: MatDialogRef<MembershipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Membership,
    private alertas: SwalAlertsService,
    private store:Store
  ){  }
  ngOnInit(): void {
    this.formMembership = this.fb.group({
      ...this.membershipFields
      }
    );
    this.membershipFields['createdOn'].disable();
    if(!!this.row){
      this.isEdit = true;
      this.confirmButtonText = 'Edit Membership';
      this.formMembership.patchValue(this.row);
    }else{
      this.confirmButtonText = 'Create Membership';
      this.isEdit = false;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitForm(){
    if(!this.isEdit){
      this.membership.addMembership(this.formMembership.value).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new MembershipSet(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message);
        }
        this.onNoClick(true);
      })
    }else{
      const membershipValues={...this.formMembership.value, createdOn:this.getCurrentDateTime()};
      this.membership.editMembership(this.row.id!,membershipValues).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new MembershipSet(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message);
        }
        this.onNoClick(true);
      })
    }

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
    console.log(dateTimeString)
    return dateTimeString;
  }


}
