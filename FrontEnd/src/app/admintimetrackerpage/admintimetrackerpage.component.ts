import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admintimetrackerpage',
  templateUrl: './admintimetrackerpage.component.html',
  styleUrls: ['./admintimetrackerpage.component.css']
})
export class AdmintimetrackerpageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
