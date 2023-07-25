import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn:boolean = false;

  constructor(
    private cookie: CookieService
  ) { 
    let session = this.cookie.get('session');
    if(!session){
      this.isLoggedIn = false;
    }else{
      this.isLoggedIn = true;
    }
  }


}
