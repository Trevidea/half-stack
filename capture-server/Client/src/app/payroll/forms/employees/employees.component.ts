import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/blocks/ngb-date-converter';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class EmployeesComponent implements OnInit {
  public avatarImage: string;
  public currentRow;
  public tempRow;

  @Input()  datasource:any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private router: Router) { }



  ngOnInit(): void {
    this.avatarImage = '../../../../assets/avatar.png'
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }



  onCheckboxChange(event: any, value: any) {
    if (event.target.checked) {
      // Add the checkbox value to weeklyOff array if it's checked
      this.datasource.weeklyOff.push(value);
    } else {
      // Remove the checkbox value from weeklyOff array if it's unchecked
      const index = this.datasource.weeklyOff.indexOf(value);
      if (index !== -1) {
        this.datasource.weeklyOff.splice(index, 1);
      }
    }
  }



}
