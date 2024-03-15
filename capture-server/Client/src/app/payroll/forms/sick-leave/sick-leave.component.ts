import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomAdapter, CustomDateParserFormatter } from '../../home/componenets/ngb-date-converter';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sick-leave',
  templateUrl: './sick-leave.component.html',
  styleUrls: ['./sick-leave.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SickLeaveComponent {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  medicalDoc: any;

  uploadDoc(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.medicalDoc = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
