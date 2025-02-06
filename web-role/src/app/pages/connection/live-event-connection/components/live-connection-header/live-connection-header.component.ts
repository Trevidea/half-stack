import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { Timer } from '../../../timer';
import { DateTimeService } from 'src/app/pages/blocks/date-time.service';
import { DateTimeFormatPipe } from "../../../../../pipe/date-time-format";

@Component({
  selector: 'app-live-connection-header',
  standalone: true,
  imports: [MatCardModule, MatMenuModule,
    MatDividerModule,
    MatButtonModule, MatIconModule, TablerIconsModule, DateTimeFormatPipe],
  templateUrl: './live-connection-header.component.html',
  styleUrl: './live-connection-header.component.scss'
})
export class LiveConnectionHeaderComponent {
 @Input() datasource: any;
 connectiondetail: boolean = false;
 undoEvent: boolean = false;
 currentTime: string;
 isTimerRunning = false;
 public countdownInterval: any;

 constructor(
   public timerService: Timer,
   private dateTimeservice: DateTimeService
 ) {}
 ngOnInit(): void {
   this.countdownInterval = setInterval(() => {
     this.datasource.ongoingCountdown = this.dateTimeservice.OnwardTimer(
       this.datasource.dtEvent,
       this.datasource.time
     );
   }, 1000);
 }

 ngOnDestroy() {}

 closeDetail() {
   this.connectiondetail = false;
 }

//  playPauseEvent(e: string) {
//    if (e == "play") {
//      this.undoEvent = false;
//    } else {
//      const modelRef = this.modelService.open(EventUndoNotificationComponent, {
//        centered: false,
//        size: "sm",
//        windowClass: "event-notification-undo",
//      });
//      this.undoEvent = true;
//      modelRef.componentInstance;
//      modelRef.componentInstance.undoEvent = true;
//      modelRef.componentInstance.updateEventStatus.subscribe(
//        (receivedEntry) => {
//          this.undoEvent = receivedEntry;
//          if (this.undoEvent == false) {
//            this.timerService.resume();
//          }
//        }
//      );
//    }
//  }
//  modalOpenSM(modalblock) {
//    const modeldata = this.modelService.open(ConnectionAlertComponent, {
//      centered: true,
//      size: "sm",
//    });

//    modeldata.componentInstance.undoEvent = false;
//    modeldata.componentInstance.title = "End Event";
//    modeldata.componentInstance.description =
//      "Are you sure you want to end the <br> event ?";
//    this.route.queryParams.subscribe((params) => {
//      modeldata.componentInstance.eventId = params["eventId"];
//    });
//    modeldata.componentInstance.passEntry.subscribe((receivedEntry) => {
//      // this.undoEvent = receivedEntry;
//      // this.service.closePreview({eventId: })
//    });
//  }

 longestDurationDevice(durationString) {
   if (durationString !== undefined) {
     const components = durationString?.split(/[^\d]+/);

     let days = parseInt(components[0]);
     let hours = parseInt(components[1]);
     let minutes = parseInt(components[2]);
     let seconds = parseInt(components[3]);
     let totalMinutes = days * 24 * 60 + hours * 60 + minutes;
     totalMinutes -= 10;
     days = Math.floor(totalMinutes / (24 * 60));
     totalMinutes %= 24 * 60;
     hours = Math.floor(totalMinutes / 60);
     minutes = totalMinutes % 60;
     return `${days} days ${hours}:${String(minutes).padStart(
       2,
       "0"
     )}:${String(seconds).padStart(2, "0")}`;
   } else {
     return "Finding device ";
   }
 }
 

}
