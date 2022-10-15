import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
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

  // for tracker modal
  showTrackerModal: boolean = false;

  showFirst: boolean = false;
  userData: any;
  // editTrackerMode: boolean = false;
  TrackerForm: any = FormGroup;

  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;

  startTimer: any;

  constructor(
    private router: Router,
    public authservice: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userData = this.authservice.getUserData();
    console.log('user data is home component -- > ', this.userData);

    this.TrackerForm = this.fb.group({
      _id: '',
      tdate: ['', [Validators.required]],
      tproject: ['', [Validators.required]],
      ttask: ['', [Validators.required]],
      tmode: ['', [Validators.required]],
      tdesc: ['', [Validators.required]],
      ttime: ['', [Validators.required]],
    });
  }

  onTrackSubmit() {
    Swal.fire('', 'Success!!!', 'success');
  }
  onStart() {
    this.showTrackerModal = true;
  }

  onCloseTrackerModal() {
    this.showTrackerModal = false;
  }
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
