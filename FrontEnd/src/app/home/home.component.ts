import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showFiller = false;
  userData: any;
  constructor(private router: Router, public authservice: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authservice.getUserData();
    console.log('user data is home component -- > ', this.userData);
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
