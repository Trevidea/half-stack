import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpcomingComponent } from './app-upcoming.component';

describe('AppUpcomingComponent', () => {
  let component: AppUpcomingComponent;
  let fixture: ComponentFixture<AppUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUpcomingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
