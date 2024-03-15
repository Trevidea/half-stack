import { Component, Input, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Views } from 'app/sport-pip-capture/models/sport-pip-capture-interface';


@Component({
  selector: 'inline-form-modal',
  templateUrl: './inline-modal.component.html',
  styleUrls: ['./inline-modal.component.scss'],

})
export class InlineModalComponent implements Views.ModalHost{
  @Input() modalTitle: string
  @ViewChild('modal') private modalContent: TemplateRef<InlineModalComponent>
  private modalRef: NgbModalRef

  public component: Type<Views.FormModal>;
  public properties: { [key: string]: any; } = {};


  constructor(private modalService: NgbModal) {
   }
  open(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.modalRef = this.modalService.open((this.modalContent),{
        centered: true,
        size: 'lg'
      })
      this.modalRef.result.then(resolve, reject)
      
    })
  }

  close(data: any): void {
    this.modalRef.close(data)
  }

  dismiss(): void {
    this.modalRef.dismiss(null);
  }

}

