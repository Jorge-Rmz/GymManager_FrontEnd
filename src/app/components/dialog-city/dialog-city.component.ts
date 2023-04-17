import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { City } from 'src/app/core/interfaces/city';
import { CityService } from 'src/app/core/services/city.service';

@Component({
  selector: 'app-dialog-city',
  templateUrl: './dialog-city.component.html',
  styleUrls: ['./dialog-city.component.scss']
})
export class DialogCityComponent implements OnInit{
  @Output() responseForm: EventEmitter<City> = new EventEmitter();

  formCity!: FormGroup;

  cityFields = {
    name: new FormControl('', [Validators.required]),
  };

  constructor(
    private fb: FormBuilder,
    public city: CityService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogCityComponent>
  ) {}

  ngOnInit(): void {
    this.formCity = this.fb.group({
      ...this.cityFields
      }
    );
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(){
    console.log(this.formCity.value);
    this.city.addCity(this.formCity.value).subscribe((response)=>{
      console.log(response);
    })
  }

}
