import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: 'app-past-event-view',
  templateUrl: './past-event-view.component.html',
  styleUrls: ['./past-event-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PastEventViewComponent implements OnInit {
 @Input() datasource:any;

  url = `${environment.spHLSUrl}/sophiawilson_sonycam-corder_316/llhls.m3u8`;

  
  constructor() { }

  ngOnInit(): void {
  }

  





}
