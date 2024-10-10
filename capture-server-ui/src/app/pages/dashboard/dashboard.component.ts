import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { PieChartComponent } from './chart-component/pie-chart/pie-chart.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { LineChartComponent } from "./chart-component/line-chart/line-chart.component";
import { BarChartComponent } from "./chart-component/bar-chart/bar-chart.component";
import { EventCardComponent } from './event-card/event-card.component';
import { MatTableDataSource } from '@angular/material/table';

export interface ConnectionData{
  id: number;
  event: string;
  role: string;
  userName: string;
  icon: string;
  deviceId: string;
  transmitStatus: string;
  deviceType: string;
  network: string;
}

const ELEMENT_DATA: ConnectionData[] = [
  {
    id: 1,
    event: 'McQuaid vs Fairfort',
    userName: 'Coach Smith',
    role: 'Subscriber',
    deviceId: 'iPad15',
    icon: 'arrow-down-left',
    transmitStatus: 'Receiving',
    deviceType: 'iPad',
    network: 'Penfield-5.0G'
  },
  {
    id: 1,
    event: 'McQuaid vs Fairfort',
    userName: 'Coach Jones',
    role: 'Subscriber',
    deviceId: 'iPad22',
    icon: 'arrow-down-left',
    transmitStatus: 'Receiving',
    deviceType: 'iPad',
    network: 'Penfield-5.0G'
  },
  {
    id: 1,
    event: 'McQuaid vs Fairfort',
    userName: 'Coach Mills',
    role: 'Subscriber',
    deviceId: 'iPad15',
    icon: 'arrow-up-right',
    transmitStatus: 'Streaming',
    deviceType: 'iPad',
    network: 'Penfield-5.0G'
  },
  {
    id: 1,
    event: 'Riverhawks vs Huskers',
    userName: 'Harry',
    role: 'Subscriber',
    deviceId: 'iPad03',
    icon: 'arrow-down-left',
    transmitStatus: 'Receiving',
    deviceType: 'iPad',
    network: 'Penfield-5.0G'
  },
  {
    id: 1,
    event: 'Riverhawks vs Huskers',
    userName: 'Coach Mills',
    role: 'Subscriber',
    deviceId: 'cc18',
    icon: 'arrow-down-left',
    transmitStatus: 'Receiving',
    deviceType: 'Camcorder',
    network: 'Penfield-5.0G'
  },
  {
    id: 1,
    event: 'McQuaid vs Fairfort',
    userName: 'Coach Smith',
    role: 'Subscriber',
    deviceId: 'iPad03',
    icon: 'arrow-down-left',
    transmitStatus: 'Receiving',
    deviceType: 'iPad',
    network: 'Penfield-5.0G'
  },
]

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, TablerIconsModule, MatChipsModule, PieChartComponent, MatPaginatorModule, MatMenuModule, LineChartComponent, BarChartComponent, EventCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  startIndex: number = 0;
  pageSize: number = 5;
  endIndex: number = this.pageSize;

  datasource = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator;

   

 
}
