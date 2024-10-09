import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventFilterComponent } from './event-filter.component';
import { EventFilterView } from './views/filter';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { Transformer } from 'src/app/blocks/transformer';
import { ArrayBuilder } from 'src/app/blocks/array.builder';
import { MetaTypeBuilder } from 'src/app/blocks/meta-type-builder';
import { Data } from 'src/app/services/models-interfaces/half-stack-interface';

@Component({
  selector: 'app-event-filter-presenter',
  standalone: true,
  imports: [EventFilterComponent],
  template: `<app-event-filter [datasource]="ds" (onClear)="onfilter()"  (allClear)="clearItem()" ><app-event-filter>`,
  styleUrl: './event-filter.component.scss'
})
export class EventFilterPresenter implements OnInit {
  ds!: EventFilterView
  @Output() filter = new EventEmitter<Data.DropdownFilter>();

  constructor(private modelService: ModelService) {
    this.ds = new EventFilterView();
  }

  ngOnInit(): void {
    Transformer.ComposeObjectAsync(this.modelService.MetaTypeByKey('SPORT'), this.ds.sports, MetaTypeBuilder)
    Transformer.ComposeObjectAsync(this.modelService.MetaTypeByKey('LEVEL'), this.ds.levels, MetaTypeBuilder)
    Transformer.ComposeObjectAsync(this.modelService.MetaTypeByKey('PROGRAM'), this.ds.programs, MetaTypeBuilder)
    Transformer.ComposeObject(this.modelService.EventYear(), this.ds.years, ArrayBuilder);
    this.ds.programs.onItemSelected((handler: any) => this.onfilter());
    this.ds.levels.onItemSelected((handler: any) => this.onfilter());
    this.ds.sports.onItemSelected((handler: any) => this.onfilter());
    this.ds.years.onItemSelected((handler: any) => this.onfilter());
  }
  onfilter() {
    console.log(this.ds.levels.SelectedItem)
    this.filter.emit({
      level: this.ds.levels.SelectedItem,
      program: this.ds.programs.SelectedItem,
      sport: this.ds.sports.SelectedItem,
      year: this.ds.years.SelectedItem
        ? parseInt(this.ds.years.SelectedItem)
        : null,
    });
  }

  clearItem() {
    this.ds.levels.SelectedItem = null as any as string;
    this.ds.programs.SelectedItem = null as any as string;
    this.ds.sports.SelectedItem = null as any as string;
    this.ds.years.SelectedItem = null as any as string;
    this.filter.emit({
      level: null,
      program: null,
      sport: null,
      year: null,
    });

  }
}
