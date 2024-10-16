import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LiveGidListHeaderComponent } from "./live-gid-list-header/live-gid-list-header.component";
import { LiveGirdComponent } from "./live-gird/live-gird.component";
import { LiveListComponent } from "./live-list/live-list.component";
import { SocketService } from 'src/app/services/web-socket/socket.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceToEventPresenter } from 'src/app/pages/event/add-device-to-event/add-device-to-event.presenter';

@Component({
  selector: 'app-live-connection-grid-list-toogle',
  standalone: true,
  imports: [MatCardModule, MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    TablerIconsModule,
    RouterModule, LiveGidListHeaderComponent, LiveGirdComponent, LiveListComponent],
  templateUrl: './live-connection-grid-list-toogle.component.html',
  styleUrl: './live-connection-grid-list-toogle.component.scss'
})
export class LiveConnectionGridListToogleComponent {

  @Input() datasource: any;
  gridView : boolean = true;
 
  changeViewMode(isGrid: boolean){
    this.gridView = isGrid;
  }

  eventConnection: any[] = [];
  header: string[];
  deviceName: string;
  streamingKey: string;
  allOrSubOrPub: string = "all";
  socketData = [];
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService, 
    private dialog: MatDialog)
   {

  }

  connectiondetail: boolean = false;

  ngOnInit(): void {
    //  console.log(this.datasource)
    // this.header = header;
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

  // getAllPubOrSub(e) {
  //   this.allOrSubOrPub = e;
  //   EventConnection$.pipe(
  //     // Filter the data based on the type
  //     filter((data: any[]) => data.filter((item) => item.type === e).length > 0)
  //   ).subscribe(
  //     (filteredData) => {
  //       // Assign the filtered data to this.eventConnection
  //       this.eventConnection = filteredData;
  //     },
  //     (error) => {
  //       console.log("error:::", error);
  //     }
  //   );
  // }

  block(item) { }
  streaming() { }
  delete() { }
  // modalOpenForm(modalForm) {
  //   this.modalService.open(modalForm, {
  //     centered: true,
  //   });
  // }
  addNewDevice() { }
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
