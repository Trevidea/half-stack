import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: CaptureDashboardComponent;
  let fixture: ComponentFixture<CaptureDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptureDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
