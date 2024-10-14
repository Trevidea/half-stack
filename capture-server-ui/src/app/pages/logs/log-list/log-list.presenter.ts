import { Component } from '@angular/core';
import { LogListComponent } from "./log-list.component";

@Component({
  selector: 'app-log-list-presenter',
  standalone: true,
  imports: [LogListComponent],
  template: `<app-log-list></app-log-list>`,
  styleUrl: './log-list.component.scss'
})
export class LogListPresenter {

}
