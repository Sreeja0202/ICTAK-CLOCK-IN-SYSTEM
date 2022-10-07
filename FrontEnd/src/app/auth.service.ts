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

  addProject(pro: Project) {
    return this.http.post(this.url, pro);
  }

  loginUser(user: Employee) {
    return this.http.post<any>(this.loginurl, user);
  }
}
