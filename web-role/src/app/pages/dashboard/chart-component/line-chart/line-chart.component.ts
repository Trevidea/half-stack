import { Component, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';

export interface ThroughoutEvent {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
}
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public ThroughoutEvent!: Partial<ThroughoutEvent> | any;

  constructor() {
    this.ThroughoutEvent = {
      series: [
        {
          name: 'McQuaid vs Fairfort',
          data: [15, 20, 10, 15, 25, 14, 10, 5],
          color: '#1a97f5',
        },
        {
          name: 'Riverhawks vs Huskers',
          data: [10, 18, 15, 2, 8, 1, 5, 15],
          color: '#1e4db7',
        },
      ],

      xaxis: {
        categories: [
          '20',
          '40',
          '60',
          '80',
          '100',
          '120',
          '140',
          '160',
        ],
      },

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 290,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },

      legend: {
        show: false,
      },

      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
        theme: 'dark',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0,
          stops: [20, 180],
        },
      },

      markers: {
        size: 4,
        border: 1,
      },

      grid: {
        show: true,
        borderColor: 'rgba(0, 0, 0, .2)',
        color: '#777e89',
        strokeDashArray: 2,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: 'smooth',
        width: 3,
      },
    };
  }
}
