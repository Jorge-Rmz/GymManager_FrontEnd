import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDialogModule } from 'src/app/components/user-dialog/user-dialog.module';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    UserDialogModule,
  ]
})
export class UsersModule { }
