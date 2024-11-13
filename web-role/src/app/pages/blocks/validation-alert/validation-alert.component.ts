import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-validation-alert',
  standalone: true,
  templateUrl: './validation-alert.component.html',
  styleUrls: ['./validation-alert.component.scss'],
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule,]
 })
export class ValidationAlertComponent implements OnInit {
  @Input() control:any
  @Input() controlName: string = "Control"
  @Input() patternmassage:any
  
  constructor() { }

  ngOnInit(): void {
  }

}
