import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { PieChartComponent } from './chart-component/pie-chart/pie-chart.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

export interface ConnectionData{
  id: number;
  action: string;
  event: string;
  role: string;
  userName: string;
  deviceId: number;
  transmitStatus: string;
  deviceType: string;
  network: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, TablerIconsModule, MatChipsModule, PieChartComponent,MatPaginatorModule,MatMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
