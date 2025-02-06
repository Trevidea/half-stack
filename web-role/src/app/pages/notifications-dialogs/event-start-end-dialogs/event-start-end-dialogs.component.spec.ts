import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStartEndDialogsComponent } from './event-start-end-dialogs.component';

describe('EventStartEndDialogsComponent', () => {
  let component: EventStartEndDialogsComponent;
  let fixture: ComponentFixture<EventStartEndDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventStartEndDialogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventStartEndDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
