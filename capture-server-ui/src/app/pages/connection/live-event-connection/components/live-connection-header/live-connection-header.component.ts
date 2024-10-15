import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-live-connection-header',
  standalone: true,
  imports: [MatCardModule, MatMenuModule,
    MatDividerModule,
    MatButtonModule, MatIconModule],
  templateUrl: './live-connection-header.component.html',
  styleUrl: './live-connection-header.component.scss'
})
export class LiveConnectionHeaderComponent {
 @Input() datasource: any;


}
