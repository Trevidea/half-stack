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
    ApexStates,
    ChartComponent
  } from 'ng-apexcharts';

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
    responsive?: ApexResponsive[];
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