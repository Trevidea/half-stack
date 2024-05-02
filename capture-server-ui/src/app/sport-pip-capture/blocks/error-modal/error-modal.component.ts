import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ErrorModalService } from '../error-model-service/error-modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  @Input() message: string;


  constructor(public activeModel: NgbActiveModal) { }

  ngOnInit(): void {
      }

}
