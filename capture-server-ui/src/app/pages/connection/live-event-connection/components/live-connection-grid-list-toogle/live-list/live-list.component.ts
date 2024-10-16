import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-live-list',
  standalone: true,
  imports: [TablerIconsModule, MatButtonModule, MatMenuModule, MatIconModule, CommonModule],
  templateUrl: './live-list.component.html',
  styleUrl: './live-list.component.scss'
})
export class LiveListComponent {
  @Input() datasource: any;

  constructor(private router: Router) { }

  detail(item: any) {
    if (item.direction === 1) {
      console.log("sreaming device")
      this.router.navigate(['connections/connection/streaming-device-details'], {
        queryParams: { devicedetail: JSON.stringify(item) }
      });
    }
  }

}
