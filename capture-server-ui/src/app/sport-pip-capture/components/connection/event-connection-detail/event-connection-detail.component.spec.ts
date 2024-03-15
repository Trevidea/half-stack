import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConnectionDetailComponent } from './event-connection-detail.component';

describe('EventConnectionDetailComponent', () => {
  let component: EventConnectionDetailComponent;
  let fixture: ComponentFixture<EventConnectionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventConnectionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventConnectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
