
import { AbstractBuilder } from "src/app/blocks/strategies";
import { DeviceView } from "../view/device";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";

export class DeviceBuilder implements AbstractBuilder<Data.Device, DeviceView> {
    compose(m: Data.Device, v: DeviceView) {
        v.id = m.id;
        v.deviceCode = m.code;
        v.deviceName = m.name;
        v.deviceType = m.type;
    }
    decompose(v: DeviceView): Data.Device {
       throw new Error("not  Implement ")
    }
    view(): DeviceView {
        return new DeviceView();
    }

}