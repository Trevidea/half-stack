import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-alert',
  templateUrl: './validation-alert.component.html',
  styleUrls: ['./validation-alert.component.scss']
})
export class ValidationAlertComponent implements OnInit {
  @Input() control:any
  @Input() controlName:string = "Control"
  constructor() { }

  ngOnInit(): void {
  }

}
