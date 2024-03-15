import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class payrollAttendanceList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router)
    {
        super()
    }
    getEditUrl(): string {
        return '/payroll-attendance/edit';
    }
    getConfig(): {} {
        return {
            table:'payroll-attendance',
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
                    field: "totalsalarydays",
                    label: "Total Salary Days"
                },
                {
                    field: "attendedsalarydays",
                    label: "Attended Salary Days"
                },
                {
                    field: "paidleaves",
                    label: "Paid Leaves"
                },
                {
                    field: "sickleaves",
                    label: "Sick Leaves"
                },
                {
                    field: "paidbal",
                    label: "Paid Balance"
                },
                {
                    field: "sickbal",
                    label: "Sick Balance"
                },
                {
                    field: "lossofpaydays",
                    label: "Loss of pay days"
                },
                {
                    field: "latearrivals",
                    label: "Late Arrivals"
                },
                {
                    field: "earlydepartures",
                    label: "Early Departures"
                },
                {
                    field: "avghours",
                    label: "Average Hours"
                },
                {
                    
                }
            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.PayrollAttendancesJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
}