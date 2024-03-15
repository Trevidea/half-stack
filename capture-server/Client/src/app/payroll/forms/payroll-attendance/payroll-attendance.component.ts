import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll-attendance',
  templateUrl: './payroll-attendance.component.html',
  styleUrls: ['./payroll-attendance.component.scss']
})
export class PayrollAttendanceComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancelBtn(){
    this.router.navigate(['payroll-attendance'])
  }


}
