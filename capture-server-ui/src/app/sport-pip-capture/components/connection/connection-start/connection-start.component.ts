import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { header } from "./data";
import { EventConnection$ } from "../connection-data";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { filter, map } from "rxjs/operators";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
@Component({
  selector: "app-connection-start",
  templateUrl: "./connection-start.component.html",
  styleUrls: ["./connection-start.component.scss"],
  providers: [SocketService],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionStartComponent implements OnInit {
  @Input() datasource: any;
  eventConnection: any[] = []
  header: string[];
  deviceName: string;
  streamingKey: string;
  allOrSubOrPub: string = "all";
  socketData = [];
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService
  ) {
    this.socketService.onLiveEvent().subscribe((data) => {
      console.log(data);
    });
  }
  connectiondetail: boolean = false;
  ngOnInit(): void {
    console.log("checking where daata is comming or not  ", this.datasource)
    this.header = header;
    EventConnection$.subscribe(
      (data) => {
        this.eventConnection = data;
      },
      (error) => {
        console.log("error:::", error);
      }
    );
    console.log(this.eventConnection);
  }

  ConnectionDetails(yes: boolean) {
    this.connectiondetail = yes;
  }
  closeDetail() {
    this.connectiondetail = false;
  }
  viewStream() { }
  pause(item) {
    const index = this.eventConnection.findIndex((obj) => obj.id === item.id);
    if (
      index !== -1 &&
      this.eventConnection[index].transmitStatus !== "Paused"
    ) {
      this.eventConnection[index].transmitStatus = "Paused";
      // this.cdr.detectChanges();
    }
  }
  getAllPubOrSub(e) {
    this.allOrSubOrPub = e;
    EventConnection$.pipe(
      // Filter the data based on the type
      filter((data: any[]) => data.filter((item) => item.type === e).length > 0)
    ).subscribe(
      (filteredData) => {
        // Assign the filtered data to this.eventConnection
        this.eventConnection = filteredData;
      },
      (error) => {
        console.log("error:::", error);
      }
    );
  }
  block(item) { }
  streaming() { }
  delete() { }
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm, {
      centered: true,
    });
  }
  addNewDevice() { }
  listOrGrid: string = "list";
  listGrid(e: string) {
    this.listOrGrid = e;
    console.log(e);
  }
  ListType(e: any) {
    if (e == "all") {
      EventConnection$.subscribe((data) => {
        this.eventConnection = data;
      });
    } else {
      EventConnection$.pipe(
        map((data) => {
          const filtered = data.filter((item) => item.type === e);
          console.log("Filtered data:", filtered);
          return filtered;
        })
      ).subscribe((filteredData) => {
        this.eventConnection = filteredData;
      });
    }
  }
}
