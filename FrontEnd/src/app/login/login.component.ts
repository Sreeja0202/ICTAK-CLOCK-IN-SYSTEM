import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authservice.loginUser(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          this.respondeData = res;
          localStorage.setItem('token', this.respondeData.token);
          alert('Login Successfull!!!');
          this.loginForm.reset();
          this.router.navigate(['/adminhome']);
        },
        (err) => {
          alert('Some error occured');
          console.log(err);
        }
      );
    } else {
      alert('Please enter valid login  credentials');
    }
  }
}
