import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'app/blocks/ngb-date-converter';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-on-demand-event',
  templateUrl: './create-on-demand-event.component.html',
  styleUrls: ['./create-on-demand-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class CreateOnDemandEventComponent implements OnInit {
  @Input() datasource: any
  // public selectBasic: any[] = [];
  // public selectBasicLoading = false;
	model: NgbDateStruct;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.datasource.venue.location)
  }
  onCancelClick() {
    Swal.close();

  }


  onYesClick() {
    this.cancel.emit()
  }


  onSaveCancelClick() {
    console.log('clicked cancle')

  }
  onSaveYesClick() {
    console.log('clicked save')
    this.save.emit()
  }


  formatTime(time: string): number {
    if (!time) return 0;
    const [hours, minutes] = time.split(':');
    let formattedTime = hours + minutes;
    return parseInt(formattedTime);
  }

}
