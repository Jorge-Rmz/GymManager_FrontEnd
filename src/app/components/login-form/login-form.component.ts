import { Component, EventEmitter, Input, Output, OnChanges,SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnChanges {
  @Input() isSignUp! : boolean;
  @Input() confirmButtonText = 'Sign In';
  @Input() dataUser?:User;
  @Output() responseForm: EventEmitter<any> = new EventEmitter();
  @Output() cancelForm: EventEmitter<boolean> = new EventEmitter();

  pattern="^[0-9]*$"
  formUser!: FormGroup;
  loggedIn!: boolean;

  defaultFields = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  };
  extraFields = {
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  };
  constructor(
    private fb: FormBuilder,
    private cookie: CookieService,
  ){  }

  ngOnChanges(changes: SimpleChanges):void{
    const {dataUser} = changes;
    this.initForm();
    if(!!dataUser?.currentValue){
      this.formUser.patchValue(dataUser.currentValue);
    }
  }
  initForm(){
    this.formUser = new FormGroup({
      ...this.defaultFields,
    });
    if (this.isSignUp) {
      this.formUser = this.fb.group({
        ...this.defaultFields,
        ...this.extraFields,
      });
    }
    let session = this.cookie.get('session');
    if(!session){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  }

  onSubmitForm() {
    this.responseForm.emit(this.formUser.value);
  }

  cancelBtn(){
    this.cancelForm?.emit(true);
  }
}
