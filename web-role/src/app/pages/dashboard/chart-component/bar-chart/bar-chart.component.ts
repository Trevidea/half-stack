import { Component, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  NgApexchartsModule,
  ApexGrid,
  ApexMarkers
} from "ng-apexcharts";
import { MaterialModule } from 'src/app/material.module';

export type ConnectDevice = {
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
  marker: ApexMarkers;
};
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule, TablerIconsModule, MaterialModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {

  @ViewChild("chart") chart: ChartComponent;
  public ConnectDevice: Partial<ConnectDevice>;

  
  constructor() {
    this.ConnectDevice = {
      series: [
        {
          name: 'Mobile',
          data: [7, 7],
          color: '#1a97f5',
        },
        {
          name: 'Camera',
          data: [2, 4],
          color: '#1e4db7',
        },
        {
          name: 'iPad',
          data: [11, 15],
          color: 'rgba(245, 163, 10, 1)',
        },
      ],

      chart: {
        type: 'bar',
        height: 285,
        stacked: true,
        toolbar: {
          show: false,
        },
        foreColor: '#adb0bb',
        fontFamily: 'DM sans',
        sparkline: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      marker: {
        size: 0,
      },
      fill: {
        type: 'solid',
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
          borderRadius: 9,
        },
      },
      grid: {
        show: true,
      },
       xaxis: {
        type: 'category',
        categories: ['McQuaid vs Fairfort', 'Riverhawks vs Huskers'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        },
        yaxis: {
        
            show: true,
          
        },
      // yaxis: {
      //   show: true,
      //   min: 100,
      //   max: 400,
      //   tickAmount: 3,
      // },
      stroke: {
        show: true,
        width: 2,
        curve: 'smooth',
      },
    };
  }
}
