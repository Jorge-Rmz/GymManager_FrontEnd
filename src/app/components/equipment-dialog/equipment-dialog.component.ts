import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipment } from 'src/app/core/interfaces/equipment';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EquipmentSet } from 'src/app/core/state/equipment/state/equipment-types.actions';

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.scss']
})
export class EquipmentDialogComponent implements OnInit {
  formEquipment!: FormGroup;
  isEdit: boolean = false;
  confirmButtonText = 'Create Equipment';
  equipmentFields = {
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  };


  constructor(
    private fb: FormBuilder,
    private equipment: EquipmentService,
    private dialogRef: MatDialogRef<EquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: Equipment,
    private alertas: SwalAlertsService,
    private store:Store
  ){}
  ngOnInit(): void {
    this.formEquipment = this.fb.group({
      ...this.equipmentFields
      }
    );

    if(!!this.row){
      this.isEdit = true;
      this.confirmButtonText = 'Edit Equipment';
      this.formEquipment.patchValue(this.row);
    }else{
      this.confirmButtonText = 'Create Equipment';
      this.isEdit = false;
    }
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitForm(){
    if(!this.isEdit){
      this.equipment.addEquipment(this.formEquipment.value).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new EquipmentSet(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message);
        }
        this.onNoClick(true);
      })
    }else{
      this.equipment.editEquipment(this.row.id!,this.formEquipment.value).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new EquipmentSet(response.model));
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


}
