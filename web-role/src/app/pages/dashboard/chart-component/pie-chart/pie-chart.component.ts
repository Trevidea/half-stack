import { Component, ViewChild } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { TablerIconsModule } from 'angular-tabler-icons';
import {  ApexChart,
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
  ApexFill, NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';

export interface PieChart{
  
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
  selector: 'app-pie-chart',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule, FeatherModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public PieChart!: Partial<PieChart> | any;

  constructor(){
    this.PieChart = {
      series: [20, 45],
      chart: {
        toolbar: {
          show: false,
        },
        foreColor: '#adb0bb',
        fontFamily: "'DM Sans',sans-serif",
        type: 'donut',
        height: 280,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
      labels: ['McQuaid vs Fairfort', 'Riverhawks vs Huskers'],
      colors: ['#1e4db7', '#1a97f5'],
      stroke: {
        colors: ['transparent'],
      },
      plotOptions: {
        pie: {
          donut: {
            size: '78%',
            background: 'transparent',
            labels: {
              show: false,
              name: {
                show: true,
                fontSize: '18px',
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
              total: {
                show: false,
                label: 'Our Visitors',
                color: '#98aab4',
              },
            },
          },
        },
      },
    };
  }
}
