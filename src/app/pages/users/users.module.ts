import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
