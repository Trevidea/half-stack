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
export class salarySlipList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router, private modalService: ModalService)
    {
        super()
    }
    getEditUrl(): string {
        return '/salary-slip/edit';
    }
    getConfig(): {} {
        return {
            table:'salary-slip-field',
            mapping: [
                {
                    field: "key",
                    label: "Key"
                },
                {
                    field: "field",
                    label: "Field"
                }
            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.SalarySlipsJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
    override getDeleteConfirmation(yesAction:any, noAction:any): void {
        const message = "Do you want to delete the selected Salary Slip Field?"
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