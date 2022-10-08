import { compileClassMetadata } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdmintimetrackerpageComponent } from './admintimetrackerpage/admintimetrackerpage.component';
import { AuthGuard } from './auth.guard';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TimetrackerpageComponent } from './timetrackerpage/timetrackerpage.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'timetrackerpage', component: TimetrackerpageComponent },
  { path: 'employees', component: EmployeesComponent },
  {
    path: 'adminhome',
    component: AdminhomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admintimetrackerpage',
    component: AdmintimetrackerpageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
