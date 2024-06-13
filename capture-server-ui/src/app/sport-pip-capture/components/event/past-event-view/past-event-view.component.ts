import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { EventUploadAuthenticationPresenter } from './event-upload-authentication/event-upload-authentication.presenter';

@Component({
  selector: 'app-past-event-view',
  templateUrl: './past-event-view.component.html',
  styleUrls: ['./past-event-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PastEventViewComponent implements OnInit {
  @Input() datasource: any;
  StreamName: string | null = null;
  url: string;
  // = `${environment.spHLSUrl}/sophiawilson_sonycam-corder_310/llhls.m3u8`;
  constructor(private ngbModle: NgbModal) {
  }

  ngOnInit(): void {
    console.log(this.datasource)
    setTimeout(() => {
      this.datasource?.connectionDetailsView?.forEach(item => {
        if (item && item._direction === 1) {
          this.StreamName = item._sreamName;
          console.log('Stream Name Saved:', item, this.StreamName);

          this.url = `${environment.spHLSUrl}/${this.StreamName}/llhls.m3u8`
          console.log(this.url);
        }
      });
    }, 90)

  }

  openAuthModel() {
    this.ngbModle.open(EventUploadAuthenticationPresenter, {
      centered: true

    })
  }


}
