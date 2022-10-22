import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Tracker } from '../tracker.model';
import { DatePipe } from '@angular/common';
import { Project } from '../project.model';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Job } from '../task.model';
import { Filter } from '../filter.model';
@Component({
  selector: 'app-timetrackerpage',
  templateUrl: './timetrackerpage.component.html',
  styleUrls: ['./timetrackerpage.component.css'],
  providers: [DatePipe],
})
export class TimetrackerpageComponent implements OnInit {
  cardtitle = `USER`;
  Tasks!: Job[];
  cardcontent = `User details`;
  name = 'Name';
  project = `Project Details`;
  trackers!: Tracker[];
  Project!: Project[];
  FilterForm!: FormGroup;
  timetaken: any;
  totaltimetaken: any;

  proForm!: FormGroup;
  taskForm!: FormGroup;
  showTrackerModal: boolean = false;
  showProjectModal: boolean = false;
  editTrackerMode: boolean = false;
  selected: any;
  showTaskModal: boolean = false;
  showFilterModal: boolean = false;

  userData: any;
  userdetails: any;
  filters!: Filter[];
  filter_details: any;
  // editTrackerMode: boolean = false;
  TrackerForm: any = FormGroup;

  showFirst: boolean = false;
  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;

  startTimer: any;
  myDate: any = new Date();
  yesterday: Date = new Date();
  thisWeek: Date = new Date();
  thisMonth: Date = new Date();
  stoptime: any;
  constructor(
    private router: Router,
    public authservice: AuthService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.yesterday = new Date(
      this.yesterday.setDate(this.yesterday.getDate() - 1)
    );
    this.thisWeek = this.getMonday(new Date());
    this.thisMonth = new Date(
      new Date(this.thisMonth.getFullYear(), this.thisMonth.getMonth(), 1)
    );
  }

  ngOnInit(): void {
    this.userData = this.authservice.getUserData();
    console.log(' ', this.userData);

    this.getTrackers();
    this.getTasks();
    this.getFilters();
    this.TrackerForm = this.fb.group({
      _id: '',
      empmail: this.authservice.userData.email,
      tdate: ['', [Validators.required]],
      tproject: ['', [Validators.required]],
      ttask: ['', [Validators.required]],
      tmode: ['', [Validators.required]],
      ttime: ['', [Validators.required]],
      tdesc: ['', [Validators.required]],
    });

    this.FilterForm = this.fb.group({
      _id: '',
      fproject: ['', [Validators.required]],
      ftask: ['', [Validators.required]],
      fperiod: ['', [Validators.required]],
    });

    this.getProjects();
    this.proForm = this.fb.group({
      _id: '',
      pname: ['', [Validators.required]],
    });
    this.taskForm = this.fb.group({
      _id: '',
      tname: ['', [Validators.required]],
    });
  }

