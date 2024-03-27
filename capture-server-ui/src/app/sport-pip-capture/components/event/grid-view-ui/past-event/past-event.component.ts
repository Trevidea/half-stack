import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-past-event',
  templateUrl: './past-event.component.html',
  styleUrls: ['./past-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PastEventComponent implements OnInit {
  @Input ()datasource:any
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  eventShareModalOpen(eventShareModal) {
    this.modalService.open(eventShareModal, {
      centered: true,
      size: 'lg'
    });
  }
 
}
