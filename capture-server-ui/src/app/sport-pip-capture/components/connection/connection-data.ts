// Define array of objects
import { of, Observable } from "rxjs";
export const PreviousEventsConnection = [
  {
    id: 1,
    "Name of event": "CSK VS Mumbai Indians ",
    date: "2024-03-27",
    "Total connection": 100,
    Duration: "2 hours",
    "Most connected device": [
      { device: "sub", time: "2hr 00min" },
      { device: "pub", time: "0hr 10min" },
    ],
  },
  {
    id: 2,
    "Name of event": "Sunriser VS GT",
    date: "2024-04-15",
    "Total connection": 150,
    Duration: "3 hours",
    "Most connected device": [
      { device: "sub", time: "1hr 30min" },
      { device: "pub", time: "1hr 30min" },
    ],
  },
  {
    id: 3,
    "Name of event": "PBKS VS RCB",
    date: "2024-05-01",
    "Total connection": 80,
    Duration: "1.5 hours",
    "Most connected device": [
      { device: "sub", time: "1hr" },
      { device: "pub", time: "0hr 30min" },
    ],
  },
  {
    id: 4,
    "Name of event": "GT VS MI",
    date: "2024-05-15",
    "Total connection": 120,
    Duration: "2 hours",
    "Most connected device": [
      { device: "sub", time: "1hr 45min" },
      { device: "pub", time: "0hr 15min" },
    ],
  },
  {
    id: 5,
    "Name of event": "RR VS LSG",
    date: "2024-06-01",
    "Total connection": 90,
    Duration: "2 hours",
    "Most connected device": [
      { device: "sub", time: "1hr 45min" },
      { device: "pub", time: "0hr 15min" },
    ],
  },
];

export const EventConnection$: Observable<any[]> = of([
  {
    id: 1,
    user: "Coach S.",
    location: "Press Box",
    deviceId: "ipad5-1212",
    deviceType: "iPad",
    network: "Penfield-5..",
    quality: "Poor",
    ipAddress: "192.168.1.10",
    transmitStatus: "Receiving",
    received: "22 files",
    retries: "2",
  },
  {
    id: 2,
    user: "Coach M.",
    location: "Field Sideline",
    deviceId: "iphone12-2323",
    deviceType: "iPhone",
    network: "Penfield-6",
    quality: "Good",
    ipAddress: "192.168.1.11",
    transmitStatus: "Paused",
    received: "18 files",
    retries: "0",
  },
  {
    id: 3,
    user: "Coach J.",
    location: "Dugout",
    deviceId: "samsung10-3434",
    deviceType: "Samsung Tablet",
    network: "Penfield-7",
    quality: "Excellent",
    ipAddress: "192.168.1.12",
    transmitStatus: "Streaming",
    received: "25 files",
    retries: "1",
  },
  {
    id: 4,
    user: "Coach K.",
    location: "Locker Room",
    deviceId: "ipadpro11-4545",
    deviceType: "iPad Pro",
    network: "Penfield-8",
    quality: "Fair",
    ipAddress: "192.168.1.13",
    transmitStatus: "Blocked",
    received: "0 files",
    retries: "0",
  },
  {
    id: 5,
    user: "Coach A.",
    location: "Bleachers",
    deviceId: "macbookair-5656",
    deviceType: "MacBook Air",
    network: "Penfield-9",
    quality: "Poor",
    ipAddress: "192.168.1.14",
    transmitStatus: "Receiving",
    received: "15 files",
    retries: "3",
  },
]);
