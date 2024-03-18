import { Component, OnInit } from "@angular/core";
import { headerView } from "./views/header";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { MetaTypeBuilder } from "app/sport-pip-capture/blocks/meta-type.builder";

@Component({
    selector: 'app-header-presenter',
    template: `<app-event-header [datasource]="ds"><app-event-header>`,
    styleUrls: ['./event-header.component.scss'],
})

export class EventHeaderPresenter implements OnInit {
    ds!: headerView

    constructor(private dataFactory: DataFactoryService,) {
        this.ds = new headerView();
    }

    ngOnInit(): void {
        Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeByKey("SPORTS"), this.ds.sports, MetaTypeBuilder);
        Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeByKey("PROGRAM"), this.ds.programs, MetaTypeBuilder);
        Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeByKey("LEVELS"), this.ds.levels, MetaTypeBuilder);
        Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeByKey("YEARS"), this.ds.years, MetaTypeBuilder);
    }

}