import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Transformer } from "app/blocks/transformer";
import { DatatablesService } from "app/main/tables/datatables/datatables.service";
import { EventRangeBuilder } from "app/sport-pip-capture/components/event/builders/event";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-event-preview-presenter",
  template: "<app-event-preview></app-event-preview>",
  styleUrls: ["./event-preview.component.scss"],
  providers: [DatatablesService],
  encapsulation: ViewEncapsulation.None,
})
export class EventPreviewPresenter implements OnInit {
  rows: any;
  onDatatablessChanged: BehaviorSubject<any>;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _httpClient: HttpClient,
    private _datatablesService: DatatablesService
  ) {
    this.onDatatablessChanged = new BehaviorSubject({});
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // this.onDatatablessChanged
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((response) => {
    //     console.log(response);
    //     this.rows = response;
    //     console.log(this.rows);
    //   });
    this._datatablesService.onDatatablessChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        console.log(response);
        this.rows = response;
      });
  }

  //   resolve(
  //     route: ActivatedRouteSnapshot,
  //     state: RouterStateSnapshot
  //   ): Observable<any> | Promise<any> | any {
  //     return new Promise<void>((resolve, reject) => {
  //       Promise.all([this.getEventPreview()]).then(() => {
  //         resolve();
  //       }, reject);
  //     });
  //   }

  //   getEventPreview(): Promise<any[]> {
  //     return new Promise((resolve, reject) => {
  //       this._httpClient.get("api/datatable-rows").subscribe((response: any) => {
  //         this.rows = response;
  //         this.onDatatablessChanged.next(this.rows);
  //         resolve(this.rows);
  //       }, reject);
  //     });
  //   }
}
