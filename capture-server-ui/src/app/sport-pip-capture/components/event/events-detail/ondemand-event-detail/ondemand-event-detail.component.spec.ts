import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndemandEventDetailComponent } from './ondemand-event-detail.component';

describe('OndemandEventDetailComponent', () => {
  let component: OndemandEventDetailComponent;
  let fixture: ComponentFixture<OndemandEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OndemandEventDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OndemandEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
