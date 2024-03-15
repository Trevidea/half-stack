import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDownloadModalComponent } from './attendance-download-modal.component';

describe('AttendanceDownloadModalComponent', () => {
  let component: AttendanceDownloadModalComponent;
  let fixture: ComponentFixture<AttendanceDownloadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceDownloadModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDownloadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
