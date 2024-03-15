import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Transformer } from "src/app/blocks/transformer";
import { EmployeeModel } from "src/app/model-service/employee-model";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Data, Views } from "src/app/model-service/payroll-interface";
import { PayrollModel } from "src/app/model-service/payroll-model";
import { EmployeeBuilder } from "./builders/employee";
import { PayrollBuilder } from "./builders/payroll";
import { PayrollAttendanceBuilder } from "./builders/payroll-attendance";
import { PayrollAttendanceView } from "./views/payroll-attendance";

@Component({
    selector: 'app-payroll-attendance-presenter',
    template: `<app-payroll-attendance [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-payroll-attendance>`,
    styleUrls: ['./payroll-attendance.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class PayrollAttendancePresenter implements OnInit {
    ds!: PayrollAttendanceView
    actions!: Views.FormActions
    constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {

        this.ds = new PayrollAttendanceView();
        this.ds.id = route.snapshot.params['id'];

        // Special scenario - to be embedded in framework
        if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
        ////////////////////////////////////////////////
        this.actions = new PresenterActions("payroll-attendance", this.ds, dataFactory.SavePayrollAttendance, PayrollAttendanceBuilder, router);

    }
    ngOnInit(): void {

        this.ds.payrollId.onItemSelected((e: { selectedItem: SelectItemView }) => {
            console.log(e.selectedItem)
            Transformer.ComposeObjectAsync(this.dataFactory.PayrollJson(e.selectedItem.key), this.ds, PayrollBuilder)
        })

        this.ds.employeeCode.onItemSelected((e: { selectedItem: SelectItemView }) => {
            Transformer.ComposeObjectAsync(this.dataFactory.EmployeeJson(e.selectedItem.key), this.ds, EmployeeBuilder)
        })


        Transformer.ComposeCollectionViewAsync(this.dataFactory.EmployeesJson(), this.ds.employeeCode,
            (employeeItem: EmployeeModel) => {
                return new SelectItemView(employeeItem.id, employeeItem.code);
            })
        Transformer.ComposeCollectionViewAsync(this.dataFactory.PayrollsJson(), this.ds.payrollId,
            (payrollItem: PayrollModel) => {
                var month: string

                if (payrollItem.month) {
                    switch (payrollItem.month) {
                        case 1: {
                            month = "January"
                            break;
                        }
                        case 2: {
                            month = "February"
                            break;
                        }
                        case 3: {
                            month = "March"
                            break;
                        }
                        case 4: {
                            month = "April"
                            break;
                        }
                        case 5: {
                            month = "May"
                            break;
                        }
                        case 6: {
                            month = "June"
                            break;
                        }
                        case 7: {
                            month = "July"
                            break;
                        }
                        case 8: {
                            month = "August"
                            break;
                        }
                        case 9: {
                            month = "September"
                            break;
                        }
                        case 10: {
                            month = "October"
                            break;
                        }
                        case 11: {
                            month = "November"
                            break;
                        }
                        case 12: {
                            month = "December"
                            break;
                        }
                        default: {
                            //statements; 
                            break;
                        }
                    }
                }
                return new SelectItemView(payrollItem.id, month);
            })
        if (this.ds.id) {
            Transformer.ComposeObjectAsync(this.dataFactory.PayrollAttendanceJson(this.ds.id), this.ds, PayrollAttendanceBuilder)
                .then((model: Data.PayrollAttendance) => {
                    // Transformer.ComposeCollectionAsync(this.dataFactory.EmployeesJson(), this.ds.employeeCode, EmployeeBuilder)

                })
        }
    }
}