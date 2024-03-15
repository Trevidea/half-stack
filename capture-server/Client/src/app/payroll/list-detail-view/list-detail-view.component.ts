import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-list-detail-view',
  templateUrl: './list-detail-view.component.html',
  styleUrls: ['./list-detail-view.component.scss']
})
export class ListDetailViewComponent implements OnInit {
  @Input() data: any[];
  @Input() columns: any[];
  @Input() row: any[];
  @Output() objectEmitter = new EventEmitter();
  
  constructor(private router: Router, private modalService: NgbModal) {}
  ngOnInit(): void {
    console.log(this.row)
  }

  deleteRow() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Are you sure you want to delete this row?';
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        // Implement your delete logic here
        console.log('Deleting row:', this.row);
        this.objectEmitter.emit(this.row);
        // const index = this.row.indexOf(this.row);
        // if (index > -1) {
        //   this.row.splice(index, 1);
        //   console.log(this.row)
        // }
      }
    });
  }
    
}
