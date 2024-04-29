import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { ConnectionDetailsView, liveEventDetail } from "../views/live-event";
import { Transformer } from "app/blocks/transformer";

export class LiveEventBuilder extends AbstractBuilder<Data.LiveEventConnectionDetail, liveEventDetail> {
    compose(m: Data.LiveEventConnectionDetail, v: liveEventDetail) {
        v.title = m.title;
        v.detail.cityAddress = m?.detail?.cityAddress;
        v.detail.streetAdress = m?.detail?.streetAdress;
        v.detail.type = m?.detail?.type;
        v.id = m.id;
        v.dtEvent = m.dtEvent;
        v.level = m.level;
        v.program = m.program;
        v.sport = m.sport;
        v.year = m.year;
        v.venue.location = m?.venue?.location;
        v.time = m.time;
        v.type = m.type;
        Transformer.ComposeCollection(m?.connectionDetails, v?.connectionDetails, ConnectionDetailsBuilder)
    }
    decompose(v: liveEventDetail): Data.LiveEventConnectionDetail {
        return;
    }
    view(): liveEventDetail {
        return new liveEventDetail();
    }
}


export class ConnectionDetailsBuilder extends AbstractBuilder<Data.ConnectionDetails, ConnectionDetailsView> {
    compose(m: Data.ConnectionDetails, v: ConnectionDetailsView) {
        v.device = m.device;
        v.id = v.id;
        v.ipAddress = m.ipAddress;
        v.location = m.location;
        v.name = m.name;
        v.quality = m.quality;
        v.received = m.filesReceived;
        v.retries = m.retries;
        v.role = m.role;
        v.network=m.network;
        v.transmitStatus = m.transmitStatus;
    }
    decompose(v: ConnectionDetailsView): Data.ConnectionDetails {
        return;
    }
    view(): ConnectionDetailsView {
        return new ConnectionDetailsView()
    }

}