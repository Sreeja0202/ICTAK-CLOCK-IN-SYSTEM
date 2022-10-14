import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-timetrackerpage',
  templateUrl: './timetrackerpage.component.html',
  styleUrls: ['./timetrackerpage.component.css'],
})
export class TimetrackerpageComponent implements OnInit {
  cardtitle = `USER`;
  cardcontent = `User details`;
  name = 'Name';
  project = `Project Details`;

  showFirst: boolean = false;

  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;

  startTimer: any;

  constructor(private router: Router, public authservice: AuthService) {}

  ngOnInit(): void {}

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  start(): void {
    if (!this.showFirst) {
      this.showFirst = true;
      this.startTimer = setInterval(() => {
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if (this.ms === 100) {
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0;
        }
        if (this.sec === 60) {
          this.min++;
          this.min = this.min < 10 ? '0' + this.sec : this.sec;
        }
        if (this.min === 60) {
          this.hr++;
          this.hr < 10 ? '0' + this.hr : this.hr;
          this.min = '0' + 0;
        }
      }, 10);
    } else {
      this.stop();
    }
  }

  stop(): void {
    clearInterval(this.startTimer);
    this.showFirst = false;
  }

  reset(): void {
    clearInterval(this.startTimer);
    this.showFirst = false;
    this.hr = this.min = this.sec = this.ms = '0' + 0;
  }
}
