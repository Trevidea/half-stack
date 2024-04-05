import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStartNotificationsComponent } from './event-start-notifications.component';

describe('EventNotificationsComponent', () => {
  let component: EventStartNotificationsComponent;
  let fixture: ComponentFixture<EventStartNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventStartNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventStartNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
