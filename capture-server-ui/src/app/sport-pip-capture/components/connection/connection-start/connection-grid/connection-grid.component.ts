import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-connection-grid",
  templateUrl: "./connection-grid.component.html",
  styleUrls: ["./connection-grid.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionGridComponent implements OnInit {
  @Input() listOrGrid: string;
  @Input() datasource: any;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    if (param.get("listOrGrid")) {
      const listOrGrid = param.get("listOrGrid");
      this.listOrGrid = listOrGrid;
    }
  }
  modalOpenSM(modalSM) {
    this.modalService.open(modalSM, {
      centered: true,
      size: "sm", // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  detail(item: any) {
    const id = item.id;
    const isOpen = item.role;
    if (isOpen == "Publisher") {
      this.router.navigate([`/connection-device-detail`],{
        queryParams: { devicedetail: JSON.stringify(item) }
      });
    }
  }
}
