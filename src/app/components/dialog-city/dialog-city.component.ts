import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { City } from 'src/app/core/interfaces/city';
import { CityService } from 'src/app/core/services/city.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';

@Component({
  selector: 'app-dialog-city',
  templateUrl: './dialog-city.component.html',
  styleUrls: ['./dialog-city.component.scss']
})
export class DialogCityComponent implements OnInit{
  // @Output() responseForm: EventEmitter<City> = new EventEmitter();
  formCity!: FormGroup;
  isEdit: boolean = false;
  confirmButtonText = 'Create City'

  cityFields = {
    name: new FormControl('', [Validators.required]),
  };

  constructor(
    private fb: FormBuilder,
    private city: CityService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogCityComponent>,
    @Inject(MAT_DIALOG_DATA) public row: City,
    private alertas: SwalAlertsService,
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
        this.alertas.messageAlert(response.message);
        this.onNoClick(true);
      })
    }else{
      this.city.editCity(parseInt(this.row.id!),this.formCity.value).subscribe((response)=>{
        this.alertas.messageAlert(response.message);
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
