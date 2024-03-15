import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollActionsComponent } from './payroll-actions.component';

describe('PayrollActionsComponent', () => {
  let component: PayrollActionsComponent;
  let fixture: ComponentFixture<PayrollActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
