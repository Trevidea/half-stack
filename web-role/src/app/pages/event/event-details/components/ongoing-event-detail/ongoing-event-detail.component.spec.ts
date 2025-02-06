import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingEventDetailComponent } from './ongoing-event-detail.component';

describe('OngoingEventDetailComponent', () => {
  let component: OngoingEventDetailComponent;
  let fixture: ComponentFixture<OngoingEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingEventDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
