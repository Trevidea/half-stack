import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-on-demand-event',
  templateUrl: './create-on-demand-event.component.html',
  styleUrls: ['./create-on-demand-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOnDemandEventComponent implements OnInit {
  @Input() datasource: any
  public selectBasic: any[] = [];
  public selectBasicLoading = false;

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

}
