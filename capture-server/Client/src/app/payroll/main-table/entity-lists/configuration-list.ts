import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class configList extends ListDataBase {    
    constructor(private dataService: ModelServiceService, private route: Router)
    {
        super()
    }

    getEditUrl(): string {
        return '/configuration/edit';
    }
    getConfig(): {} {
        return {
            table:'config',
            mapping: [
                
                {
                    field: "key",
                    label: "Key"
                },
                {
                    field: "value",
                    label: "Value"
                }
            ]
        }
    }
    getData(service: ModelServiceService): Observable<any> {
        return service.ConfigsJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
}