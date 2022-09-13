import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };

  userVerify() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login Successfull',
      showConfirmButton: false,
      timer: 1800,
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
