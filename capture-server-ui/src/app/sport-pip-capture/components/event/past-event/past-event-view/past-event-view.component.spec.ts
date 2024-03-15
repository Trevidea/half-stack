import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventViewComponent } from './past-event-view.component';

describe('PastEventViewComponent', () => {
  let component: PastEventViewComponent;
  let fixture: ComponentFixture<PastEventViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastEventViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
