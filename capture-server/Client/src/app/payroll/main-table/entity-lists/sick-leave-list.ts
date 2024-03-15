import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { ModalService } from "../../components/modal.service";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";

@Injectable({
    providedIn: 'root'
})
export class sickLeaveList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router, private modalService: ModalService) {
        super()
        this.rowActionApprove = this.rowActionApprove.bind(this);

        this.rowActions.splice(0, 0, {
            label: "Approve",
            action: this.rowActionApprove,
            icon: "bi bi-check-circle"
        })
    }
    rowActionApprove(row: any) {

    }

    getEditUrl(): string {
        return '/sick-leaves/edit';
    }
    getConfig(): {} {
        return {
            table: 'sick_leave',
            mapping: [
                {
                    field: "code",
                    label: "Employee Code"
                },
                {
                    field: "dt_application",
                    label: "Date of Application"
                },
                {
                    field: "dt_from",
                    label: "Leave From"
                },
                {
                    field: "count",
                    label: "No. of Leaves"
                },

            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.SickLeavesJson()
    }
    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
    override getDeleteConfirmation(yesAction:any, noAction:any): void {
        const message = "Do you want to delete the selected Sick Leave?"
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