import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";
import { ModalService } from "../../components/modal.service";

@Injectable({
    providedIn: 'root'
})
export class holidayList extends ListDataBase {
    constructor(private dataService: ModelServiceService, private route: Router, private modalService: ModalService)
    {
        super()
    }
    getEditUrl(): string {
        return '/holidays/edit';
    }
    getConfig(): {} {
        return {
            table: "holiday",
            mapping: [
                {
                    field: "name",
                    label: "Name"
                },
                {
                    field: "dt_holiday",
                    label: "Holiday"
                },
                {
                    field: "category",
                    label: "Category"
                },
                {
                    field: "year",
                    label: "For Year"
                }
            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.HolidaysJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }

    override getDeleteConfirmation(yesAction:any, noAction:any): void {
        const message = "Do you want to delete the selected Holiday?"
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