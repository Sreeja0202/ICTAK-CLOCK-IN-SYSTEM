import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
// import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css'],
})
export class AdminhomeComponent implements OnInit {
  showEmployeeModal: boolean = false;
  showProjectModal: boolean = false;
  editEmployeeMode: boolean = false;
  editProjectMode: boolean = false;

  empForm: any = FormGroup;
  projectForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getEmployees();
    this.empForm = this.fb.group({
      _id: '',
      ename: ['', [Validators.required]],
      erole: ['', [Validators.required]],
      eemail: ['', [Validators.required, Validators.email]],
      epassword: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.projectForm = this.fb.group({
      _id: '',
      pname: ['', [Validators.required]],
      pcategory: ['', [Validators.required]],
    });
  }

  onAddEmployee() {
    this.showEmployeeModal = true;
  }

  onAddProject() {
    this.showProjectModal = true;
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onCloseEmployeeModal() {
    this.empForm.reset();
    this.showEmployeeModal = false;
  }
  onCloseProjectModal() {
    this.projectForm.reset();
    this.showProjectModal = false;
  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      this.authservice.addEmployee(this.empForm.value).subscribe(
        (res) => {
          // this.getEmployees();
          console.log(res);
          this.onCloseEmployeeModal();
          alert('Employee Details successfully added!!!');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please enter valid Credentials');
    }
  }
  getEmployees() {}
  onProjectSubmit() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid) {
      this.authservice.addProject(this.projectForm.value).subscribe(
        (res) => {
          // this.getEmployees();
          console.log(res);
          this.onCloseProjectModal();
          alert('Project Details successfully added!!!');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please enter valid Credentials');
    }
  }
}
