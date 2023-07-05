import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitLayoutComponent } from './share/init-layout/init-layout.component';
import { AdminLayoutComponent } from './share/admin-layout/admin-layout.component';
import { HasSessionGuard } from './core/guards/has-session.guard';
import { LoggedInGuard } from './core/guards/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch:'full' },
  { path: '', component: InitLayoutComponent, children:[
    { path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule), canActivate:[LoggedInGuard] },
    { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule),canActivate:[LoggedInGuard] },
    { path: 'logged-in', loadChildren: () => import('./pages/logged-in/logged-in.module').then(m => m.LoggedInModule), canActivate:[HasSessionGuard] },
  ]},
  { path: '', component: AdminLayoutComponent, children:[
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),canActivate:[HasSessionGuard] },
    { path: 'attendance', loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendanceModule),canActivate:[HasSessionGuard] },
    { path: 'city', loadChildren: () => import('./pages/city/city.module').then(m => m.CityModule),canActivate:[HasSessionGuard] },
    { path: 'equipment-Types', loadChildren: () => import('./pages/equipment-types/equipment-types.module').then(m => m.EquipmentTypesModule),canActivate:[HasSessionGuard] },
    { path: 'members', loadChildren: () => import('./pages/members/members.module').then(m => m.MembersModule),canActivate:[HasSessionGuard] },
    { path: 'membership-types', loadChildren: () => import('./pages/membership-types/membership-types.module').then(m => m.MembershipTypesModule),canActivate:[HasSessionGuard] },
    { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate:[HasSessionGuard] },
  ]},
  { path: '**', redirectTo: '/not-found', pathMatch:'full' },
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
