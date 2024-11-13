import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEventListComponent } from './upcoming-event-list.component';

describe('UpcomingEventListComponent', () => {
  let component: UpcomingEventListComponent;
  let fixture: ComponentFixture<UpcomingEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingEventListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
