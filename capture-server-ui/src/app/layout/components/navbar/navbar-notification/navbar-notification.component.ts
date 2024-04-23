import { Component, OnInit } from "@angular/core";

import { NotificationsService } from "app/layout/components/navbar/navbar-notification/notifications.service";
import { SocketService } from "app/sport-pip-capture/models/socket.service";

// Interface
interface notification {
  messages: [];
  systemMessages: [];
  system: Boolean;
}

@Component({
  selector: "app-navbar-notification",
  templateUrl: "./navbar-notification.component.html",
})
export class NavbarNotificationComponent implements OnInit {
  // Public
  public notifications: notification;

  /**
   *
   * @param {NotificationsService} _notificationsService
   */
  constructor(
    private _notificationsService: NotificationsService,
    private socketService: SocketService
  ) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  notification = [];
  ngOnInit(): void {
    this._notificationsService.onApiDataChange.subscribe((res) => {
      this.notifications = res;
    });
    this.socketService.onEventTerminal().subscribe((data) => {
      // this.notification.push
      // this.socketService.emit("message", "message UI");
    });
  }
}
