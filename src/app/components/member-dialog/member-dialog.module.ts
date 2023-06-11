import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDialogComponent } from './member-dialog.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    MemberDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    MemberDialogComponent
  ]
})
export class MemberDialogModule { }
