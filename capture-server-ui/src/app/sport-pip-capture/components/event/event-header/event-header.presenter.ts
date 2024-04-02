import { AfterViewInit, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { headerView } from "./views/header";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { MetaTypeBuilder } from "app/sport-pip-capture/blocks/meta-type.builder";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { TabStateService } from "../event-utility/nav";

@Component({
    selector: 'app-header-presenter',
    template: `<app-event-header [datasource]="ds" (onClear)="onfilter()"  (allClear)="clearAll()" ><app-event-header>`,
    styleUrls: ['./event-header.component.scss'],
})

export class EventHeaderPresenter implements OnInit, AfterViewInit {
    ds!: headerView
    @Output() filter = new EventEmitter<Data.FilterParams>();

    constructor(private dataFactory: DataFactoryService, private tabStateService: TabStateService) {
        this.ds = new headerView();
    }
    ngAfterViewInit(): void {
        // this.onfilter()
    }
    onfilter() {
        const level = this.ds.levels.SelectedItem ? this.ds.levels.SelectedItem : null;
        const program = this.ds.programs.SelectedItem ? this.ds.programs.SelectedItem : null;
        const sport = this.ds.sports.SelectedItem ? this.ds.sports.SelectedItem : null;
        const year = this.ds.years.SelectedItem ? parseInt(this.ds.years.SelectedItem) : null;
        this.filter.emit({
            level: level,
            program: program,
            sport: sport,
            year: year,
        });
    }

    ngOnInit(): void {
        Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeByKey("SPORTS"), this.ds.sports, MetaTypeBuilder);
        Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeByKey("PROGRAM"), this.ds.programs, MetaTypeBuilder);
        Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeByKey("LEVELS"), this.ds.levels, MetaTypeBuilder);
        Transformer.ComposeObjectAsync(this.dataFactory.MetaTypeByKey("YEARS"), this.ds.years, MetaTypeBuilder);
        this.ds.programs.onItemSelected(handler => this.onfilter());
        this.ds.levels.onItemSelected(handler => this.onfilter());
        this.ds.sports.onItemSelected(handler => this.onfilter());
        this.ds.years.onItemSelected(handler => this.onfilter());
    }

    clearAll() {
        this.ds.levels.SelectedItem = null;
        this.ds.programs.SelectedItem = null;
        this.ds.sports.SelectedItem = null;
        this.ds.years.SelectedItem = null;
        this.filter.emit({
            level: null,
            program: null,
            sport: null,
            year: null,
        });
    }


}