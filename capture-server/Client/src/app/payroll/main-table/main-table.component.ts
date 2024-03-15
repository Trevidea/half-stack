import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { IField } from 'src/app/blocks/interface/common-interface';
import { ModelServiceService } from 'src/app/model-service/model-service.service';
import { ActionHostDirective } from '../action-host.directive';
import { ActionComponent } from './entity-lists/components/action-component';
import { ListAction, ListDataBase } from './entity-lists/list-data-base';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilterBase } from './filters/filter-base';
import { FilterComponent } from '../home/componenets/filter/filter.component';
import { attendanceList } from '../main-table/entity-lists/attendance-list';
import { ModalService } from '../components/modal.service';
@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainTableComponent implements OnInit {
  gridView: boolean = false;
  searchText: string;
  @Output() refreshEvent = new EventEmitter<void>();
  @ViewChild(ActionHostDirective, { static: true }) actionHost!: ActionHostDirective;
  @Input() actions: ListAction[] = [];
  @Input() entTitle: string;
  @Input() data: any[];
  @Input() config: any;
  @Input() listData: any;
  @Input() columns: any[];
  @Input() fields: IField[] = [];
  @Input() editUrl: string;
  _entity: string;
  designation: any[];

  @Input() set entity(e: string) {
    if (this._entity != e) {
      this._entity = e;
      this.loadActions();
    }
  }
  get entity(): string {
    return this._entity;
  }

  department: string[] = []

  @Output("rowChanged") rowChangedEvent = new EventEmitter<any>();
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  @ViewChild('deleteRowTpl', { static: true }) deleteRowTpl: TemplateRef<any>;
  @ViewChild(FilterComponent) filterComponent: FilterComponent;

  constructor(private modelService: ModelServiceService, private router: Router, public modalService:ModalService) {
    this.deleteSelected = this.deleteSelected.bind(this);
  }

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected = [];
  selectedRow: boolean
  public currentPageLimit: number = 10;

  _listData: ListDataBase = null;
  clearFilterInChild() {
    if (this.filterComponent) {
      this.filterComponent.onClearSelection();
    }
  }
  // TODO[Dmitry Teplov] wrap dynamic limit in a separate component.
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] find a better way.
        // TODO[Dmitry Teplov] test with server-side paging.
        this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
        // this.table.offset = 0;
      }
    });
  }

  private changePageLimit(limit: any): void {
    this.currentPageLimit = parseInt(limit, 10);
  }

  onActivate(event) {
    if (event.type == 'dblclick') {
      const data = event.row;
      console.log(event)
      this.router.navigate([this.editUrl, { id: data.id }]);
      console.log(this.editUrl)
    }
  }
  onSelect(e) {
    console.log('Select Event', e, this.selected);
    this.selectedRow = true
    // this.actionData['visible'] = true;
    this.rowChangedEvent.emit(this.selected);
  }

  ngOnInit(): void {
  }
  onRefresh(e: any) {
    this.refreshEvent.emit();
  }

  deleteSelected() {
    this.selected.forEach(row => {
      const result = this.modelService.delete(this.config.table, row.id);
      result.subscribe(response => {
        const index = this.data.indexOf(row);
        console.log(index)
        if (index !== -1) {
          this.selectedRow = false
          this.data.splice(index, 1);
          this.data = [...this.data]
          this.selected = [];
          // this.actionData['visible'] = false;
          this.rowChangedEvent.emit(null);
        }
      })
    })

  }
  onAction(e:any)
  {
    console.log(e)
    e.action();
  }
  loadActions() {
    this.selectedRow = false;
    this.selected = [];
    const viewContainerRef = this.actionHost.viewContainerRef;
    const tempRef = this.actionHost.templateRef;
    viewContainerRef.clear();
    this.actions.forEach(action => {
      const componentRef = viewContainerRef.createComponent<ActionComponent>(action.component);
      componentRef.instance.datasource = action.data;
    })
  }

  onSearchTextEntered(searchvalue: string) {
    this.searchText = searchvalue;
    console.log(this.searchText);

  }




  // ////////////////////////
  grid() {
    this.gridView = !this.gridView
  }






}
