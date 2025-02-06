import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AppOngoningComponent } from './app-ongoning/app-ongoning.component';
import { AppUpcomingComponent } from './app-upcoming/app-upcoming.component';
import { AppPastComponent } from './app-past/app-past.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, AppOngoningComponent, AppUpcomingComponent, AppPastComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {

}
