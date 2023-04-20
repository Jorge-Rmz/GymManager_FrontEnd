import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(
    private login: AccountService,
    private router: Router,
    private alertas:SwalAlertsService,
    private cookie: CookieService
  ){}
  respFrom(response: SignIn){
    let request = { password: response.password, userName: response.email};
    this.login.SingIn(request).subscribe(
      (response) =>{
        if(response.message == "User Unauthorized" && response.hasError){
          this.alertas.erorrAlert(response.message,response.model.title!);
        }else{
          environment.hasSesion = true;
          let token = response.model.accessToken;
          this.cookie.put('session', token);
          this.router.navigate(['/home']);
        }
      }
    );
  }
}
