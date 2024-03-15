import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

import { Views } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { ModalActions, PresenterAction } from "app/blocks/actions";
import { DistributionListBuilder } from "./builder/distribution-list";
import { DistributionListView } from "./view/distribution-list";
import { Transformer } from "app/blocks/transformer";


@Component({
  selector: 'app-distribution-list-presenter',
  template: `<app-distribution-list [datasource]="ds"  (save)="actions.onSave()" (cancel)="actions.onCancel()"  [editCardId]="cardId"></app-distribution-list>`,
  styleUrls: ['./distribution-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DistributionListPresenter implements OnInit {
  ds!: DistributionListView;
  actions!: Views.FormActions;
  @Output() onUpdate = new EventEmitter<any>();
  @Input() cardId: number;
  constructor(private dataFactory: DataFactoryService, router: Router) {
    this.ds = new DistributionListView()
    console.log(this.ds)
    this.actions = new PresenterAction("settings/sharing", this.ds, dataFactory.SaveDistributionList, DistributionListBuilder, router)
    this.actions.onComplete.subscribe(result => {
      console.log(result)
      if (result) {
        this.onUpdate.emit("result");
      }
    })
  }

  ngOnInit(): void {
    console.log(this.cardId)
    if (this.cardId) {
      Transformer.ComposeObjectAsync(this.dataFactory.DistributionJson(this.cardId), this.ds, DistributionListBuilder);
    }
    console.log(this.ds)
  }
}
