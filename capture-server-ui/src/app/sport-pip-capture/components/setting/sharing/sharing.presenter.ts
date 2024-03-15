import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SharingRangeView} from "./view/sharing";
import { Views } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { Router } from "@angular/router";
import { ShareBuilder } from "./builder/sharing";
import { Transformer } from "app/blocks/transformer";
import { DistributionListPresenter } from "../distribution-list/distribution-list.presenter";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: 'app-sharing-presenter',
  template: `<app-sharing [datasource]="ds"></app-sharing>`,
  styleUrls: ['./sharing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SharingPresenter implements OnInit {
  ds!: SharingRangeView;
  actions!: Views.FormActions;
  constructor(private dataFactory: DataFactoryService ,  private modalService: NgbModal) {
    this.ds = new SharingRangeView()
    }
  ngOnInit(): void {
     Transformer.ComposeCollectionAsync(this.dataFactory.DistributionsListJson(), this.ds.distribution , ShareBuilder);
    
  }
 

}
