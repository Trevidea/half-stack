import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../../interface';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() { 
    this.chartOptions = {

      series: [
        {
          name: "Mobile",
          data: [44, 55],
          color:'rgba(33, 96, 147, 1)'
        },
        {
          name: "Cameras",
          data: [13, 23],
          color:'rgba(245, 163, 10, 1)'
        },
        {
          name: "iPad",
          data: [11, 17],
          color:'rgba(143, 171, 7, 1)'
        },
      ],
      chart: {
        type: "bar",
        height: 400,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        animations: {
          enabled: false
     },
      },
      stroke:{
        curve: 'straight',
        // "smooth" | "straight" | "stepline" | ("smooth" | "straight" | "stepline")[];
    // lineCap: "round"
    // "butt" | "square" | "round";
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        area: {
          fillTo: "end"
          // "origin" | "end";
      },
        bar: {
          horizontal: true,
          barHeight: '20%',
          // borderRadius: 5
          // borderRadius: 5
          // rangeBarOverlap: true,

          // startingShape:"rounded",
          //  "flat" | "rounded";
          // endingShape:"rounded"
          //  "flat" | "rounded";

        }
      },
      theme:{
        mode: "dark"
        // "light" | "dark";
        // palette?: string;
        // monochrome?: {
        //     enabled?: boolean;
        //     color?: string;
        //     shadeTo?: "light" | "dark";
        //     shadeIntensity?: number;
        // }
      },
      xaxis: {
        type: "category",
        categories: [
          "McQuaid",
          "Riverhawks",

        ]
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'left'
      },
      fill: {
        opacity: 1
      }
    };
  }

  ngOnInit(): void {
  }

}
