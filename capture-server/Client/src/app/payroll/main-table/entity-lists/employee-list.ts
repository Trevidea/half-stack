import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ModalService } from "../../components/modal.service";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";

@Injectable({
    providedIn: 'root'
})
export class employeeList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router, private modalService: ModalService)
    {
        super()
    }
    getEditUrl(): string {
        return '/employees/edit';
    }
    getConfig(): {} {
        return {
            table: "employee",
            mapping: [

                {
                    field: "code",
                    label: "Employee Code"
                },
                {
                    field: "first_name",
                    label: "First Name"
                },
                {
                    field: "last_name",
                    label: "Last Name"
                },
                {
                    field: "designation",
                    label: "Designation"
                },
                {
                    field: "department",
                    label: "Department"
                },
                {
                    field: "dt_joining",
                    label: "Joining Date"
                },
                {
                    field: "weekly_off",
                    label: "Weekly Off"
                },
                {
                    field: "holiday_cat",
                    label: "Holiday"
                },
                {
                    field: "paid_alc",
                    label: "Paid Allocated"
                },
                {
                    field: "sick_alc",
                    label: "Sick Allocated"
                },
                {
                    field: "paid_bal",
                    label: "Paid Balance"
                },
                {
                    field: "sick_bal",
                    label: "Sick Balance"
                },
                {
                    field: "in_time",
                    label: 'In time'
                },
                {
                    field: 'out_time',
                    label: 'Out time'
                }
            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {

        return service.EmployeesJson()

    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }

    override getDeleteConfirmation(yesAction:any, noAction:any): void {
        const message = "Do you want to delete the selected Employee?"
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