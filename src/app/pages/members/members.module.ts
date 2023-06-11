import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { MaterialModule } from 'src/material.module';
import { MemberDialogModule } from 'src/app/components/member-dialog/member-dialog.module';


@NgModule({
  declarations: [
    MembersComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    MaterialModule,
    MemberDialogModule
  ]
})
export class MembersModule { }
