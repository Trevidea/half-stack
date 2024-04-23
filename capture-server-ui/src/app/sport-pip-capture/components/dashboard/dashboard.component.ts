import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { DatatablesService } from "app/main/tables/datatables/datatables.service";
import { Subject } from "rxjs";
import { Connection } from "./table-data";
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
} from "ng-apexcharts";
import { CoreConfigService } from "@core/services/config.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
@Component({
  selector: "app-capture-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [DatatablesService],
})
export class CaptureDashboardComponent implements OnInit {
  @ViewChild("tableRowDetails") tableRowDetails: any;
  private _unsubscribeAll: Subject<any>;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  private tempData = [];
  public selected = [];
  public rows: any;
  public chkBoxSelected = [];

  public isMenuToggled = false;
  chartColors = {
    column: {
      series1: "#826af9",
      series2: "#d2b0ff",
      bg: "#f8d3ff",
    },
    success: {
      shade_100: "#7eefc7",
      shade_200: "#06774f",
    },
    donut: {
      series1: "#216093",
      series2: "#F5A30A",
      series3: "#826bf8",
      series4: "#2b9bf4",
      series5: "#FFA1A1",
    },
    area: {
      series3: "#a4f8cd",
      series2: "#60f2ca",
      series1: "#2bdac7",
    },
  };

  activeTabId = 2;

  constructor(
    private _datatablesService: DatatablesService,
    private _coreConfigService: CoreConfigService,
    public modal: NgbModal,
    private modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
  }
  openalert() {}

  ngOnInit(): void {
    this.rows = Connection;
  }
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }
  onActivate(event) {}
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  ngAfterViewInit() {
    // Subscribe to core config changes
    this._coreConfigService.getConfig().subscribe((config) => {
      // If Menu Collapsed Changes
      if (
        config.layout.menu.collapsed === true ||
        config.layout.menu.collapsed === false
      ) {
        setTimeout(() => {
          // Get Dynamic Width for Charts
          this.isMenuToggled = true;
          // this.apexLineChart.chart.width = this.apexLineChartRef?.nativeElement.offsetWidth;

          // this.apexDonutChart.chart.width = this.apexDonutChartRef?.nativeElement.offsetWidth;
        }, 900);
      }
    });
  }

  ongoingEvent = [
    {
      date: Date.now(),
      name: "McQuaid vs Fairfort",
      address: "Fairport High School, 33 Union Street, Fairport",
      time: "00:22:08",
    },
    {
      date: Date.now(),
      name: "McQuaid vs Fairfort",
      address: "Fairport High School, 33 Union Street, Fairport",
      time: "00:22:08",
    },
  ];
}
export const colors = {
  solid: {
    primary: "#7367F0",
    secondary: "#82868b",
    success: "#28C76F",
    info: "#00cfe8",
    warning: "#FF9F43",
    danger: "#EA5455",
    dark: "#4b4b4b",
    black: "#000",
    white: "#fff",
    body: "#f8f8f8",
  },
  light: {
    primary: "#7367F01a",
    secondary: "#82868b1a",
    success: "#28C76F1a",
    info: "#00cfe81a",
    warning: "#FF9F431a",
    danger: "#EA54551a",
    dark: "#4b4b4b1a",
  },
};
