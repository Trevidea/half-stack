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
    v.details = m.details;
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
    timestamp: "2024-05-01 12:14:48.554",
    details: [
      {
        time: "09:00 am",
        activity: "Create an on-demand event named as McQuaid vs Fairport",
      },
      {
        time: "09:00 am",
        activity: "Selected Basketball as the sports",
      },
      {
        time: "09:00 am",
        activity: "Selected Junior Varsity as the level",
      },
      {
        time: "09:00 am",
        activity: "Selected Woman as the program",
      },
      {
        time: "09:00 am",
        activity: "Added Date 12-06-2022 and time 9:00 am",
      },
      {
        time: "09:00 am",
        activity: "Added Event location Fairport Stadium",
      },
    ],
  },
  {
    category: "Event",
    subject: "Delete  Event",
    user: "Coach John",
    action: "A deleted event named ‘Riverhawks vs Huskers’",
    timestamp: "2024-05-03 10:14:48.554",
    details: [
      {
        time: "10:10 pm",
        activity:
          "The football event between the Riverhawks and the Huskers, featuring the men's varsity program, scheduled to take place at Riverhawks Stadium on 12-07-2024 at 3:00pm, has been deleted",
      },
    ],
  },
  {
    category: "Connection",
    subject: "Pin",
    user: "Gavin Gohar",
    action: "Created PIN for an event named Bluelock vs Team Red ",
    timestamp: "2024-05-04 12:14:48.554",
    details: [
      {
        time: "10:05 pm",
        activity: "Event named Bluelock vs Team Red started connecting",
      },
      {
        time: "10:10 pm",
        activity: "Created PIN for event named Bluelock vs Team Red ",
      },
    ],
  },
  {
    category: "Notification",
    subject: "Device Connection",
    user: "Shane Smith",
    action: "Device name iPad15 connected with the server on 12:12:00",
    timestamp: "2024-05-05 09:14:48.554",
    details: [
      {
        time: "11:00 pm",
        activity: "Connection for event named McQuaid vs Fairport started",
      },
      {
        time: "11:02 pm",
        activity: "Device named iPad15 send request to join with the server",
      },
      {
        time: "11:05 pm",
        activity: "Notification appeared",
      },
      {
        time: "11:06 pm",
        activity: "Accepted the request of joining the device",
      },
      {
        time: "11:10 pm",
        activity: "Device named iPad15  connected with the server",
      },
    ],
  },
];
