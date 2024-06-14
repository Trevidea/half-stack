import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  styleUrls: ['./distribution-list.component.scss']
})
export class DistributionListComponent implements OnInit {
  @Input() datasource: any;
  @Input() editCardId: number;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() sendDataToParentEvent = new EventEmitter<string>();
  private modalRef: NgbModalRef
  emailInput: string = '';
  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.modalRef.dismiss(null);
  }

  addEmail() {
    if (this.emailInput.trim()) {
      this.datasource.emails.push(this.emailInput.trim());
      this.emailInput = '';
    }
  }

  removeTag(tag: string) {
    const index = this.datasource.emails.indexOf(tag);
    if (index >= 0) {
      this.datasource.emails.splice(index, 1);
    }
  }

  removeLastTag() {
    if (!this.emailInput && this.datasource.emails.length > 0) {
      this.datasource.emails.pop();
    }
  }

}
