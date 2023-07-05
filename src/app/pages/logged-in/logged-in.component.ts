import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})
export class LoggedInComponent implements OnInit{
  constructor(
    private router : Router,
    private cookie: CookieService
  ) { }

  private isLoggedIn:boolean = false;
  ngOnInit(): void {
    let session = this.cookie.get('session');
    if(!session){
      this.isLoggedIn = false;
    }else{
      this.isLoggedIn = true;
    }
  }
  logout(){
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza aquí la lógica para cerrar sesión
        this.cookie.remove('session');
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
