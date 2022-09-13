import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetrackerpageComponent } from './timetrackerpage.component';

describe('TimetrackerpageComponent', () => {
  let component: TimetrackerpageComponent;
  let fixture: ComponentFixture<TimetrackerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimetrackerpageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimetrackerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
