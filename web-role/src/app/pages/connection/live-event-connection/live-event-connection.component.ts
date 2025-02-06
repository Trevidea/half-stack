import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { LiveConnectionHeaderComponent } from "./components/live-connection-header/live-connection-header.component";
import { LiveConnectionGridListToogleComponent } from "./components/live-connection-grid-list-toogle/live-connection-grid-list-toogle.component";

@Component({
  selector: 'app-live-event-connection',
  standalone: true,
  imports: [MatCardModule, MatMenuModule,
    MatDividerModule,
    MatButtonModule, LiveConnectionHeaderComponent, LiveConnectionGridListToogleComponent],
  templateUrl: './live-event-connection.component.html',
  styleUrl: './live-event-connection.component.scss'
})
export class LiveEventConnectionComponent {
  @Input() datasource: any;
}
