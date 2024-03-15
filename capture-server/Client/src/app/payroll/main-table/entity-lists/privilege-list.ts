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
export class privilegeList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router, private modalService: ModalService)
    {
        super()
    }
    getEditUrl(): string {
        return '/privilege/edit';
    }
    getConfig(): {} {
        return  {
            table:'privilege',
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
                    field: "count",
                    label: "Count"
                },
                {
                    field: "description",
                    label: "Description"
                },

            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.PrivilegesJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
    override getDeleteConfirmation(yesAction:any, noAction:any): void {
        const message = "Do you want to delete the selected Privelege?"
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