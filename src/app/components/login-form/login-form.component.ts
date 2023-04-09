import { Component, EventEmitter, Input, Output, OnChanges,SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnChanges {
  @Input() isSignUp! : boolean;
  @Output() responseForm: EventEmitter<any> = new EventEmitter();

  formUser!: FormGroup;

  defaultFields = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  };
  extraFields = {
    phoneNumber: new FormControl('', [Validators.required]),
  };
  constructor(
    private fb: FormBuilder
  ){  }

  ngOnChanges(changes: SimpleChanges):void{
    this.initForm();
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
  }

  onSubmitForm(){
    this.responseForm.emit(this.formUser.value);
  }
}
