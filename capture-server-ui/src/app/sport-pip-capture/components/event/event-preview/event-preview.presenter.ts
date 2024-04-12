import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-event-preview-presenter",
  template: "<app-event-preview [datasource]='previewData'></app-event-preview>",
  styleUrls: ["./event-preview.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventPreviewPresenter implements OnInit {
  previewData!: any
  constructor(private route: ActivatedRoute) {
    // this.route.queryParams.subscribe(params => {
    //   this.ds = JSON.parse(params['item']);
    // });
  }

  ngOnInit(): void {
  
  }

}
