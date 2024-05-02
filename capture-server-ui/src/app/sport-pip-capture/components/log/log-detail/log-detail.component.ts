import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
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
  constructor(private _coreSidebarService: CoreSidebarService) {}
  ngOnInit(): void {}
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
}
