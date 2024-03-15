// modal.service.ts

import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new Subject<any>();
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  openModal(component: any, data: any = {}): Observable<any> {
    this.modalRef = this.modalService.open(component, { centered: true });
    
    // Pass data to the modal component
    Object.assign(this.modalRef.componentInstance, data);

    this.modalSubject.next(true);

    this.modalRef.result.then(
      (result) => {
        this.modalSubject.next(result);
        this.modalSubject.complete();
      },
      () => {
        this.modalSubject.next(false);
        this.modalSubject.complete();
      }
    );

    return this.modalSubject.asObservable();
  }

  closeModal(result: any = null): void {
    this.modalRef.close(result);
  }
}
