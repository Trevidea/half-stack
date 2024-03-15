import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class payrollCalculatedList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router)
    {
        super()
    }
    getEditUrl(): string {
        return '/payroll-calculated/edit';
    }
    getConfig(): {} {
        return {
            table:'',
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
                    field: "basic",
                    label: "Basic"
                },
                {
                    field: "hra",
                    label: "HRA"
                },
                {
                    field: "actconveyance",
                    label: "Actual Conveyance Allowance"
                },
                {
                    field: "actmedicalall",
                    label: "Actual Medical Allowance"
                },
                {
                    field: "actspecialall",
                    label: "Actual Special Allowance"
                },
                {
                    field: "epf",
                    label: "EPF"
                },
                {
                    field: "tds",
                    label: "TDS"
                },
                {
                    field: "advances",
                    label: "Advances"
                },
                {
                    field: "income",
                    label: "Income"
                },
                {
                    field: "deduction",
                    label: "Deducation"
                },
                {
                    field: "netsalary",
                    label: "Net Salary"
                },

            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.PayrollsCalculatedJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
}