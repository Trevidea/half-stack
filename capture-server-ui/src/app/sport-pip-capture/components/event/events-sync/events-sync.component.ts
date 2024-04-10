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
  constructor( private service: ModelServiceService,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
   this.SyncEvents()
  }


  SyncEvents() {
    this.backgroundColor='var(--syncbackground)'
    console.log('clicked syncEvents');
    this.service.syncEvents().subscribe(
      (response) => {
        console.log('Response from syncEvents:', response);
      },
      (error) => {
        // this.backgroundColor='rgba(222, 46, 33, 0.10)'   
        console.error('Error occurred while syncing events:', error);
      }
    );
  }
}
