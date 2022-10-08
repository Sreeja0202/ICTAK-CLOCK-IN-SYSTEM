import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timetrackerpage',
  templateUrl: './timetrackerpage.component.html',
  styleUrls: ['./timetrackerpage.component.css'],
})
export class TimetrackerpageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
