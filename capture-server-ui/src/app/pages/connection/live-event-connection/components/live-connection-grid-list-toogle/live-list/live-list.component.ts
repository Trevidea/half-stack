import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-live-list',
  standalone: true,
  imports: [TablerIconsModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './live-list.component.html',
  styleUrl: './live-list.component.scss'
})
export class LiveListComponent {

}
