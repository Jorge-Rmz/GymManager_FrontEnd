import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertsService } from 'src/app/core/services/swal-alerts.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(
    private servicioLogin: AccountService,
    private router: Router,
    private alertas: SwalAlertsService,
  ){}
  respFrom(response: SignUp){
    this.servicioLogin.SingUp(response).subscribe((response)=>{
      if(response.hasError){
        this.alertas.erorrAlert(response.model[0].code, response.model[0].description);
      }else{
        this.alertas.messageWhitTimer(response.message);
        this.router.navigate(['/sign-in'])
      }
    });
  }
}
