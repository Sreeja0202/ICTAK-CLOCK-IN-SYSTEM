import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  proForm!: FormGroup;
  Project!: Project[];
  showEmployeeModal: boolean = false;
  showProjectModal: boolean = false;
  editEmployeeMode: boolean = false;
  editProjectMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.proForm = this.fb.group({
      _id: '',
      pname: ['', [Validators.required]],
      pcategory: ['', [Validators.required]],
    });
  }

  getProjects() {
    this.authservice.getProjectList().subscribe((res: Project[]) => {
      console.log(res);
      this.Project = res;
    });
  }

  onAddProject() {
    this.showProjectModal = true;
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onEditProject(pro: Project) {
    this.editProjectMode = true;
    this.showProjectModal = true;
    this.proForm.patchValue(pro);
  }

  onDeleteProject(id: any) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Project?')) {
      this.authservice.deleteProject(id).subscribe(
        (res) => {
          console.log(res);
          this.getProjects();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onCloseProjectModal() {
    this.showProjectModal = false;
    this.proForm.reset();
    this.editProjectMode = false;
  }

  onProSubmit() {
    if (this.proForm.valid) {
      if (this.editProjectMode) {
        console.log(this.proForm.value);
        this.authservice.updateProject(this.proForm.value).subscribe(
          (res) => {
            console.log(res);
            this.editProjectMode = false;

            this.getProjects();
            this.onCloseProjectModal();
            this.proForm.reset();
            Swal.fire('', 'Project Details successfully updated!!!', 'success');
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.authservice.addProject(this.proForm.value).subscribe(
          (res) => {
            this.getProjects();
            this.onCloseProjectModal();
            this.proForm.reset();
            Swal.fire('', 'Project Details successfully added!!!', 'success');
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      Swal.fire('', 'Please enter valid Credentials', 'error');
    }
  }
}
