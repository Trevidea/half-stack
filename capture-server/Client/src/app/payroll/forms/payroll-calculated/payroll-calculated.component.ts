import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll-calculated',
  templateUrl: './payroll-calculated.component.html',
  styleUrls: ['./payroll-calculated.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PayrollCalculatedComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

   
  _totalIncome: number;
  _netSalary:number ;



  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  cancelBtn(){
    this.router.navigate(['payroll-calculated'])
  }
  

  


// get total income  
  get totalIncome(): number {

  return  this._totalIncome= this.datasource.basic +
           this.datasource.hra +
           this.datasource.actualConveyanceAllowance +
           this.datasource.actualMedicalAllowance +
           this.datasource.actualSpecialAllowance +
           this.datasource.epf +
           this.datasource.tds -
           this.datasource.advances 
      
  }

//   onInputChange(): void {
//     // Call this method when any input value changes

//     this.total();
// }




}
