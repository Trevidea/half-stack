import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-event-upload-authentication',
  templateUrl: './event-upload-authentication.component.html',
  styleUrls: ['./event-upload-authentication.component.scss']
})
export class EventUploadAuthenticationComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();


  public basicPwdShow = false;
  public mergedPwdShow = false;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.datasource.serverIdentity = this.generateShortUUID(12)
  }

  private generateShortUUID = (length: number) => {
    return uuidv4().replace(/-/g, '').substring(0, length);
  };

}
