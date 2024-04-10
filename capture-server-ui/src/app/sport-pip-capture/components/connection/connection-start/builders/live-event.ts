import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { LiveView } from "../views/live-event";

export class LiveEventBuilder extends AbstractBuilder<Data.LiveEventDetail,LiveView>{
    compose(m: Data.LiveEventDetail, v: LiveView) {
        console.log("::::::::::",m)
        // v.deviceId=m.deviceId;
        // v.deviceType=m.deviceType;
        // v.ipAddress=m.ipAddress;
        // v.name=m.name;
        // v.network=m.network;
        // v.location=m.location;
        // v.quality=m.quality;
        // v.received=m.received;
        // v.role=m.role;
        // v.transmitStatus=m.trasnsmitStatus;
        // v.retries=m.retries;    
    }
    decompose(v: LiveView): Data.LiveEventDetail {
        return;
    }
    view(): LiveView {
        return new LiveView();
    }
}