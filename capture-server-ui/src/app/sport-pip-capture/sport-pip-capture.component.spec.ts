import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPipCaptureComponent } from './sport-pip-capture.component';

describe('SportPipCaptureComponent', () => {
  let component: SportPipCaptureComponent;
  let fixture: ComponentFixture<SportPipCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportPipCaptureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportPipCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
