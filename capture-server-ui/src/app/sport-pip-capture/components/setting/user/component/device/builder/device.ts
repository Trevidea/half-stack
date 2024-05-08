import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { DeviceView } from "../view/device";

export class DeviceBuilder implements AbstractBuilder<Data.Device, DeviceView> {
    compose(m: Data.Device, v: DeviceView) {
        v.id = m.id;
        v.deviceCode = m.code;
        v.deviceName = m.name;
        v.deviceType = m.type;
    }
    decompose(v: DeviceView): Data.Device {
        return;
    }
    view(): DeviceView {
        return new DeviceView();
    }

}