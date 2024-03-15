import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { Transformer } from "src/app/blocks/transformer";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Data, Views } from "src/app/model-service/payroll-interface";
import { MonthlyAttendanceBuilder } from "./builders/monthly-attendance";
import { MonthlyAttendanceView } from "./views/monthly-attendance";
import { EmployeeBuilder } from "./builders/employee";
import { EmployeeModel } from "src/app/model-service/employee-model";
import { SelectItemView } from "src/app/blocks/collection-item";
import { PayrollModel } from "src/app/model-service/payroll-model";
import { PayrollBuilder } from "./builders/payroll";






@Component({
    selector: 'app-monthly-attendance-presenter',
    template: `<app-monthly-attendance [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-monthly-attendance>`,
    styleUrls: ['./monthly-attendance.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class MonthlyAttendancePresenter implements OnInit{
ds!:MonthlyAttendanceView ;
actions!: Views.FormActions ;


//   constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute)

constructor(public dataFactory:ModelServiceService , private router:Router, private route:ActivatedRoute){

    this.ds = new MonthlyAttendanceView();
    this.ds.id = route.snapshot.params['id'];

    // Special scenario - to be embedded in framework
    if ((this.ds.id as unknown) === 'null') { this.ds.id = null }

    ////////////////////////////////////////////////////
    this.actions = new PresenterActions("monthly-attendances", this.ds, dataFactory.SaveMonthlyAttendance,MonthlyAttendanceBuilder, router);
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
        console.log(this.ds.id)
        if (this.ds.id) {
            Transformer.ComposeObjectAsync(this.dataFactory.MonthlyAttendanceJson(this.ds.id), this.ds, MonthlyAttendanceBuilder)
                .then((model: Data.MonthlyAttendance) => {
                    console.log(model)
                    Transformer.ComposeObjectAsync(this.dataFactory.EmployeeJson(model.employee_id), this.ds,EmployeeBuilder )
                    Transformer.ComposeObjectAsync(this.dataFactory.PayrollJson(model.payroll_id), this.ds,PayrollBuilder )

                })
        }
    }
    
}