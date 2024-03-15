import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthly-salary',
  templateUrl: './monthly-salary.component.html',
  styleUrls: ['./monthly-salary.component.scss']
})
export class MonthlySalaryComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  _totalIncome: number;
  _netSalary:number ;
 
  constructor(private router: Router) { }
  ngOnInit(): void {
    
  }


  cancelBtn(){
    this.router.navigate(['monthly-salaries'])
  }

      // get total income  
      // get totalIncome(): number {
               
      //           this._totalIncome= this.datasource.basic + 
      //           this.datasource.hra + 
      //           this.datasource.actconveyance + 
      //           this.datasource.actMedicalall + 
      //           this.datasource.actSpecialall + 
      //           this.datasource.epf + this.datasource.tds 
      //           - this.datasource.advances;
      //   return  this._totalIncome
            
      //   }


        get netSalary(){
          return this._netSalary = this._totalIncome -
                 this.datasource.deduction
        }
        
      
}
