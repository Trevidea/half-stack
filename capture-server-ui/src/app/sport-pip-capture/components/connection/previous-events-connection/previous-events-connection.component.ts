import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PreviousEventsConnection } from './data'
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { error } from 'console';
@Component({
  selector: 'app-previous-events-connection',
  templateUrl: './previous-events-connection.component.html',
  styleUrls: ['./previous-events-connection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreviousEventsConnectionComponent implements OnInit {
  @Input() datasource: any
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  private tempData = [];
  public selected = [];
  public rows: any;
  constructor(private dataFactory: DataFactoryService) { }

  ngOnInit(): void {


    this.dataFactory.read('connection-with-past-details').subscribe((res: any) => {
      // console.log(res)
      this.rows = res
    }, error => {
      console.log(error)
    })
  }
}
