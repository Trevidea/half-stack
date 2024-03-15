import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { Transformer } from "src/app/blocks/transformer";
import { MetaTypeBuilder } from "src/app/model-service/meta-type-builder";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Views } from "../../../model-service/payroll-interface";
import { EmployeeBuilder } from "./builders/employee";
// import { EmployeePayrollBuilder } from "./builders/employee-payroll";
import { EmployeeView } from "./views/employee";

@Component({
    selector: 'app-employees-presenter',
    template: `<app-employees [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-employees>`,
    styleUrls: ['./employees.component.scss'],
    encapsulation: ViewEncapsulation.None
  })

  export class EmployeesPresenter implements OnInit {

    ds!: EmployeeView
    actions!: Views.FormActions
    constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) { 
    this.ds = new EmployeeView();
    this.ds.id = route.snapshot.params['id'];
    
    // Special scenario - to be embedded in framework
    if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
    ////////////////////////////////////////////////

    this.actions = new PresenterActions("employees", this.ds, dataFactory.SaveEmployee, EmployeeBuilder, router);
    Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeJsonByKey("DEPARTMENT"), this.ds.department, MetaTypeBuilder);
    Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeJsonByKey("DESIGNATION"), this.ds.designation, MetaTypeBuilder);
    Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeJsonByKey("HOLIDAY"), this.ds.holidays, MetaTypeBuilder);
    }
    ngOnInit(): void {

      if(this.ds.id){
        console.log(this.ds)
        Transformer.ComposeObjectAsync(this.dataFactory.EmployeeJson(this.ds.id), this.ds, EmployeeBuilder);
      }
    }
    
  }
