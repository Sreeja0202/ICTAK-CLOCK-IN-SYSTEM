import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Project } from './project.model';
import { Tracker } from './tracker.model';
import { Job } from './task.model';
import { Filter } from './filter.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/employees';
  loginurl = 'http://localhost:3000/employees/login';
  prourl = 'http://localhost:3000/projects';
  trackerurl = 'http://localhost:3000/trackers';
  taskurl = 'http://localhost:3000/tasks';
  filterurl = 'http://localhost:3000/filters';
  userData: any;

  constructor(private http: HttpClient) {
    const data = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data);
    }
  }
  // addtime(timetracker: TimeTracker) {
  //   return this.http.post(this.timetrackerurl, timetracker);
  // }

  getTaskList() {
    return this.http.get<Job[]>(this.taskurl);
  }

  getFilterList() {
    return this.http.get<Filter[]>(this.filterurl);
  }

  addEmployee(emp: Employee) {
    return this.http.post(this.url, emp);
  }

  addTask(task: Job) {
    return this.http.post(this.taskurl, task);
  }

  addFilter(filter: Filter) {
    return this.http.post(this.filterurl, filter);
  }

  addTracker(trac: Tracker) {
    return this.http.post(this.trackerurl, trac);
  }

  getTrackerList() {
    return this.http.get<Tracker[]>(this.trackerurl);
  }
  updateTracker(trac: Tracker) {
    return this.http.put(`${this.trackerurl}/${trac._id}`, trac);
  }

  loginUser(user: any) {
    return this.http.post(this.loginurl, user);
  }

  deleteTracker(id: any) {
    return this.http.delete(`${this.trackerurl}/${id}`);
  }

  IsloggedIn() {
    return !!localStorage.getItem('token');
  }

  getEmployeeList() {
    return this.http.get<Employee[]>(this.url);
  }

  deleteEmployee(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateEmployee(emp: Employee) {
    return this.http.put(`${this.url}/${emp._id}`, emp);
  }

  HaveAccess() {
    var logintoken = localStorage.getItem('token') || '';
    // console.log(logintoken);
    if (logintoken == '') {
      return false;
    }
    var extractedToken = logintoken.split('.')[1];
    var atobdata = atob(extractedToken);
    localStorage.setItem('userData', atobdata);
    this.userData = JSON.parse(atobdata);
    // console.log(this.userData);

    if (this.userData.roles === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  getUserData() {
    return this.userData;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////// // project url starting /////////////////////////////

  getProjectList() {
    return this.http.get<Project[]>(this.prourl);
  }
  deleteProject(id: any) {
    return this.http.delete(`${this.prourl}/${id}`);
  }
  addProject(pro: Project) {
    return this.http.post(this.prourl, pro);
  }
  updateProject(pro: Project) {
    return this.http.put(`${this.prourl}/${pro._id}`, pro);
  }
}
