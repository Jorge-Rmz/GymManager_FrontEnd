import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedInRoutingModule } from './logged-in-routing.module';
import { LoggedInComponent } from './logged-in.component';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    LoggedInComponent
  ],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    MaterialModule,
  ]
})
export class LoggedInModule { }
