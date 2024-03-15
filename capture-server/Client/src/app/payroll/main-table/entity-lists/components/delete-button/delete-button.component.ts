import { Component, OnInit } from '@angular/core';
import { ActionComponent } from '../action-component';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit, ActionComponent {
  datasource:any;
  constructor() { }

  ngOnInit(): void {
  }

}