  getMonday(d: Date) {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  getTasks() {
    this.authservice.getTaskList().subscribe((res: Job[]) => {
      // console.log(res);
      this.Tasks = res;
    });
  }
  getFilters() {
    this.authservice.getFilterList().subscribe((res: Filter[]) => {
      // console.log(res);
      this.filters = res;
    });
  }
  getProjects() {
    this.authservice.getProjectList().subscribe((res: Project[]) => {
      // console.log(res);
      this.Project = res;
    });
  }

  // filter based functions
  filter(filter_data: any) {
    const variables = this.authservice.userData.email;
    console.log(filter_data);
    console.log(this.yesterday);
    if (filter_data === 'yesterday') filter_data = this.yesterday.getTime();
    if (filter_data === 'this_week') filter_data = this.thisWeek.getTime();
    if (filter_data === 'this_month') filter_data = this.thisMonth.getTime();
    console.log(this.thisMonth.getTime());
    this.authservice.getTrackerList().subscribe((res: Tracker[]) => {
      var newdoc = res.filter((element) => {
        console.log('tDate', new Date(element.tdate));
        console.log('filterdata', filter_data);

        return (
          (element.ttask === filter_data && element.empmail === variables) ||
          (element.tproject === filter_data && element.empmail === variables) ||
          (new Date(element.tdate).getTime() > filter_data &&
            element.empmail === variables)
        );
      });
      this.trackers = newdoc;
    });

    console.log(this.trackers);
  }

  // tracker modal based functions starts here
  onEditTracker(trac: Tracker) {
    this.editTrackerMode = true;
    this.showTrackerModal = true;
    this.TrackerForm.patchValue(trac);
  }
  onDeleterTracker(id: any) {
    console.log(id);
    if (confirm('Are you sure you want to delete this work?')) {
      this.authservice.deleteTracker(id).subscribe(
        (res) => {
          // console.log(res);
          this.getTrackers();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  // to filter the tracker list for that specific employee
  getTrackers() {
    // console.log(this.authservice.userData.email);
    const variables = this.authservice.userData.email;

    this.authservice.getTrackerList().subscribe((res: Tracker[]) => {
      var newdoc = res.filter((element) => {
        return element.empmail === variables;
      });
      this.trackers = newdoc;
      console.log(this.trackers);
    });
  }

  onReset() {
    this.TrackerForm.reset({
      empmail: this.TrackerForm.get('empmail').value,
    });
  }

  onFilterSubmit() {
    this.authservice.addFilter(this.FilterForm.value).subscribe((res) => {
      this.getFilters();
      this.onCloseFilterModal();
      Swal.fire('', 'Project Details successfully added!!!', 'success');
    });
  }
  onTrackSubmit() {
    if (this.TrackerForm.valid) {
      console.log(this.TrackerForm.value);
      if (this.editTrackerMode) {
        this.authservice.updateTracker(this.TrackerForm.value).subscribe(
          (res) => {
            this.getTrackers();
            this.onCloseTrackerModal();
            Swal.fire('', 'Tracker details successfully updated!!!', 'success');
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.authservice.addTracker(this.TrackerForm.value).subscribe(
          (res) => {
            this.getTrackers();
            this.onCloseTrackerModal();
            this.onReset();
            Swal.fire('', 'Project successfully added!!!', 'success');
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      Swal.fire('', 'Enter All Fields', 'error');
    }
  }

  onAddProject() {
    this.showProjectModal = true;
  }

  onAddTask() {
    this.showTaskModal = true;
  }

  addFilter() {
    this.showFilterModal = true;
  }

  onCloseProjectModal() {
    this.showProjectModal = false;
    this.proForm.reset();
  }
  onCloseFilterModal() {
    this.showFilterModal = false;
  }

  onProSubmit() {
    if (this.proForm.valid) {
      this.authservice.addProject(this.proForm.value).subscribe(
        (res) => {
          this.getProjects();
          this.onCloseProjectModal();
          this.proForm.reset();
          Swal.fire('', 'Project Details successfully added!!!', 'success');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      Swal.fire('', 'Please enter valid Credentials', 'error');
    }
  }

  onTaskSubmit() {
    if (this.taskForm.valid) {
      this.authservice.addTask(this.taskForm.value).subscribe(
        (res) => {
          this.getTasks();
          this.onCloseTaskModal();
          this.taskForm.reset();
          Swal.fire('', 'Task successfully added!!!', 'success');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      Swal.fire('', 'Please enter valid Credentials', 'error');
    }
  }

  onStart() {
    this.showTrackerModal = true;
  }

  onCloseTrackerModal() {
    this.showTrackerModal = false;
  }

  onCloseTaskModal() {
    this.showTaskModal = false;
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // tracker modal based functions ends here

  startstopTimer(index: number): void {
    console.log('index', index, 'tracker=', this.trackers[index].isTimer);

    console.log(this.timetaken);
    if (!this.trackers[index].isTimer) {
      this.stop();
      this.trackers = this.trackers.map((tracker) => {
        tracker.isTimer = false;
        return tracker;
      });
      this.totaltimetaken = this.hr + ':' + this.min + ':' + this.sec;

      console.log(this.timetaken);
      this.trackers[index].isTimer = true;

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
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }
        if (this.min === 60) {
          this.hr++;
          this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
          this.min = '0' + 0;
        }
      }, 10);

      // this.totaltimetaken =
      //   this.timetaken + this.hr + ':' + this.min + ':' + this.sec;
      // console.log(this.totaltimetaken);
    } else {
      this.stoptime = this.hr + ':' + this.min + ':' + this.sec;
      this.stop();

      this.trackers[index].isTimer = false;
    }
  }

  stop(): void {
    this.timetaken = this.hr + ':' + this.min + ':' + this.sec;
    clearInterval(this.startTimer);
    this.showFirst = false;
    this.ms = '0' + 0;
    this.sec = '0' + 0;
    this.min = '0' + 0;
    this.hr = '0' + 0;
  }
  // submittime() {
  //   this.authservice.addtime(this.timetaken).subscribe((res: any) => {
  //     console.log('Successfully added totaltime');
  //   }),
  //     (err: any) => {
  //       console.log(err);
  //     };
  // }

  reset(): void {
    clearInterval(this.startTimer);
    this.showFirst = false;
    this.hr = this.min = this.sec = this.ms = '0' + 0;
  }
}
