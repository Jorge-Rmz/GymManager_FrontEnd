import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentTypesRoutingModule } from './equipment-types-routing.module';
import { EquipmentTypesComponent } from './equipment-types.component';
import { MaterialModule } from 'src/material.module';
import { EquipmentDialogModule } from 'src/app/components/equipment-dialog/equipment-dialog.module';
import { CookieModule } from 'ngx-cookie';


@NgModule({
  declarations: [
    EquipmentTypesComponent,
  ],
  imports: [
    CommonModule,
    EquipmentTypesRoutingModule,
    MaterialModule,
    EquipmentDialogModule,
    CookieModule
  ]
})
export class EquipmentTypesModule { }
