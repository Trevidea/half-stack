import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledEventSidebarComponent } from './scheduled-event-sidebar.component';

describe('ScheduledEventSidebarComponent', () => {
  let component: ScheduledEventSidebarComponent;
  let fixture: ComponentFixture<ScheduledEventSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledEventSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledEventSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
