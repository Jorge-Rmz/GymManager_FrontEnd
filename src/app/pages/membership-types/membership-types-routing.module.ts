import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipTypesComponent } from './membership-types.component';

const routes: Routes = [{ path: '', component: MembershipTypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipTypesRoutingModule { }
