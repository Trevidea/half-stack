import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-attendance-download-modal',
  templateUrl: './attendance-download-modal.component.html',
  styleUrls: ['./attendance-download-modal.component.scss']
})
export class AttendanceDownloadModalComponent {
  message: string;

  constructor(public activeModal: NgbActiveModal) {}

  close(result: any): void {
    this.activeModal.close(result);
  }
}
