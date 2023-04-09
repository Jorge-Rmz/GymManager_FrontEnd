import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitLayoutComponent } from './share/init-layout/init-layout.component';
import { AdminLayoutComponent } from './share/admin-layout/admin-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch:'full' },
  { path: '', component: InitLayoutComponent, children:[
    { path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule) },
    { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule) },
  ]},
  { path: '', component: AdminLayoutComponent, children:[
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    { path: 'attendance', loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendanceModule) },
    { path: 'city', loadChildren: () => import('./pages/city/city.module').then(m => m.CityModule) },
    { path: 'equipment-Types', loadChildren: () => import('./pages/equipment-types/equipment-types.module').then(m => m.EquipmentTypesModule) },
    { path: 'members', loadChildren: () => import('./pages/members/members.module').then(m => m.MembersModule) },
    { path: 'membership-types', loadChildren: () => import('./pages/membership-types/membership-types.module').then(m => m.MembershipTypesModule) },
    { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
  ]},
  { path: '**', redirectTo: '/not-found', pathMatch:'full' },
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
