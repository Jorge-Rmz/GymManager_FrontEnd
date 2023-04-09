import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';
import { LoginFormModule } from 'src/app/components/login-form/login-form.module';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    LoginFormModule,
    SignInRoutingModule
  ]
})
export class SignInModule { }
