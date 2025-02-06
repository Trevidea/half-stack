import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventGridComponent } from './past-event-grid.component';

describe('PastEventGridComponent', () => {
  let component: PastEventGridComponent;
  let fixture: ComponentFixture<PastEventGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastEventGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastEventGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
