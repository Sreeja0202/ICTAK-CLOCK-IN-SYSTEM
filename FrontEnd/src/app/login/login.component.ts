import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup; //---used for reactive forms
  respondeData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      eemail: ['', [Validators.required, Validators.email]],
      epassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logIn() {
    if (this.loginForm.valid) {
      this.authservice.loginUser(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          this.respondeData = res;
          localStorage.setItem('token', this.respondeData.token);
          if (this.authservice.HaveAccess()) {
            Swal.fire('', 'Login Successfull', 'success');
            this.loginForm.reset();
            this.router.navigate(['/adminhome']);
          } else {
            Swal.fire('', 'Login Successfull', 'success');
            this.loginForm.reset();
            this.router.navigate(['/timetrackerpage']);
          }
        },
        (err) => {
          Swal.fire('', 'Some error occured', 'error');
          console.log(err);
        }
      );
    } else {
      Swal.fire('', 'Please enter Valid Credentials', 'error');
    }
  }
}
