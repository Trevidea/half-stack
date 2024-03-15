import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() message: string;
  @Output() result = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  confirm() {
    this.result.emit('confirm');
    this.close();
  }

  close() {
    this.result.emit('cancel');
  }
  
}
