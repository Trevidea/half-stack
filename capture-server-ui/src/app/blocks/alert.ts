// import {  componentType } from '@angular/core';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

class AlertAction {
  constructor(private modalService: NgbModal) {}
  openModal<T>(component: com<T>, data: any): NgbModalRef {
    const modalRef = this.modalService.open(component, { centered: true });
    modalRef.componentInstance.data = data; // Pass data to modal component
    return modalRef;
  }
}
