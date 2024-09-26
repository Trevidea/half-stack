import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-past-event-view',
  templateUrl: './past-event-view.component.html',
  styleUrls: ['./past-event-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PastEventViewComponent implements OnInit {
  @Input() datasource!: any;
  @Output() onUpload = new EventEmitter();
  activeIndex: number = 0;
  streamName: string | null = null;
  url: string;
  minIoUrl: string;
  constructor(private ngbModel: NgbModal, private modelServiceService: ModelServiceService) {
  }

  ngOnInit(): void {
    console.log(this.datasource)
    setTimeout(() => {
      const defaultdevice = this.datasource?.connectionDetailsView[0]
      this.url = `${environment.spHLSUrl}/${defaultdevice.streamName}/llhls.m3u8`
      console.log(defaultdevice)
    }, 90)

  }

  setStreamName(streamName: string, index: number) {
    this.url = ''
    setTimeout(() => {
      this.streamName = streamName;
      this.activeIndex = index;
      this.url = `${environment.spHLSUrl}/${this.streamName}/llhls.m3u8`
      console.log(this.url)
    }, 30)

  }

  modalOpenVC(modalVC: any) {
    this.modelServiceService.uploadPastEvent(this.datasource.eventId).subscribe(
      (data) => {
        console.log(data);

      },
      (error) => {
        console.log(error);
      }
    )

    this.minIoUrl = `${environment.minioUrl}-${this.datasource.eventId}`
    this.ngbModel.open(modalVC, {
      centered: true
    });
  }

}
