import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { SocketService } from 'src/app/services/web-socket/socket.service';
import { EventNotificationView } from './views/start-end-notification';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Router, RouterModule } from '@angular/router';
import { EventRunnerService } from 'src/app/services/event-runner/event-runner.service';

@Component({
  selector: 'app-event-start-end-dialogs',
  standalone: true,
  imports: [MaterialModule, CommonModule, TablerIconsModule, RouterModule],
  templateUrl: './event-start-end-dialogs.component.html',
  styleUrl: './event-start-end-dialogs.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EventStartEndDialogsComponent implements OnInit {
  action: string
  socketSubscription: Subscription;
  ds!: EventNotificationView;
  eventId: number;
  eventDetail = {
    eventName: "McQuaid vs Fairport",
    eventType: "Football",
    duration: "2hr 32mn",
    size: "200",
  };
  constructor(public dialogRef: MatDialogRef<EventStartEndDialogsComponent>, private roter: Router,
    private socketService: SocketService,
    private eventRunnerService: EventRunnerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { action: string }) {
    this.ds = new EventNotificationView
    this.action = data.action;

  }

  ngOnInit(): void {
    this.socketSubscription = this.socketService.onTopicMessage('live-event').subscribe((message) => {
      const data: any = JSON.parse(message["data"]);
      const liveEventData: any = data.result[0][0];
      this.ds.id = liveEventData["event_id"]
      this.ds.title = liveEventData["title"];
      this.ds.type = liveEventData["type"];
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  endViewBtn() {
    this.eventRunnerService.startedEventId$.subscribe(
      (res) => {
        if (res) {
          console.log(":::::::::", res)
          this.eventId = res;
        }
      }
    );
    this.roter.navigate([`events/past-event-details/${this.eventId}`])
    this.dialogRef.close();
  }
}
