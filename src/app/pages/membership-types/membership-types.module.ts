import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipTypesRoutingModule } from './membership-types-routing.module';
import { MembershipTypesComponent } from './membership-types.component';
import { MaterialModule } from 'src/material.module';
import { MembershipDialogModule } from 'src/app/components/membership-dialog/membership-dialog.module';


@NgModule({
  declarations: [
    MembershipTypesComponent
  ],
  imports: [
    CommonModule,
    MembershipTypesRoutingModule,
    MaterialModule,
    MembershipDialogModule,
  ]
})
export class MembershipTypesModule { }
