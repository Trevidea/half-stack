import { Component, Input, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-live-gird',
  standalone: true,
  imports: [MatCardModule, MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
    TablerIconsModule],
  templateUrl: './live-gird.component.html',
  styleUrl: './live-gird.component.scss'
})
export class LiveGirdComponent implements OnInit {
  @Input() datasource='ds'
  
  ngOnInit(): void {
  }


}
