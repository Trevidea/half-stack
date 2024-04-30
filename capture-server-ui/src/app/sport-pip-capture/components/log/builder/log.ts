import { Data } from "app/sport-pip-capture/models/capture-interface";
import { LogRangeView, LogView } from "../views/log";
import { AbstractBuilder } from "app/blocks/strategies";

export class EventRangeBuilder extends AbstractBuilder<Data.Log, LogView> {
  compose(m: Data.Log, v: LogView) {
    v.action = m.action;
    v.category = m.category;
    v.subject = m.subject;
    v.timestamp = m.timestamp;
    v.user = m.user;
  }
  decompose(v: LogView): Data.Log {
    return;
  }
  view(): LogView {
    return new LogView();
  }
}

export const logData = [
  {
    category: "Event",
    subject: "Create Event",
    user: "Coach Steven",
    action: "A created event named as McQuaid vs Fairport",
    timestamp: "19 May 2022 at 9:00 am",
  },
  {
    category: "Event",
    subject: "Delete  Event",
    user: "Coach John",
    action: "A deleted event named ‘Riverhawks vs Huskers’",
    timestamp: "18 May 2022 at 10:10 pm",
  },
  {
    category: "Connection",
    subject: "Pin",
    user: "Gavin Gohar",
    action: "Created PIN for an event named Bluelock vs Team Red ",
    timestamp: "16 May 2022 at 10:10 pm",
  },
  {
    category: "Notification",
    subject: "Device Connection",
    user: "Shane Smith",
    action: "Device name iPad15 connected with the server on 12:12:00",
    timestamp: "16 May 2022 at 11:10 pm",
  },
];
