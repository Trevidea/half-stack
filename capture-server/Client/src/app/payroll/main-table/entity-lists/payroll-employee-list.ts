import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class payrollEmployeeList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router)
    {
        super()
    }
    getEditUrl(): string {
        return '/payroll-employee/edit';
    }
    getConfig(): {} {
        return  {
            mapping: [
                {
                    field: "code",
                    label: "Employee Code"
                },
                {
                    field: "payrollmonth",
                    label: "Payroll Month"
                },
                {
                    field: "designation",
                    label: "Designation"
                },
                {
                    field: "bank",
                    label: "Bank"
                },
                {
                    field: "bankaccountnumber",
                    label: "Bank Account Number"
                },
                {
                    field: "pan",
                    label: "Pan"
                },
                {
                    field: "ctc",
                    label: "CTC"
                },
                {
                    field: "basicrate",
                    label: "Basic Rate"
                },
                {
                    field: "hrarate",
                    label: "HRA Rate"
                },
                {
                    field: "conveyanceallowance",
                    label: "Conveyance Allowance"
                },
                {
                    field: "medicalallowance",
                    label: "Medical Allowance"
                },
                {
                    field: "epfrate",
                    label: "EPF Rate"
                },



            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.PayrollEmployeesJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
}