import { Component } from '@angular/core';
import { DashboardComponent } from "./dashboard.component";

@Component({
  selector: 'app-dashboard-presenter',
  standalone: true,
  imports: [DashboardComponent],
  template: '<app-dashboard></app-dashboard>',
  styleUrl: './dashboard.component.scss'
})
export class DashboardPresenter {

}
