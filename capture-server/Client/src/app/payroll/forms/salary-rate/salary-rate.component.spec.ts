import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryRateComponent } from './salary-rate.component';

describe('SalaryRateComponent', () => {
  let component: SalaryRateComponent;
  let fixture: ComponentFixture<SalaryRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
