import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandEventCardComponent } from './on-demand-event-card.component';

describe('OnDemandEventCardComponent', () => {
  let component: OnDemandEventCardComponent;
  let fixture: ComponentFixture<OnDemandEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnDemandEventCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnDemandEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
