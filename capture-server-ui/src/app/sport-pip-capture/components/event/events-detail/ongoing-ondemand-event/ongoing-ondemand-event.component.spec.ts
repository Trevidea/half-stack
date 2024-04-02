import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingOndemandEventComponent } from './ongoing-ondemand-event.component';

describe('OngoingOndemandEventComponent', () => {
  let component: OngoingOndemandEventComponent;
  let fixture: ComponentFixture<OngoingOndemandEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingOndemandEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingOndemandEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
