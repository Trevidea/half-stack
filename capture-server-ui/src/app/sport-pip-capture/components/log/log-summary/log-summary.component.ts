import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { LogDetailComponent } from "../log-detail/log-detail.component";

@Component({
  selector: "app-log-summary",
  templateUrl: "./log-summary.component.html",
  styleUrls: ["./log-summary.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [CoreSidebarService],
})
export class LogSummaryComponent implements OnInit {
  detailIndex;
  datasource: any;
  constructor(
    public _coreSidebarService: CoreSidebarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    if (param.get("detailIndex")) {
      const detailIndex = param.get("detailIndex");
      const datasource = param.get("datasource");
      this.detailIndex = detailIndex;
      this.datasource = JSON.parse(datasource);
    }
  }

  back() {
    this.router.navigate(["logs"], {
      queryParams: { detailIndex: this.detailIndex },
    });
  }
}
