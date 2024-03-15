import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledEventCardComponent } from './scheduled-event-card.component';

describe('ScheduledEventCardComponent', () => {
  let component: ScheduledEventCardComponent;
  let fixture: ComponentFixture<ScheduledEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledEventCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
