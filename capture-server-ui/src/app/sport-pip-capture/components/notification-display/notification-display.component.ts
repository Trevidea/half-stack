import { Component, TemplateRef, ViewEncapsulation } from "@angular/core";
import { NotificationDIsplayService } from "./notification-display.service";

@Component({
  selector: "app-notification-display",
  templateUrl: "./notification-display.component.html",
  styleUrls: ["./notification-display.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { "[class.ngb-toasts]": "true" },
})
export class NotificationDisplayComponent {
  constructor(public notificationDIsplayService: NotificationDIsplayService) {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
