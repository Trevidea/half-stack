import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Transformer } from "src/app/blocks/transformer";
import { EmployeeModel } from "src/app/model-service/employee-model";
import { MetaTypeBuilder } from "src/app/model-service/meta-type-builder";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Views } from "src/app/model-service/payroll-interface";
import { SalarytRateBuilder } from "./builder/salary-rate";
import { SalarytRateViews } from "./views/salary-rate";
import { id } from "@swimlane/ngx-datatable";
import { EmployeeBuilder } from "./builder/employee";

@Component({
  selector: 'app-salary-rate-presenter',
  template: `<app-salary-rate [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-salary-rate>`,
  styleUrls: ['./salary-rate.component.scss']
})

export class SalaryRatePresenter implements OnInit {
 ds!: SalarytRateViews
  actions!: Views.FormActions
  constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {

    this.ds = new SalarytRateViews();
    this.ds.id = route.snapshot.params['id'];

    // Special scenario - to be embedded in framework
    if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
    ////////////////////////////////////////////////
    this.actions = new PresenterActions("salary-rates", this.ds, dataFactory.SaveSalaryRate, SalarytRateBuilder, router);
    Transformer.ComposeCollectionViewAsync(this.dataFactory.EmployeesJson(), this.ds.employees,
      (employeeItem: EmployeeModel) => {
        return new SelectItemView(employeeItem.id, `${employeeItem.code} (${employeeItem.first_name} ${employeeItem.last_name})`);
      })

      this.ds.employees.onItemSelected((e:{selectedItem: SelectItemView })=>{
        Transformer.ComposeObjectAsync(this.dataFactory.EmployeeJson(e.selectedItem.key), this.ds, EmployeeBuilder);
      })
    Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeJsonByKey("BANK"), this.ds.bank, MetaTypeBuilder);
    Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeJsonByKey("DESIGNATION"), this.ds.designation, MetaTypeBuilder);
  }


  ngOnInit(): void {
    if(this.ds.id) {
      Transformer.ComposeObjectAsync(this.dataFactory.SalaryRateJson(this.ds.id), this.ds, SalarytRateBuilder)
    }

  }
  
}