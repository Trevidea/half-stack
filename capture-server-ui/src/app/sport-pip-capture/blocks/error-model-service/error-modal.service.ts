import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  constructor(private modalService: NgbModal) { }

  openErrorModal(message: string) {
    const modalRef = this.modalService.open(ErrorModalComponent, { centered: true,
        size:'sm'
     });
    modalRef.componentInstance.message = message;
  }

}
