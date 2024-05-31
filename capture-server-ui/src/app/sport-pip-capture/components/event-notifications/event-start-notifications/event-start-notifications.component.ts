import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'app/sport-pip-capture/models/socket.service';
import { Subject, Subscription } from 'rxjs';
import { NotificationView } from '../views/notification';

@Component({
  selector: 'event-start-notifications',
  templateUrl: './event-start-notifications.component.html',
  styleUrls: ['./event-start-notifications.component.scss'],
})
export class EventStartNotificationsComponent implements OnInit {
  socketSubscription: Subscription;
  ds!: NotificationView;

  constructor(public activeModal: NgbActiveModal, private socketService: SocketService) {
    this.ds = new NotificationView();
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



}
