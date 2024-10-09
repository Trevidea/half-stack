import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingEventGridComponent } from './ongoing-event-grid.component';

describe('OngoingEventGridComponent', () => {
  let component: OngoingEventGridComponent;
  let fixture: ComponentFixture<OngoingEventGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingEventGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingEventGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
