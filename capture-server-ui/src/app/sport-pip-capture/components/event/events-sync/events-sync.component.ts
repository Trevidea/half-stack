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
  constructor( private service: ModelServiceService,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
   this.SyncEvents()
  }


  SyncEvents() {
    console.log('clicked syncEvents');
    this.service.syncEvents().subscribe(
      (response) => {
        console.log('Response from syncEvents:', response);
      },
      (error) => {
        console.error('Error occurred while syncing events:', error);
      }
    );
  }
}
