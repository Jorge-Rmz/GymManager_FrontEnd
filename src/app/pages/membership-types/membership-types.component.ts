import { Component, OnInit } from '@angular/core';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';

@Component({
  selector: 'app-membership-types',
  templateUrl: './membership-types.component.html',
  styleUrls: ['./membership-types.component.scss']
})
export class MembershipTypesComponent implements OnInit {

  constructor(
    private membership:MembershipTypesService
  ){}

  ngOnInit(): void {
    this.membership.getMembershipTypesAll().subscribe(response =>{
      console.log(response);
    });

  }
}
