import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "app-connection-list",
  templateUrl: "./connection-list.component.html",
  styleUrls: ["./connection-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionListComponent implements OnInit {
  @Input() eventConnection: any;
  @Input() datasource: any;
  @Input() listOrGrid: string;
  constructor(
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
      this.router.navigate([`/connection/connection-device-detail/${{ id }}`], {
        queryParams: { listOrGrid: `list` },
      });
    }
  }
}
