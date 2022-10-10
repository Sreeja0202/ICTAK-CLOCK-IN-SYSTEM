import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/employees';
  loginurl = 'http://localhost:3000/employees/login';
  prourl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  addEmployee(emp: Employee) {
    return this.http.post(this.url, emp);
  }

  loginUser(user: any) {
    return this.http.post(this.loginurl, user);
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
    console.log(logintoken);
    if (logintoken == '') {
      return false;
    }
    var extractedToken = logintoken.split('.')[1];
    var atobdata = atob(extractedToken);
    var finalData = JSON.parse(atobdata);
    console.log(finalData);
    if (finalData.roles === 'admin') {
      return true;
    } else {
      return false;
    }
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
