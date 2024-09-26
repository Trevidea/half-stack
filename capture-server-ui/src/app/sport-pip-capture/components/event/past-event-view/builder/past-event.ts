import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import moment from "moment";
import { PasEventView } from "../view/past-event-view";
import { ConnectionDetailsView } from "../view/connections";
import { Transformer } from "app/blocks/transformer";

export class PastEventBuilder extends AbstractBuilder<
  Data.PastEvent,
  PasEventView
> {
  compose(m: Data.PastEvent, v: PasEventView) {
    v.eventId = m.id;
    v.id = m.id;
    v.type = m.type;
    v.title = m.title;
    v.venue.cityAddress = m?.venue?.city_address;
    v.venue.streetAddress = m?.venue?.street_address;
    v.venue.location = m?.venue?.location;
    v.dtEvent = m.dt_event;
    v.level = m.level;
    v.program = m.program;
    v.sport = m.sport;
    v.time = m.tm_event;
    v.year = m.year
    v.venue.location = m.venue.location;
    const transformedDevices = this.transformConnectedStreamingDevices(m?.connected_streaming_devices);
    Transformer.ComposeCollection(
      transformedDevices,
      v?.connectionDetailsView,
      ConnectionDetailsBuilder
    );
  }

  transformConnectedStreamingDevices(devices: any): Data.ConnectedStreamingDevices[] {
    return devices.map(deviceArray => {
      let deviceObj: Data.ConnectedStreamingDevices = {
        id: deviceArray.find(field => field.field === "device_id")?.value ?? 0,
        stream_name: deviceArray.find(field => field.field === "stream_name")?.value ?? "",
        direction: deviceArray.find(field => field.field === "direction")?.value ?? 0
      };
      return deviceObj;
    });
  }


  decompose(v: PasEventView): Data.PastEvent {
    return;

  }


  view(): PasEventView {
    return new PasEventView();
  }
}


export class ConnectionDetailsBuilder extends AbstractBuilder<Data.ConnectedStreamingDevices, ConnectionDetailsView> {
  compose(m: Data.ConnectedStreamingDevices, v: ConnectionDetailsView) {
    v.direction = m.direction;
    v.id = m.id;
    v.streamName = m.stream_name;
  }
  decompose(v: ConnectionDetailsView): Data.ConnectedStreamingDevices {
    throw new Error("Method not implemented.");
  }
  view(): ConnectionDetailsView {
    return new ConnectionDetailsView();
  }

}