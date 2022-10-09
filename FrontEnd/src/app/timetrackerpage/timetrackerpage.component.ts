import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timetrackerpage',
  templateUrl: './timetrackerpage.component.html',
  styleUrls: ['./timetrackerpage.component.css'],
})
export class TimetrackerpageComponent implements OnInit {

 
  cardtitle=`USER`;
  cardcontent = `User details`;
  name="Name";
project=`Project Details`;

  constructor(private router: Router) {}



  ngOnInit(): void {}
 
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }





 
}
