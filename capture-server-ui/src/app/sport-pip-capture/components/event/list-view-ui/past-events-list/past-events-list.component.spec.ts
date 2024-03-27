import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventsListComponent } from './past-events-list.component';

describe('PastEventsListComponent', () => {
  let component: PastEventsListComponent;
  let fixture: ComponentFixture<PastEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastEventsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
