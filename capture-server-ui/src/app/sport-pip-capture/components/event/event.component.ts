import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { setTimeout } from 'timers';
import { TabStateService } from './event-utility/nav';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.None,
 
})
export class EventComponent implements OnInit {
  @Input() datasource: any
  gridView: boolean = true
  activeTabId: string = 'ongoingEvent';
  constructor(private router: Router, private tabStateService: TabStateService) { }

  ngOnInit(): void {
    this.activeTabId = this.tabStateService.getActiveTab();
    console.log(this.tabStateService.getActiveTab())
  }

  CreateOnDemandEvent() {
    this.router.navigate(['on-demand-event'])
  }

  onNavChange(event: any) {
    this.tabStateService.setActiveTab(event.nextId);
  }

}
