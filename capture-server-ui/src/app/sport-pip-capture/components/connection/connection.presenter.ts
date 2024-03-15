import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Transformer } from 'app/blocks/transformer';
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { PreviousConnectionBuilder } from './previous-events-connection/builders/previous-connection';
import { ConnectionObjecView } from './previous-events-connection/views/previous-connection';

@Component({
  selector: 'app-connection-presenter',
  template:`<app-connection [datasource]="ds"></app-connection>`,
  styleUrls: ['./connection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectionPresenter implements OnInit {
   ds!: ConnectionObjecView
   constructor(private router: Router, private dataFactory: DataFactoryService) {
     this.ds = new ConnectionObjecView()
   }
 
   ngOnInit(): void {
  Transformer.ComposeCollectionAsync(this.dataFactory.PreviousConnection(),this.ds.Connection,PreviousConnectionBuilder)
   }
  
}
