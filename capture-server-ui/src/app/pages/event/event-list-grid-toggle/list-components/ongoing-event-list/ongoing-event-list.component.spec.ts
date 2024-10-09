import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingEventListComponent } from './ongoing-event-list.component';

describe('OngoingEventListComponent', () => {
  let component: OngoingEventListComponent;
  let fixture: ComponentFixture<OngoingEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingEventListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
