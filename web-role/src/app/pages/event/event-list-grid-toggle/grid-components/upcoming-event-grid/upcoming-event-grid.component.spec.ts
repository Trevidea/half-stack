import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEventGridComponent } from './upcoming-event-grid.component';

describe('UpcomingEventGridComponent', () => {
  let component: UpcomingEventGridComponent;
  let fixture: ComponentFixture<UpcomingEventGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingEventGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingEventGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
