import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { Transformer } from "src/app/blocks/transformer";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Views } from "src/app/model-service/payroll-interface";
import { ConfigurationBuilder } from "../configuration/builders/configuration";
import { SalaryBuilder } from "./builders/salary";
import { SalaryView } from "./views/salary";

@Component({
    selector: 'app-salary-slip-presenter',
    template: `<app-salary-slip [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-salary-slip>`,
    styleUrls: ['./salary-slip.component.scss']
  })

  export class SalarySlipPresenter implements OnInit {
    ds!: SalaryView
    actions!: Views.FormActions
    constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {

        this.ds = new SalaryView();
        this.ds.id = route.snapshot.params['id'];

        // Special scenario - to be embedded in framework
        if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
        ////////////////////////////////////////////////
        this.actions = new PresenterActions("salary-slip", this.ds, dataFactory.SaveSalarySlip, SalaryBuilder, router);

    }
    ngOnInit(): void {
        if (this.ds.id) {
            Transformer.ComposeObjectAsync(this.dataFactory.SalarySlipJson(this.ds.id), this.ds, SalaryBuilder);
        }
    }
  }