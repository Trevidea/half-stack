import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MetaTypeCollectionStrategyView } from "./views/meta-types";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Transformer } from "app/blocks/transformer";
import { MetaTypeBuilder } from "./builders/meta-types";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-meta-type-presenter",
  template: `<app-meta-type [datasource]="ds"></app-meta-type>`,
  styleUrls: ["./meta-type.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MetaTypePresenter implements OnInit {
  ds!: MetaTypeCollectionStrategyView;

  constructor(
    private dataFactory: DataFactoryService,
    router: Router,
    route: ActivatedRoute,
    public http: HttpClient
  ) {
    this.ds = new MetaTypeCollectionStrategyView();
  }
  metaTypes = [];
  ngOnInit(): void {
    this.dataFactory.MetaTypeJson().subscribe((data) => {
      console.log(data);
    });
    Transformer.ComposeCollectionAsync(
      this.dataFactory.MetaTypeJson(),
      this.ds.metatype,
      MetaTypeBuilder
    );
  }
}
