import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PreviousEventsConnectionComponent } from "./previous-events-connection.component";
import { RangePreviousConnection } from './view/previous-connection';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { Transformer } from 'src/app/blocks/transformer';
import { PreviousConnectionBuilder } from './builder/previous-connection';

@Component({
  selector: 'app-previous-events-connection-presenter',
  standalone: true,
  imports: [PreviousEventsConnectionComponent],
  template: `<app-previous-events-connection [datasource]='ds' (start)="startEvent.emit(true)"></app-previous-events-connection>`,
  styleUrl: './previous-events-connection.component.scss'
})
export class PreviousEventsConnectionPresenter implements OnInit {
 
  ds !: RangePreviousConnection;
  @Output() startEvent = new EventEmitter<boolean>();

  constructor(private modelService: ModelService){
    this.ds = new RangePreviousConnection();
  }
  ngOnInit(): void {
    // Transformer.ComposeCollectionAsync(this.modelService.PreviousConnection(), this.ds.PreviousConnections, PreviousConnectionBuilder)
    console.log(this.ds)
  }
 
}
