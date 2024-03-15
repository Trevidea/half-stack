import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { Transformer } from "src/app/blocks/transformer";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Views } from "src/app/model-service/payroll-interface";
import { PayrollBuilder } from "./builders/payroll";
import { PayrollView } from "./views/payroll";

@Component({
  selector: 'app-payroll-presenter',
  template: `<app-payroll [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-payroll>`,
  styleUrls: ['./payroll.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PayrollPresenter implements OnInit {
  ds!: PayrollView
  actions!: Views.FormActions
  currentDate = new Date();
  month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2); 
  year = this.currentDate.getFullYear();
  constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {

    this.ds = new PayrollView();
    this.ds.id = route.snapshot.params['id'];

    // Special scenario - to be embedded in framework
    if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
    ////////////////////////////////////////////////
    this.actions = new PresenterActions("payroll", this.ds, dataFactory.SavePayroll, PayrollBuilder, router);

  }

  ngOnInit(): void {
    if (this.ds.id) {
      Transformer.ComposeObjectAsync(this.dataFactory.PayrollJson(this.ds.id), this.ds, PayrollBuilder);
    } else {
      this.ds.month =parseInt(this.month);
      this.ds.year=this.year
      }

  }

}