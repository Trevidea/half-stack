import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions2 } from '../../interface';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {
  @ViewChild('apexDonutChartRef') apexDonutChartRef: any;
  public apexDonutChart: Partial<ChartOptions2>;
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
    this.apexDonutChart = {
      series: [85, 16],
      chart: {
        height: 350,
        type: 'donut'
      },
      colors: [
        this.chartColors.donut.series1,
        this.chartColors.donut.series2,

      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: '2rem',
                fontFamily: 'Montserrat'
              },
              value: {
                fontSize: '1rem',
                fontFamily: 'Montserrat',
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              total: {
                show: true,
                fontSize: '1.5rem',
                label: 'Total',
                formatter: function (w) {
                  let sumOfNumbers = 0;

                  for (let index = 0; index < w.globals.series.length; index++) {
                    sumOfNumbers += w.globals.series[index];
                  }

                  return sumOfNumbers.toString();
                }
              }
            }
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      labels: ['McQuaid vs Fairfort', 'Riverhawks vs Huskers'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
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
          // this.apexLineChart.chart.width = this.apexLineChartRef?.nativeElement.offsetWidth;

          this.apexDonutChart.chart.width = this.apexDonutChartRef?.nativeElement.offsetWidth;
        }, 900);
      }
    });
  }
}
