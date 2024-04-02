import { Component, Input, OnInit } from '@angular/core';
import { UI } from '../event-ui-interface';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {
  @Input() dropdownItems: UI.DropDownMenuItem[] = [];
  // horizontalPositon 
  constructor() { }

  ngOnInit(): void {
  }

}
