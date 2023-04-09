import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentTypesComponent } from './equipment-types.component';

const routes: Routes = [{ path: '', component: EquipmentTypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentTypesRoutingModule { }
