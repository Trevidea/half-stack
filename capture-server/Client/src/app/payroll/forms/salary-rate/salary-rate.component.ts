import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from '../../home/componenets/ngb-date-converter';

@Component({
  selector: 'app-salary-rate',
  templateUrl: './salary-rate.component.html',
  styleUrls: ['./salary-rate.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SalaryRateComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.datasource)
  }
  cancelBtn(){
    this.router.navigate(['salary-rates'])
  }
  privewPdf(){
    this.router.navigate([`salaryslip/${this.datasource.id}/${this.datasource.employees.SelectedItem.key}`])
  }
}
