import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

@Component({
  selector: "app-log-detail",
  templateUrl: "./log-detail.component.html",
  styleUrls: ["./log-detail.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogDetailComponent implements OnInit {
  @Input() datasource: any;
  @Input() index;
  constructor(private _coreSidebarService: CoreSidebarService) {}
  ngOnInit(): void {
    console.log("log-modal:::", this.datasource);
  }
  closeLog() {
    this._coreSidebarService.getSidebarRegistry(`log-detail`).toggleOpen();
  }
}
