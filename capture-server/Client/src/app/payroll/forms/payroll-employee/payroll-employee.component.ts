import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll-employee',
  templateUrl: './payroll-employee.component.html',
  styleUrls: ['./payroll-employee.component.scss']
})
export class PayrollEmployeeComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancelBtn(){
    this.router.navigate(['payroll-employee'])
  }
  privewPdf(){
    this.router.navigate(['salaryslip'])
  }
}
