import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { headerView } from "./views/header";
import { MetaTypeBuilder } from "app/sport-pip-capture/blocks/meta-type.builder";


@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHeaderComponent implements OnInit {
  @Input () datasource:any
  
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  constructor() {
   
   }

  ngOnInit(): void {
  }

}
