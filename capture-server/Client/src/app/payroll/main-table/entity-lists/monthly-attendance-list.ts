import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class MonthlyAttendanceList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router)
    {
        super()
    }
    getEditUrl(): string {
        return 'monthly-attendances/edit'
    }

    getConfig(): {} {
        return {
            table: "monthly_attendance",
            mapping: [

                {
                    field: "code",
                    label: "Employee Code"
                },

                {
                    field: "payroll_month",
                    label: "Payroll Month"
                },
                {
                    field: 'total_salary_days',
                    label: 'Total Salary Days'
                },
                {
                    field: 'attended_salary_days',
                    label: 'Attended Salary Days'
                },
                {
                    field: 'paid_leaves',
                    label: 'Paid Leaves'
                },
                {
                    field: 'sick_leaves',
                    label: 'Sick Leaves'
                },
                {
                    field: 'cumm_paid_bal',
                    label: 'Cumulative Paid Balance'
                },
                {
                    field: 'cumm_sick_bal',
                    label: 'Cumulative  Sick Balance'
                },
                {
                    field: 'loss_of_paydays',
                    label: 'Loss Of Pay Days'
                },
                {
                    field: 'late_arrivals',
                    label: 'Late Arrivals'
                },
                {
                    field: 'early_departures',
                    label: 'Early Departures'
                },
                {
                    field: 'avg_hours',
                    label: 'Average Hours'
                },


            ]
        }
    }


    getData(service: ModelServiceService): Observable<any> {
        return service.MonthlyAttendanceListJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }

}