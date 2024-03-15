import { Observable } from "rxjs";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { ListDataBase } from "./list-data-base";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class salaryRateList extends ListDataBase{
    constructor(private dataService: ModelServiceService, private route: Router)
    {
        super()
    }
    getEditUrl(): string {
        return '/salary-rates/edit';
    }

    getConfig(): {} {
       return{
        table:'salary-rate',
        mapping:[

            {
                field: "code",
                label: "Employee Code"
            },
            {  field:'dt_wef',
               label:'Date with effect of'
            },
           
            {
                field: "designation",
                label: "Designation"
            },
            {
                field: "bank",
                label: "Bank"
            },
            {
                field: "bank_acc_number",
                label: "Bank Account Number"
            },
            {
                field: "pan",
                label: "Pan"
            },
            {
                field: "ctc",
                label: "CTC"
            },
            {
                field: "basic_rate",
                label: "Basic Rate"
            },
            
            {
              field:  "hra_rate",
              label:'HRA Rate'
            }
            ,
            {
              field:  "conveyance_all",
              label:'Conveyance Allowance'
            },
            {
                field:'medical_all',
                label:'Medical Allowance'
            },
            {
                field:'epf_rate',
                label:'EPF Rate'
            }

        ]
       }
    }
  

    

    getData(service: ModelServiceService): Observable<any> {

        
       return service.salaryRateJson()
    }

    override getRouter(): Router {
        return this.route;
    }
    override getModelService(): ModelServiceService {
        return this.dataService;
    }
}

