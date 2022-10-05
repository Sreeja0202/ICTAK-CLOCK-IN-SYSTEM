import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  login: any = FormGroup; //---used for reactive forms
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  userVerify() {
    // Swal.fire('Good job!', 'You clicked the button!', 'success');
    // this.router.navigate(['/signup']);
    if (this.login.valid) {
      Swal.fire('Login Succesfull', '', 'success');
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    } else {
      Swal.fire('User not Found!!', '', 'error');
    }
  }

  loginSubmit(data: any) {
    console.log(data);
  }
}
