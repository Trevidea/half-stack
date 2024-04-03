import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingOndemandEventComponent } from './upcoming-ondemand-event.component';

describe('UpcomingOndemandEventComponent', () => {
  let component: UpcomingOndemandEventComponent;
  let fixture: ComponentFixture<UpcomingOndemandEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingOndemandEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingOndemandEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
