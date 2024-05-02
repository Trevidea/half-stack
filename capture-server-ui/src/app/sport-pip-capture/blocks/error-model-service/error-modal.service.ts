import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {
  private isModalOpen = false;
  constructor(private modalService: NgbModal) { }

  // openErrorModal(message: string) {
  //   const modalRef = this.modalService.open(ErrorModalComponent, { centered: true,
  //       size:'sm'
  //    });
  //   modalRef.componentInstance.message = message;
  // }
  openErrorModal(message: string): NgbModalRef | null {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modalRef = this.modalService.open(ErrorModalComponent, {
        centered: true,
        size: 'sm'
      });
      modalRef.componentInstance.message = message;
      modalRef.result.then(
        () => {
          this.isModalOpen = false;
        },
        () => {
          this.isModalOpen = false;
        }
      );
      return modalRef;
    }
    return null;
  }
}

