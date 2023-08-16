import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';

// import * as $ from 'jquery';
// declare var $: any;

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit{
  constructor(
    public router : Router,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
  }
  closeSession(){
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
