import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, map, pipe } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { SalarySlipActionComponent } from "./components/salary-slip-action/salary-slip-action.component";
import { ListAction, ListDataBase } from "./list-data-base";
import { FilterOneSelect } from "../filters/filter-one-select";
import { FilterBase } from "../filters/filter-base";
import { Transformer } from "src/app/blocks/transformer";
import { CollectionItemView, SelectItemView, SelectStringItemView } from "src/app/blocks/collection-item";
import { FilterBuilder } from "src/app/blocks/filter-builder";
import { MonthlySalaryModel } from "src/app/model-service/monthly-salary-model";
@Injectable({
    providedIn: 'root'
})
export class MonthlySalaryList extends ListDataBase {
    filterMonth: FilterOneSelect = new FilterOneSelect("Select Month", "payrollmonth", 0, ((payrollmonth: string) => `'${payrollmonth}'`));

    constructor(private dataService: ModelServiceService, private router: Router) {
        super();
        Transformer.ComposeCollectionView(this.dataService.payrollMonthsList(), this.filterMonth.datasource,
            (item => item));
    }
    getEditUrl(): string {
        return 'monthly-salaries/edit'
    }

    getConfig(): {} {
        return {
            table: "monthly-salary",
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
                    label: "Basic",
                    converter: this.cnvToDoubleDecimal
                },

                {
                    field: "hra",
                    label: "HRA",
                    converter: this.cnvToDoubleDecimal
                },
                {
                    field: "act_conveyance",
                    label: "Conveyance"
                },
                {
                    field: 'act_medical_all',
                    label: 'Medical Allowance'
                },
                {
                    field: 'act_special_all',
                    label: 'Special Allowance',
                    converter: this.cnvToDoubleDecimal
                },
                {
                    field: 'epf',
                    label: 'EPF'
                },
                {
                    field: 'tds',
                    label: 'TDS'
                },
                {
                    field: 'advances',
                    label: 'Advances'
                },
                {
                    field: 'income',
                    label: 'Income',
                    converter: this.cnvToZeroDecimal
                },
                {
                    field: 'deduction',
                    label: 'Deduction'
                },
                {
                    field: 'net_salary',
                    label: 'Net Salary',
                    converter: this.cnvToZeroDecimal
                }


            ]
        }

    }
    cnvToDoubleDecimal(inp: string): string {
        return parseFloat(inp).toFixed(2);
    }
    cnvToZeroDecimal(inp: string): string {
        return parseFloat(inp).toFixed(0);
    }
    getData(service: ModelServiceService): Observable<any> {
        const fb = new FilterBuilder();
        fb.addOne(this.filterMonth);
        if (fb.empty()) {
            return service.MonthlySalariesJson()
        }
        else {
            return service.MonthlySalariesForPayrollJson(fb.toString());
        }

    }
    override getActions(): ListAction[] {
        this.goToSalarySlip = this.goToSalarySlip.bind(this);

        return [{
            component: SalarySlipActionComponent, data:
            {
                onOpenSalarySlip: this.goToSalarySlip,
            }
        }];
    }
    goToSalarySlip() {
        console.log(this.selectedRow);
        if (this.selectedRow && this.selectedRow.length > 0) {
            const monthlySalary = this.selectedRow[0];
            const payrollId = monthlySalary.payroll_id;
            const employeeId = monthlySalary.employee_id;
            this.router.navigate([`salaryslip/${payrollId}/${employeeId}`])


        }
    }

    override getFilters(): FilterBase[] {
        return [this.filterMonth,];
    }


    override getRouter(): Router {
        return this.router;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }

}
