import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() Sidebar: EventEmitter<boolean> = new EventEmitter()
  constructor(
   ) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.Sidebar.emit()
  }

}
