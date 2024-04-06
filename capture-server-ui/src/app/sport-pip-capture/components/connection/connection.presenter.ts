import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transformer } from 'app/blocks/transformer';
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { PreviousConnectionBuilder } from './previous-events-connection/builders/previous-connection';
import { ConnectionObjecView } from './previous-events-connection/views/previous-connection';

@Component({
  selector: 'app-connection-presenter',
  template: `<app-connection [datasource]="ds" [_isEventStarted]='eventStarted'></app-connection>`,
  styleUrls: ['./connection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectionPresenter implements OnInit {
  ds!: ConnectionObjecView
  eventStarted:boolean
  constructor(private router: Router, private dataFactory: DataFactoryService, private route: ActivatedRoute) {
    this.ds = new ConnectionObjecView()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventStarted = params['eventStarted'];
      console.log('ID:', this.eventStarted);
    });
    Transformer.ComposeCollectionAsync(this.dataFactory.PreviousConnection(), this.ds.Connection, PreviousConnectionBuilder)
  }

}
