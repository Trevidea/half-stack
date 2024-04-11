import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';

@Component({
  selector: 'app-events-sync',
  templateUrl: './events-sync.component.html',
  styleUrls: ['./events-sync.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsSyncComponent implements OnInit {
  uploadicon: string = 'assets/images/spip-icons/upload.svg'
  backgroundColor: string;
  outerStrokeColor:string;
  syncMessage:string;
  subSyncMessage:string;
  failed:boolean=false
  constructor(private service: ModelServiceService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.SyncEvents()
  }


  SyncEvents() {
    this.outerStrokeColor='#216093'
    this.backgroundColor = 'var(--syncbackground)'
    this.syncMessage='Syncing Events'
    console.log('clicked syncEvents');
    this.service.syncEvents().subscribe(
      (response) => {
        this.uploadicon='assets/images/spip-icons/check.svg'
        console.log('Response from syncEvents:', response);
      },
      (error) => {
        console.error('Error occurred while syncing events:', error);
        this.failed=true
        this.uploadicon='assets/images/spip-icons/x.svg'
        this.backgroundColor = 'rgba(222, 46, 33, 0.10)'
        this.outerStrokeColor='transparent'
        this.syncMessage='Sync Failed'
        this.subSyncMessage='Try again  to sync event'
      }
    );
  }
}
