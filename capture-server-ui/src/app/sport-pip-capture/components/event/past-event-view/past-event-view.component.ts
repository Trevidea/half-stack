import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-past-event-view',
  templateUrl: './past-event-view.component.html',
  styleUrls: ['./past-event-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PastEventViewComponent implements OnInit {
  @Input() datasource: any;

  activeIndex: number = 0;
  streamName: string | null = null;
  url: string;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.datasource)
    setTimeout(() => {
      this.datasource?.connectionDetailsView?.forEach(item => {
        if (item && item._direction === 1) {
          this.streamName = item._streamName;
          this.url = `${environment.spHLSUrl}/${this.streamName}/llhls.m3u8`
        }
      });
    }, 90)

  }

  setStreamName(streamName: string, index: number) {
    this.streamName = streamName;
    this.activeIndex = index;
    this.url = `${environment.spHLSUrl}/${this.streamName}/llhls.m3u8`
    console.log(this.url)
  }


}
