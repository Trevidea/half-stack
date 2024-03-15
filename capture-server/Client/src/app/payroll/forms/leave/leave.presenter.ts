import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Transformer } from "src/app/blocks/transformer";
import { EmployeeModel } from "src/app/model-service/employee-model";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Data, Views } from "src/app/model-service/payroll-interface";
import { PayrollModel } from "src/app/model-service/payroll-model";
import { LeaveBuilder } from "./builders/leave";
import { LeaveView } from "./views/leave";

@Component({
    selector: 'app-leave-presenter',
    template: `<app-leave [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-leave>`,
    styleUrls: ['./leave.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class LeavePresenter implements OnInit {
    ds!: LeaveView
    actions!: Views.FormActions
    constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {

        this.ds = new LeaveView();
        this.ds.id = route.snapshot.params['id'];

        // Special scenario - to be embedded in framework
        if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
        ////////////////////////////////////////////////
        this.actions = new PresenterActions("leave", this.ds, dataFactory.SaveLeave, LeaveBuilder, router);

    }
    ngOnInit(): void {
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
            Transformer.ComposeObjectAsync(this.dataFactory.LeaveJson(this.ds.id), this.ds, LeaveBuilder);
        }
    }
}