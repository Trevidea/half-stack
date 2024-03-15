// confirmation-modal.component.ts

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: "./confirmation-modal.component.html",
})
export class ConfirmationModalComponent {
  message: string;

  constructor(public activeModal: NgbActiveModal) {}

  close(result: any): void {
    this.activeModal.close(result);
  }
}
