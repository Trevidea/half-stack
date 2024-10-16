import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";
import { PasEventView } from "../views/past-event-view";
import { Transformer } from "src/app/blocks/transformer";
import { ConnectionDetailsView } from "../views/connections";


export class PastEventBuilder extends AbstractBuilder<
  Data.PastEvent,
  PasEventView
> {
  compose(m: Data.PastEvent, v: PasEventView) {
    console.log("past event view ", m)
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
    Transformer.ComposeCollection(
      m?.connected_streaming_devices,
      v?.connectionDetailsView,
      ConnectionDetailsBuilder
    );
  }

  decompose(v: PasEventView): Data.PastEvent {
    throw new Error("Method not implemented.");
  }

  view(): PasEventView {
    return new PasEventView();
  }
}

export class ConnectionDetailsBuilder extends AbstractBuilder<Data.ConnectedStreamingDevices, ConnectionDetailsView> {
  compose(m: Data.ConnectedStreamingDevices, v: ConnectionDetailsView) {
    console.log("past event ", m)
    v.direction = m.direction;
    v.id = m.id;
    v.streamName = m.stream_name;
    console.log("past event device details ", v)
  }
  decompose(v: ConnectionDetailsView): Data.ConnectedStreamingDevices {
    throw new Error("Method not implemented.");
  }
  view(): ConnectionDetailsView {
    return new ConnectionDetailsView();
  }

}