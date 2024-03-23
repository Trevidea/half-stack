import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGoingEventDetailComponent } from './on-going-event-detail.component';

describe('OnGoingEventDetailComponent', () => {
  let component: OnGoingEventDetailComponent;
  let fixture: ComponentFixture<OnGoingEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnGoingEventDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnGoingEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
