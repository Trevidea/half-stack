import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from '../../interface';
import { colors } from '../colors';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @ViewChild('apexLineChartRef') apexLineChartRef: any;
  public apexLineChart: Partial<ChartOptions>;
  public isMenuToggled = false;
  chartColors = {
    column: {
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
    },
    success: {
      shade_100: '#7eefc7',
      shade_200: '#06774f'
    },
    donut: {
      series1: '#216093',
      series2: '#F5A30A',
      series3: '#826bf8',
      series4: '#2b9bf4',
      series5: '#FFA1A1'
    },
    area: {
      series3: '#a4f8cd',
      series2: '#60f2ca',
      series1: '#2bdac7'
    }
  };

  constructor(private _coreConfigService: CoreConfigService) { 
    this.apexLineChart = {

      series: [
        {
          name: 'McQuaid vs Fairfort',
          data: [12, 20, 14, 18, 9, 5, 10, 6, 2],


        },
        {
          name: 'Riverhawks vs Huskers',
          data: [17, 10, 8, 9, 19, 15, 18, 16, 12],


        }
      ],

      chart: {
        type: "area",
        height: 400,

        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      markers: {
        strokeWidth: 7,
        strokeOpacity: 1,
        strokeColors: [colors.solid.white],
        colors: [colors.solid.warning]
      },
  
      colors: [
        this.chartColors.donut.series1,
        this.chartColors.donut.series2,

      ],

      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        categories: [
          '20',
          '40',
          '60',
          '80',
          '120',
          '140',
          '160',
          '180',
          '200'
        ]
      },
      tooltip: {
        custom: function (data) {
          return (
            '<div class="px-1 py-50">' +
            '<span>' +
            data.series[data.seriesIndex][data.dataPointIndex] +
            '%</span>' +
            '</div>'
          );
        }
      }
    };
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // Subscribe to core config changes
    this._coreConfigService.getConfig().subscribe(config => {
      // If Menu Collapsed Changes
      if (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) {
        setTimeout(() => {
          // Get Dynamic Width for Charts
          this.isMenuToggled = true;
          this.apexLineChart.chart.width = this.apexLineChartRef?.nativeElement.offsetWidth;
        }, 900);
      }
    });
  }

}
