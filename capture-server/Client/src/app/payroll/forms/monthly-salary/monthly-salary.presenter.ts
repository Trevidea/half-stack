import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Data, Views } from "src/app/model-service/payroll-interface";
import { MonthlySalaryBuilder } from "./builder/monthly-salary";
import { MonthlySalaryView } from "./views/monthly-salary";
import { Transformer } from "src/app/blocks/transformer";
import { EmployeeModel } from "src/app/model-service/employee-model";
import { SelectItemView } from "src/app/blocks/collection-item";
import { PayrollModel } from "src/app/model-service/payroll-model";
import { EmployeeBuilder } from "./builder/employee";
import { PayrollBuilder } from "./builder/payroll";

@Component({
    selector: 'app-monthly-salary-presenter',
    template: `<app-monthly-salary [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-monthly-salary>`,
    styleUrls: ['./monthly-salary.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class MonthlySalaryPresenter implements OnInit{
    ds!:MonthlySalaryView ;
    actions!: Views.FormActions ;
    datasource: any;

    constructor(public dataFactory:ModelServiceService , private router:Router, private route:ActivatedRoute){

     
        this.ds = new MonthlySalaryView();
        this.ds.id = route.snapshot.params['id'];

        // Special scenario - to be embedded in framework
        if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
        ////////////////////////////////////////////////
        this.actions = new PresenterActions("monthly-salaries", this.ds, dataFactory.SaveMonthlysalary,MonthlySalaryBuilder , router);
    
        //  this.actions = new PresenterActions("payroll-calculated", this.ds, dataFactory.SavePayrollCalculated, PayrollCalculatedBuilder, router);

        Transformer.ComposeCollectionViewAsync(this.dataFactory.EmployeesJson(), this.ds.employees,
      (employeeItem: EmployeeModel) => {
        return new SelectItemView(employeeItem.id, employeeItem.code);
      })
      Transformer.ComposeCollectionViewAsync(this.dataFactory.PayrollsJson(), this.ds.payRoll,
      (payrollItem: PayrollModel) => {
        return new SelectItemView(payrollItem.id, payrollItem.month as any);
      })

    }
    ngOnInit(): void {
        if (this.ds.id) {
            console.log(this.ds.id)
            Transformer.ComposeObjectAsync(this.dataFactory.MonthlySalaryJson(this.ds.id), this.ds, MonthlySalaryBuilder).then((monthlysalary:Data.MonthlySalary)=>{
                Transformer.ComposeObjectAsync(this.dataFactory.EmployeeJson(monthlysalary.employee_id),this.ds,EmployeeBuilder)
                Transformer.ComposeObjectAsync(this.dataFactory.PayrollJson(monthlysalary.payroll_id),this.ds,PayrollBuilder)

            })
        }
        
    }

  
}

