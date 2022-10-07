import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintimetrackerpageComponent } from './admintimetrackerpage.component';

describe('AdmintimetrackerpageComponent', () => {
  let component: AdmintimetrackerpageComponent;
  let fixture: ComponentFixture<AdmintimetrackerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmintimetrackerpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmintimetrackerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
