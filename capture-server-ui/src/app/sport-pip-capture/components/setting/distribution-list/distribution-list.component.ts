import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  childData: string = 'Hello from child component!';
  @Output() sendDataToParentEvent = new EventEmitter<string>();
  private modalRef: NgbModalRef
  selectedPeople: any[];
  selectMulti = [
    { name: 'Kane', email: 'kane@gmail.com' },
    { name: 'John', email: 'John@gmail.com' },
    { name: 'joh', email: 'joh@gmail.com' },
  ];
  constructor(public activeModal: NgbActiveModal, private router: Router) {
    this.selectedPeople = [];
  }


  ngOnInit(): void {
  }
  removeItem(itemToRemove) {
    this.datasource.emails = this.datasource.emails.filter(item => item.email !== itemToRemove.email);

    console.log(this.datasource.emails)
  }

  removeALLItem() {
    this.datasource.emails = []
  }

  dismiss(): void {
    this.modalRef.dismiss(null);
  }
 
}
