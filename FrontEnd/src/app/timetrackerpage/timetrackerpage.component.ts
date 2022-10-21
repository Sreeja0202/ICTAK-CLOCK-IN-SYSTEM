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

  proForm!: FormGroup;
  taskForm!: FormGroup;
  showTrackerModal: boolean = false;
  showProjectModal: boolean = false;
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
  constructor(
    private router: Router,
    public authservice: AuthService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
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
      tdesc: ['', [Validators.required]],
      ttime: ['', [Validators.required]],
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
    this.authservice.getTrackerList().subscribe((res: Tracker[]) => {
      var newdoc = res.filter((element) => {
        return (
          (element.ttask === filter_data && element.empmail === variables) ||
          (element.tproject === filter_data && element.empmail === variables)
        );
      });
      this.trackers = newdoc;
      console.log(this.trackers);
    });
  }

  // tracker modal based functions starts here
  OnEditTracker() {}
  onDeleteTracker(id: any) {
    console.log(id);
    if (confirm('Are you sure you want to delete this project?')) {
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
      // console.log(this.TrackerForm.value);
      this.authservice.addTracker(this.TrackerForm.value).subscribe(
        (res) => {
          this.getTrackers();
          this.onCloseTrackerModal();
          this.onReset();
          Swal.fire('', 'Project Details successfully added!!!', 'success');
        },
        (err) => {
          console.log(err);
        }
      );
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
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec='0'+0;
        }
        if (this.min === 60) {
          this.hr++;
          this.hr=this.hr < 10 ? '0' + this.hr : this.hr;
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

  // timer related functions
  startstopTimer() {}
}
