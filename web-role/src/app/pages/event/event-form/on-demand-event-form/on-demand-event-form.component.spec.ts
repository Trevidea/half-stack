import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandEventFormComponent } from './on-demand-event-form.component';

describe('OnDemandEventFormComponent', () => {
  let component: OnDemandEventFormComponent;
  let fixture: ComponentFixture<OnDemandEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnDemandEventFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnDemandEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
