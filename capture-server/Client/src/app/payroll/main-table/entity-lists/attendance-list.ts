import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { SelectStringItemView } from "src/app/blocks/collection-item";
import { FilterBuilder } from "src/app/blocks/filter-builder";
import { Transformer } from "src/app/blocks/transformer";
import { EmployeeModel } from "src/app/model-service/employee-model";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { FilterBase } from "../filters/filter-base";
import { FilterSmaller } from "../filters/filter-smaller";
import { FilterOneSelect } from "../filters/filter-one-select";
import { ListAction, ListDataBase } from "./list-data-base";
import { FilterLarger } from "../filters/filter-larger";
import { Injectable } from "@angular/core";
import { AttendanceActionsComponent } from "./components/attendance-actions/attendance-actions.component";
import { FilterSmallerIncluding } from "../filters/filter-smaller-including";
import { FilterLargerIncluding } from "../filters/filter-larger-including";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { ModalService } from "../../components/modal.service";

@Injectable({
    providedIn: 'root'
})
export class attendanceList extends ListDataBase {
    filterEmployee: FilterOneSelect = new FilterOneSelect("Select Employees", "code", 0, ((code: string) => `'${code}'`));
    filterDtAttendanceFrom: FilterSmallerIncluding = new FilterSmallerIncluding("From Date", "dt_attendance", 1, ((dt: string) => `'${dt}'`), this.getDateStart());
    filterDtAttendanceTill: FilterLargerIncluding = new FilterLargerIncluding("Till Date", "dt_attendance", 1, ((dt: string) => `'${dt}'`), this.getDateEnd());
    constructor(private dataService: ModelServiceService, private route: Router, private modalService:ModalService) {
        super();
        Transformer.ComposeCollectionViewAsync(this.dataService.EmployeesJson(), this.filterEmployee.datasource, ((emp: EmployeeModel) => {
            return new SelectStringItemView(emp.code, `${emp.first_name} ${emp.last_name} (${emp.code})`);
        }))
    }
    getEditUrl(): string {
        return '/attendances/edit';
    }
    getConfig(): {} {
        return {
            table: "attendance-list",
            fontcolors: [
                {
                    color: "red",
                    condition: "edited"
                },
                {
                    color: "black",
                    condition: "default"
                }
            ],
            mapping: [
                {
                    field: "code",
                    label: "Employee Code"
                },
                {
                    field: "dt_attendance",
                    label: "Attendance Date"
                },
                {
                    field: "dt_day",
                    label: "Weekday"
                },
                {
                    field: "in_time_str",
                    label: "In-Time",
                    converter: this.cnvTime
                },
                {
                    field: "out_time_str",
                    label: "Out-Time",
                    converter: this.cnvTime
                },
                {
                    field: "hours",
                    label: "Hours"
                },
                {
                    field: "minutes",
                    label: "Minutes"
                },
                {
                    field: "working_day",
                    label: "Working Date",
                    converter: this.cnvBool
                },
                {
                    field: "weekly_off",
                    label: "Weekly Off",
                    converter: this.cnvBool
                },
                {
                    field: "holiday",
                    label: "Holiday",
                    converter: this.cnvBool
                },
            ]
        }
    }
    cnvTime(inp: string): string {
        if ((inp == "WO") || (inp == "HD") || (inp == "A"))
            return inp;

        var tm24 = inp.padStart(4, "0");
        tm24 = tm24.substring(0, 2) + ":" + tm24.substring(2, 4)
        const tm12 = new Date('1970-01-01T' + tm24 + 'Z')
            .toLocaleTimeString('en-US',
                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            );
        return tm12;
    }
    cnvBool(inp: number): string {
        if (inp == 0)
            return "No";
        else
            return "Yes";
    }
    getData(service: ModelServiceService): Observable<any> {
        const fb = new FilterBuilder();
        fb.addOne(this.filterEmployee);
        fb.addSmallerIncluding(this.filterDtAttendanceFrom);
        fb.addLargerIncluding(this.filterDtAttendanceTill);
        if (fb.empty()) {
            console.log(fb.toString());
            return service.AttendancesJson()
        }
        else {
            console.log(fb.toString());
            return service.AttendancesJsonRaw(fb.toString())
        }
        // return service.AttendancesJson()
    }
    override getActions(): ListAction[] {
        this.importAttendance = this.importAttendance.bind(this);
        return [{
            component: AttendanceActionsComponent, data:
            {
                onImportAttendance: this.importAttendance,
            }
        }];
    }
    importAttendance(_month: string, _year: string) {

        const lastDayOfMonth = this.getLastDayOfMonth(parseInt(_year), _month)
        this.filterDtAttendanceFrom.value = `${_year}-${_month}-01`
        this.filterDtAttendanceTill.value = `${lastDayOfMonth}`
        const forMonth = `${_month}${_year}`
        console.log("Importing attendance for: ", forMonth);
        this.dataService.ImportAttendance(forMonth);
        this.populate(this.dataService)
    }
    override getFilters(): FilterBase[] {
        return [this.filterEmployee, this.filterDtAttendanceFrom, this.filterDtAttendanceTill];
    }

    
    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
    override getDeleteConfirmation(yesAction:any, noAction:any): void {
        const message = "Do you want to delete the selected Attendance?"
        const modalRef = this.modalService.openModal(ConfirmationModalComponent, { message });
        
        modalRef.subscribe((result) => {
            if (result) {
                // User clicked Confirm
                console.log('Confirmed');
                yesAction();
            } else {
                // User clicked Cancel or closed the modal
                console.log('Cancelled');
                noAction();
            }
        });
    }

}


