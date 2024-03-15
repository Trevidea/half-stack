import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalarySlipPdfComponent } from './salary-slip-pdf.component';

// import { SalarySlipPdfComponent } from './salary-slip-pdf.component.ts';

describe('SalarySlipComponent', () => {
  let component: SalarySlipPdfComponent;
  let fixture: ComponentFixture<SalarySlipPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarySlipPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalarySlipPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
