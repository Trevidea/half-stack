
import { Data } from "src/app/services/models-interfaces/half-stack-interface";
import { DeviceFormView } from "../view/device-form";
import { AbstractBuilder } from "src/app/blocks/strategies";


export class DeviceFormBuilder implements AbstractBuilder<Data.Device, DeviceFormView> {
    compose(m: Data.Device, v: DeviceFormView) {
    }
    decompose(v: DeviceFormView): Data.Device {
        return {
            id: v.id,
            type: v.type.SelectedItem,
            name: v.deviceName,
            code: v.deviceCode,
            pin: v.pin,
            ip_add: v.ip_add
        };
    }
    view(): DeviceFormView {
        return new DeviceFormView();
    }

}