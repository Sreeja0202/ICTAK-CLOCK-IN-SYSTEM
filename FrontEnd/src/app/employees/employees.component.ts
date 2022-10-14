import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Employee } from '../employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  empForm!: FormGroup;
  employees!: Employee[];
  showEmployeeModal: boolean = false;
  showProjectModal: boolean = false;
  editEmployeeMode: boolean = false;
  editProjectMode: boolean = false;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.fb.group({
      _id: '',
      ename: ['', [Validators.required]],
      erole: ['1', [Validators.required]],
      eemail: ['', [Validators.required, Validators.email]],
      epassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  getEmployees() {
    this.authservice.getEmployeeList().subscribe((res: Employee[]) => {
      console.log(res);
      this.employees = res;
    });
  }

  onAddEmployee() {
    this.showEmployeeModal = true;
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  onCloseEmployeeModal() {
    this.empForm.reset();
    this.showEmployeeModal = false;
    this.editEmployeeMode = false;
  }

  onEditEmployee(emp: Employee) {
    this.editEmployeeMode = true;
    this.showEmployeeModal = true;
    this.empForm.patchValue(emp);
  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      if (this.editEmployeeMode) {
        this.authservice.updateEmployee(this.empForm.value).subscribe(
          (res) => {
            this.getEmployees();
            this.onCloseEmployeeModal();
            Swal.fire(
              '',
              'Employee Details successfully updated!!!',
              'success'
            );
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.authservice.addEmployee(this.empForm.value).subscribe(
          (res) => {
            this.getEmployees();
            this.onCloseEmployeeModal();
            Swal.fire('', 'Employee Details successfully added!!!', 'success');
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      Swal.fire('', 'Please enter valid Credentials', 'error');
    }
  }

  onDeleteEmployee(id: any) {
    console.log(id);
    if (confirm('Are you sure you want to delete this employee?')) {
      this.authservice.deleteEmployee(id).subscribe(
        (res) => {
          console.log(res);
          this.getEmployees();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
