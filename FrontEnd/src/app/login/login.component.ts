import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // userVerify() {
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'success',
  //     title: 'Login Successfull',
  //     showConfirmButton: false,
  //     timer: 1800,
  //   });
  // }
  hide = true;

  login: any = FormGroup; //---used for reactive forms
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  loginSubmit(data: any) {
    console.log(data);
  }
}
