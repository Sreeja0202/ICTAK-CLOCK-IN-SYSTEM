import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showFiller = false;
  userData: any;
  showtoggle = false;
  url="https://img.icons8.com/ios/100/000000/contract-job.png";
  onSelect(event: any){
    if(event.target.files[0]){
      let reader= new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any)=>{
        this.url = event.target.result;
      };
    }

  }

  constructor(private router: Router, public authservice: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authservice.getUserData();
    console.log('', this.userData);
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
  mydetailstoggle(){
    this.showtoggle = !this.showtoggle;
  }
}
