import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGoingEventComponent } from './on-going-event.component';

describe('OnGoingEventComponent', () => {
  let component: OnGoingEventComponent;
  let fixture: ComponentFixture<OnGoingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnGoingEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnGoingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
