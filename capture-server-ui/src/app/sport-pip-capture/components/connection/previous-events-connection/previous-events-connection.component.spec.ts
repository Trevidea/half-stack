import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousEventsConnectionComponent } from './previous-events-connection.component';

describe('PreviousEventsConnectionComponent', () => {
  let component: PreviousEventsConnectionComponent;
  let fixture: ComponentFixture<PreviousEventsConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousEventsConnectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousEventsConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
