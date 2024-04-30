import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  eventConnection: any[] = [];
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
<<<<<<< HEAD
    // this.socketService.onLiveEvent().subscribe((data) => {
    //   // console.log(data);
    // });
=======
    this.socketService.onLiveEvent().subscribe((data) => {});
>>>>>>> 63e034da0e4282e8f9f204d14b3b7cb12a3ec379
  }
  connectiondetail: boolean = false;
  ngOnInit(): void {
    this.header = header;
    EventConnection$.subscribe(
      (data) => {
        this.eventConnection = data;
      },
      (error) => {
        console.log("error:::", error);
      }
    );
  }

  ConnectionDetails(yes: boolean) {
    this.connectiondetail = yes;
  }
  closeDetail() {
    this.connectiondetail = false;
  }
  viewStream() {}
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
  block(item) {}
  streaming() {}
  delete() {}
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm, {
      centered: true,
    });
  }
  addNewDevice() {}
  listOrGrid: string = "list";
  listGrid(e: string) {
    this.listOrGrid = e;
    // console.log(e);
  }
  @Output() pubSubAll: EventEmitter<any> = new EventEmitter<any>();

  onPubSubAll(event: any) {
    this.pubSubAll.emit(event);
  }
}
