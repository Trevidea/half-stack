import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: 'app-past-event-view',
  templateUrl: './past-event-view.component.html',
  styleUrls: ['./past-event-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PastEventViewComponent implements OnInit {
  // url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";  /usr/share/ovenmediaengine/dumps/michaeljohnson_janicemob_262
  url = `${environment.spHLSUrl}/sophiawilson_sonycam-corder_316/llhls.m3u8`;
  // url = "assets/videos/2/output.m3u8";
  
  constructor() { }

  ngOnInit(): void {
  }

  





}
