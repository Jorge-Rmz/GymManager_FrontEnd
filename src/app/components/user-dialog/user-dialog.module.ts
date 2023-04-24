import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDialogComponent } from './user-dialog.component';
import { LoginFormModule } from '../login-form/login-form.module';



@NgModule({
  declarations: [
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    LoginFormModule
  ],
  exports:[
    UserDialogComponent
  ]
  
})
export class UserDialogModule { }
