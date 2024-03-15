import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/blocks/ngb-date-converter';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AttendanceComponent implements OnInit {
  
  onChange(inout: string, updatedValue : string) :void
  {
    this.datasource.onChangeOutime(updatedValue, inout == "in" ? true : false);
  }
  @Output() valueChange = new EventEmitter<boolean>();


  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onToggle(event: any) {
    this.valueChange.emit(event.target.checked);
  }
 
}
