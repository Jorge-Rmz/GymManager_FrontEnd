import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from './city.component';
import { MaterialModule } from 'src/material.module';
import { DialogCityModule } from 'src/app/components/dialog-city/dialog-city.module';
import { DialogCityComponent } from 'src/app/components/dialog-city/dialog-city.component';


@NgModule({
  declarations: [
    CityComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    MaterialModule,
    DialogCityModule
  ]
})
export class CityModule { }
