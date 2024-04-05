import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEndNotifictionsComponent } from './event-end-notifictions.component';

describe('EventEndNotifictionsComponent', () => {
  let component: EventEndNotifictionsComponent;
  let fixture: ComponentFixture<EventEndNotifictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEndNotifictionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventEndNotifictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
