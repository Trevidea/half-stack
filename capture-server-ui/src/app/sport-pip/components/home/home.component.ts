import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexResponsive,
  ApexStates
} from 'ng-apexcharts';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
export interface ChartOptions {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  fill?: ApexFill;
  labels?: string[];
  markers: ApexMarkers;
  theme: ApexTheme;
}
export interface ChartOptions2 {
  // Apex-non-axis-chart-series
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  colors?: string[];
  legend?: ApexLegend;
  labels?: any;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  markers?: ApexMarkers[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  states?: ApexStates;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private grid_line_color = 'rgba(200, 200, 200, 0.2)';
  private successColorShade = '#28dac6';
  private tooltipShadow = 'rgba(0, 0, 0, 0.25)';
  private labelColor = '#6e6b7b';
  private warningLightColor = '#FDAC34';
  @ViewChild('apexBarChartRef') apexBarChartRef: any;
  public apexBarChart: Partial<ChartOptions>;
  @ViewChild('apexBarChartRef') apexBarChartRef2: any;
  public apexBarChart2: Partial<ChartOptions>;
  public isMenuToggled = false;
  @ViewChild('apexDonutChartRef') apexDonutChartRef: any;
  public apexDonutChart: Partial<ChartOptions2>;
  public swiperPaginations: SwiperConfigInterface = {
    pagination: true
  };
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
      labels: ['Man', 'Woman'],
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
  // Bar Chart
  public barChart = {
    chartType: 'bar',
    datasets: [
      {
        data: [15, 30, 27, 22, 29, 25, 30],
        backgroundColor: '#F5A30A',
        // this.successColorShade,
        borderColor: 'transparent',
        hoverBackgroundColor: '#ffc107',
        // this.successColorShade,
        hoverBorderColor: '#ff9f43'
        // this.successColorShade
      },
      {
        data: [10, 15, 20, 18, 25, 20, 15],
        backgroundColor: '#216093',
        borderColor: 'transparent',
        hoverBackgroundColor: '#7367f0',
        hoverBorderColor: '#6610f2'
      }
    ],
    labels: ['Volleyball', 'Basketball', 'Hockey', 'Soccer', 'Rugby', 'Cricket', 'Badminton'],
    options: {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: 'bottom'
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: this.tooltipShadow,
        backgroundColor: colors.solid.white,
        titleFontColor: colors.solid.black,
        bodyFontColor: colors.solid.black
      },
      scales: {
        xAxes: [
          {
            barThickness: 15,
            display: true,
            gridLines: {
              display: true,
              color: this.grid_line_color,
              zeroLineColor: this.grid_line_color
            },
            scaleLabel: {
              display: true
            },
            ticks: {
              fontColor: this.labelColor
            }
          }
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              color: this.grid_line_color,
              zeroLineColor: this.grid_line_color
            },
            ticks: {
              stepSize: 10,
              min: 0,
              max: 40,
              fontColor: this.labelColor
            }
          }
        ]
      }
    },
    legend: false
  };

  // Horizontal Bar Chart
  public horiBarChart = {
    chartType: 'horizontalBar',

    options: {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: 'right'
        }
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: this.tooltipShadow,
        backgroundColor: colors.solid.white,
        titleFontColor: colors.solid.black,
        bodyFontColor: colors.solid.black
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              zeroLineColor: this.grid_line_color,
              borderColor: 'transparent',
              color: this.grid_line_color,
              drawTicks: false
            },
            scaleLabel: {
              display: true
            },
            ticks: {
              min: 0
            }
          }
        ],
        yAxes: [
          {
            display: true,
            barThickness: 15,
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    },

    labels: ['Man', 'Woman'],
    datasets: [
      {
        data: [710, 350],
        backgroundColor: colors.solid.info,
        borderColor: 'transparent',
        hoverBackgroundColor: colors.solid.info,
        hoverBorderColor: colors.solid.info,
        borderWidth: 42,
        radius: 12,
        pointRadius: 12,
        hoverBorderWidth: 12
      },
      {
        data: [230, 460],
        backgroundColor: colors.solid.info,
        borderColor: 'transparent',
        hoverBackgroundColor: colors.solid.info,
        hoverBorderColor: colors.solid.info,
        borderWidth: 42,
        radius: 12,
        pointRadius: 12,
        hoverBorderWidth: 12
      }
    ],

    legend: false
  };
  // doughnut Chart
  public doughnutChart = {
    chartType: 'doughnut',
    options: {
      responsive: false,
      responsiveAnimationDuration: 500,
      cutoutPercentage: 60,
      aspectRatio: 1.4,
      legend: { display: false },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[0].labels[tooltipItem.index] || '',
              value = data.datasets[0].data[tooltipItem.index];
            var output = ' ' + label + ' : ' + value + ' %';
            return output;
          }
        },
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: this.tooltipShadow,
        backgroundColor: colors.solid.white,
        titleFontColor: colors.solid.black,
        bodyFontColor: colors.solid.black
      }
    },

    datasets: [
      {
        labels: ['Women', 'Man'],
        data: [10, 80],
        backgroundColor: [this.successColorShade, this.warningLightColor, colors.solid.primary],
        borderWidth: 0,
        pointStyle: 'rectRounded'
      }
    ]
  };
  ngOnInit(): void {

    this.apexBarChart = {
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      series: [
        {
          name: 'Man',
          data: [15, 30, 27, 22, 29, 25, 30]
        },

        {
          name: 'Woman',
          data: [10, 15, 20, 18, 25, 20, 15]
        }
      ],
      chart: {
        height: 400,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '20%',
          endingShape: 'rounded'
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      // colors: [colors.solid.info],
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['Volleyball', 'Basketball', 'Hockey', 'Soccer', 'Rugby', 'Cricket', 'Badminton']
      }
    };
    this.apexBarChart2 = {
      series: [
        {
          name:'Won',
          data: [15, 30]
        },

        {
          name:'Lost',
          data: [10, 15]
        }
      ],
      chart: {
        height: 400,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '70%',
          barHeight: '30px',
          endingShape: 'rounded'
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      // colors: [colors.solid.info],
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['Man', 'Women']
      }
    };
    this.apexBarChart2.colors = ['#F5A30A', '#216093'];
    this.apexBarChart.colors = ['#F5A30A', '#216093'];

  }
  ngAfterViewInit() {
    // Subscribe to core config changes
    this._coreConfigService.getConfig().subscribe(config => {
      // If Menu Collapsed Changes
      if (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) {
        setTimeout(() => {
          // Get Dynamic Width for Charts
          this.isMenuToggled = true;

          this.apexBarChart.chart.width = this.apexBarChartRef?.nativeElement.offsetWidth;
          this.apexBarChart2.chart.width = this.apexBarChartRef2?.nativeElement.offsetWidth;
          this.apexDonutChart.chart.width = this.apexDonutChartRef?.nativeElement.offsetWidth;
        }, 900);
      }
    });
  }
}
export const colors = {
  solid: {
    primary: '#7367F0',
    secondary: '#82868b',
    success: '#28C76F',
    info: '#00cfe8',
    warning: '#FF9F43',
    danger: '#EA5455',
    dark: '#4b4b4b',
    black: '#000',
    white: '#fff',
    body: '#f8f8f8'
  },
  light: {
    primary: '#7367F01a',
    secondary: '#82868b1a',
    success: '#28C76F1a',
    info: '#00cfe81a',
    warning: '#FF9F431a',
    danger: '#EA54551a',
    dark: '#4b4b4b1a'
  }
};
