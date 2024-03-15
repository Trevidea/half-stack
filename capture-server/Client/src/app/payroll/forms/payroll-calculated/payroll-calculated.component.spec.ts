import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCalculatedComponent } from './payroll-calculated.component';

describe('PayrollCalculatedComponent', () => {
  let component: PayrollCalculatedComponent;
  let fixture: ComponentFixture<PayrollCalculatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollCalculatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
