import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

@Component({
  selector: "app-log-detail",
  templateUrl: "./log-detail.component.html",
  styleUrls: ["./log-detail.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogDetailComponent implements OnInit {
  @Output() changeRequest = new EventEmitter<any>();
  @Input() datasource: any;
  @Input() index: number;
  @Input() imgUrl: string;
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    if (param.get("detailIndex")) {
      const detailIndex = param.get("detailIndex");
      console.log(detailIndex);
      this.index = +detailIndex;
    }
    console.log(this.datasource);
  }
  closeLog() {
    this._coreSidebarService.getSidebarRegistry(`log-detail`).toggleOpen();
  }
  previous(event: MouseEvent) {
    if (this.index == 0) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.changeRequest.emit(this.index - 1);
    }
  }
  next(event: MouseEvent) {
    if (this.index > this.datasource.length + 1) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.changeRequest.emit(this.index + 1);
    }
  }

  details() {
    console.log("clicked");
    this._coreSidebarService.getSidebarRegistry("log-detail").toggleOpen();
    this.router.navigate(["logs/detail"], {
      queryParams: {
        detailIndex: this.index,
        datasource: JSON.stringify(this.datasource),
      },
    });
  }
}
