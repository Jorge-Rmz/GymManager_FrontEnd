import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store } from '@ngxs/store';
import { City } from 'src/app/core/interfaces/city';
import { CityService } from 'src/app/core/services/city.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { AddCity } from 'src/app/core/state/cities.actions';


@Component({
  selector: 'app-dialog-city',
  templateUrl: './dialog-city.component.html',
  styleUrls: ['./dialog-city.component.scss']
})
export class DialogCityComponent implements OnInit{
  formCity!: FormGroup;
  isEdit: boolean = false;
  confirmButtonText = 'Create City'

  cityFields = {
    name: new FormControl('', [Validators.required]),
  };

  constructor(
    private fb: FormBuilder,
    private city: CityService,
    private dialogRef: MatDialogRef<DialogCityComponent>,
    @Inject(MAT_DIALOG_DATA) public row: City,
    private alertas: SwalAlertsService,
    private store:Store
  ) {}

  ngOnInit(): void {
    this.formCity = this.fb.group({
      ...this.cityFields
      }
    );
    if(!!this.row){
      this.isEdit = true;
      this.confirmButtonText = 'Edit City';
      this.formCity.patchValue(this.row);
    }else{
      this.confirmButtonText = 'Create City';
      this.isEdit = false;
    }
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(){
    console.log(this.formCity.value);
    if(!this.isEdit){
      this.city.addCity(this.formCity.value).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new AddCity(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message );
        }
        this.onNoClick(true);
      })
    }else{
      this.city.editCity(parseInt(this.row.id!),this.formCity.value).subscribe((response)=>{
        if(!response.hasError){
          this.alertas.messageAlert(response.message);
          this.store.dispatch(new AddCity(response.model));
        }else{
          this.alertas.erorrAlert('Error',response.message );
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
