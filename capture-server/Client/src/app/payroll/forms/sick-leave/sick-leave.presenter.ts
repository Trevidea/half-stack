import { Component, OnInit } from '@angular/core';
import { Transformer } from 'src/app/blocks/transformer';
import { SickLeaveView } from './views/sick-leave-view';
import { Views } from 'src/app/model-service/payroll-interface';
import { ModelServiceService } from 'src/app/model-service/model-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PresenterActions } from 'src/app/blocks/actions';
import { SickLeaveBuilder } from './builders/sick-leave';
import { SelectItemView } from 'src/app/blocks/collection-item';
import { EmployeeModel } from 'src/app/model-service/employee-model';

@Component({
  selector: 'app-sick-leave-presenter',
  template: '<app-sick-leave [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-sick-leave>`',
  styleUrls: ['./sick-leave.component.scss']
})
export class SickLeavePresenter implements OnInit {
  ds!: SickLeaveView
  actions!: Views.FormActions
  constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {

    this.ds = new SickLeaveView();
    this.ds.id = route.snapshot.params['id'];

    // Special scenario - to be embedded in framework
    if ((this.ds.id as unknown) === 'null') {
      console.log(this.ds.id)
      this.ds.id = null
    }
    ////////////////////////////////////////////////
    this.actions = new PresenterActions("sick-leaves", this.ds, dataFactory.SaveSickLeave, SickLeaveBuilder, router);

  }
  ngOnInit(): void {
    Transformer.ComposeCollectionViewAsync(this.dataFactory.EmployeesJson(), this.ds.employeeCode,
      (employeeItem: EmployeeModel) => {
        return new SelectItemView(employeeItem.id, `${employeeItem.code} (${employeeItem.first_name} ${employeeItem.last_name})`);
      })

    if (this.ds.id) {
      Transformer.ComposeObjectAsync(this.dataFactory.SickLeaveJson(this.ds.id), this.ds, SickLeaveBuilder);
    }
  }
}
