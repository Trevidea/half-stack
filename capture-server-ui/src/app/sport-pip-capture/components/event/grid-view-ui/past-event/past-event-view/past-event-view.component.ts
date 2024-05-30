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
  @Input() datasource: any;
  StreamName: string | null = null;

  url: string = `${environment.spHLSUrl}/sophiawilson_sonycam-corder_316/llhls.m3u8`;


  constructor() {
  }

  ngOnInit(): void {

    // setTimeout(() => {
    //   this.datasource?.connectionDetailsView?.forEach(item => {
    //     if (item && item._direction === 1) {
    //       this.StreamName = item._sreamName;
    //       console.log('Stream Name Saved:', item, this.StreamName);

    //       this.url = `${environment.spHLSUrl}/${this.StreamName}/llhls.m3u8`
    //       console.log(this.url);
    //     }
    //   });
    // }, 1000)



  }








}
