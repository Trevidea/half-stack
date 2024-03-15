import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceActionsComponent } from './attendance-actions.component';

describe('AttendanceActionsComponent', () => {
  let component: AttendanceActionsComponent;
  let fixture: ComponentFixture<AttendanceActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
