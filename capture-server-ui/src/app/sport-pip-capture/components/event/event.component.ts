import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { setTimeout } from 'timers';
import { TabStateService } from './event-utility/nav';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { Data } from 'app/sport-pip-capture/models/capture-interface';
import { EventsSyncComponent } from './events-sync/events-sync.component';
import { EventEndNotifictionsComponent } from '../event-end-notifictions/event-end-notifictions.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class EventComponent implements OnInit {
  @Input() datasource: any
  @Output() filter = new EventEmitter<Data.FilterParams>();
  @Output() onTabChange = new EventEmitter()
  gridView: boolean = true
  activeTabId: string;
  constructor(private router: Router, private tabStateService: TabStateService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.activeTabId = this.tabStateService.getActiveTab();
    console.log(this.datasource)
  }

  CreateOnDemandEvent() {
    this.router.navigate(['on-demand-event'])
  }


  changeViewMode() {
    this.gridView = !this.gridView
  }

  onNavChange(event: any) {
    this.tabStateService.setActiveTab(event.nextId);
    this.onTabChange.emit();
  }

  onFilter(filter: Data.FilterParams) {
    this.filter.emit(filter)
  }


  // modal  Open 
  _modalOpenSM() {
    this.modalService.open(EventsSyncComponent, {
      centered: true,
      size: 'sm'
    });
  }

  modalOpenSM() {
    this.modalService.open(EventEndNotifictionsComponent, {
      centered: true,
      size: 'md'
    });
  }

}

