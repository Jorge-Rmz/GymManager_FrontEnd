import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipDialogComponent } from './membership-dialog.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MembershipDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MembershipDialogComponent
  ]
})
export class MembershipDialogModule { }
