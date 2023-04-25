import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SignUp, User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  @Input() row?: User;
  @Input() confirmButtonText = 'Create User';
  @Output() closeModalEvent:  EventEmitter<object>= new EventEmitter<object>();
  myModal!: bootstrap.Modal;
  isEdit!: boolean;

  constructor(
    private user:AccountService,
    private alertas:SwalAlertsService,
  ){}

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(<HTMLInputElement>document.getElementById('staticBackdrop'));
      this.myModal.show();
    if(!!this.row){
      this.isEdit = true;
      this.confirmButtonText = 'Edit Membership';
    }else{
      this.confirmButtonText = 'Create Membership';
      this.isEdit = false;
    }
  }

  respForm(response: SignUp){

    console.log(response);

    let request = {phoneNumber: response.phoneNumber ,password: response.password, userName: response.email};
    if(!!this.row && this.row.id){
      this.user.editUser(this.row.id,request).subscribe(
      (resp)=>{
        if(!resp.hasError){
          console.log(resp.message);
          //this.alertasUser.userAlert("Actualizado",resp.message, 'success');
          this.cerrarModal(true);
        }
      }
      );
    }else{
      
    }
  }

  cerrarModal(refresh: boolean = false){
    this.myModal.hide();
    let close = {
      closeModal: true,
      refreshData: refresh
    }
    this.closeModalEvent.emit(close);
  }
  cancelForm(close: boolean){
    if(close ){
      this.cerrarModal();
    }
  }

}
