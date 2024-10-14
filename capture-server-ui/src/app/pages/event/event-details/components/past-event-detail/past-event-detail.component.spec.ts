import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventDetailComponent } from './past-event-detail.component';

describe('PastEventDetailComponent', () => {
  let component: PastEventDetailComponent;
  let fixture: ComponentFixture<PastEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastEventDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
