import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { PayrollActionsComponent } from "./components/payroll-actions/payroll-actions.component";
import { ListAction, ListDataBase } from "./list-data-base";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Injectable({
    providedIn: 'root'
})
export class payrollList extends ListDataBase {

    constructor(private dataService: ModelServiceService,private route:Router) {
        super();
        this.processAttendance = this.processAttendance.bind(this);
        this.processSalary = this.processSalary.bind(this);
    }
    getEditUrl(): string {
        return '/payroll/edit';
    }
    getConfig(): {} {
        return {
            table:'payroll',
            mapping: [
                {
                    field: "month",
                    label: "Month"
                },
                {
                    field: "year",
                    label: "Year"
                },
                {
                    field: "dt_processed",
                    label: "Processed Date"
                },

            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.PayrollsJson()
    }
    override getActions(): ListAction[] {
        this.processAttendance = this.processAttendance.bind(this);
        this.processSalary = this.processSalary.bind(this);
        return [{
            component: PayrollActionsComponent, data:
            {
                onProAtt: this.processAttendance,
                onProSal: this.processSalary,
                selectedRow:this.selectedRow
            }
        }];
    }

    processAttendance() {
        console.log(this.selectedRow);
        if (this.selectedRow && this.selectedRow.length > 0) {
            const payroll = this.selectedRow[0]
            this.dataService.ProcessAttendance(payroll.year, payroll.month);
            Swal.fire({
                title: "Success",
                html: `<h5 style="color: green;">Record Saved</h5><br /><br>`,
                icon: 'success',
            }).then((result)=>{
                if (result.isConfirmed) {
                   this.route.navigate(['/monthly-attendances'])
                  } else if (result.isDenied) {
                    Swal.fire('You clicked the Cancel button!');
                  }
            });
        }
    }
    processSalary() {
        console.log(this.selectedRow);
        if (this.selectedRow && this.selectedRow.length > 0) {
            const payroll = this.selectedRow[0]
            this.dataService.ProcessSalary(payroll.year, payroll.month);

            Swal.fire({
                title: "Success",
                html: `<h5 style="color: green;">Record Saved</h5><br /><br>`,
                icon: 'success',
            }).then((result)=>{
                if (result.isConfirmed) {
                   this.route.navigate(['/monthly-salaries'])
                  } else if (result.isDenied) {
                    Swal.fire('You clicked the Cancel button!');
                  }
            });
        }
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
}