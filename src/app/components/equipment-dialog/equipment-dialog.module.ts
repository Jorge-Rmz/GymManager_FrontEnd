import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentDialogComponent } from './equipment-dialog.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EquipmentDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    EquipmentDialogComponent
  ]
})
export class EquipmentDialogModule { }
