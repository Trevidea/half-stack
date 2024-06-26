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

  selectMulti = [
    { id: 1, name: 'Person 1', email: 'person1@example.com', selected: false },
    { id: 2, name: 'Person 2', email: 'person2@example.com', selected: false },
  ];


  constructor(public activeModal: NgbActiveModal) {
  }


  ngOnInit(): void {
  }

  onCheckboxChange(item) {
    item.selected = !item.selected;
    if (item.selected) {
      if (!this.datasource.emails.find(emailItem => emailItem.id === item.id)) {
        this.datasource.emails.push(item);
      }
    } else {
      this.removeTag(item.id)
    }
  }

  onRowClick(item) {
    this.onCheckboxChange(item);
  }
  removeTag(itemId) {
    this.datasource.emails = this.datasource.emails.filter(item => item.id !== itemId);
    const item = this.selectMulti.find(item => item.id === itemId);
    if (item) {
      item.selected = false;
    }
  }

  dismiss(): void {
    this.modalRef.dismiss(null);
  }



}
