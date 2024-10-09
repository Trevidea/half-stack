import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListGridToggleComponent } from './event-list-grid-toggle.component';

describe('EventListGridToggleComponent', () => {
  let component: EventListGridToggleComponent;
  let fixture: ComponentFixture<EventListGridToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListGridToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListGridToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
