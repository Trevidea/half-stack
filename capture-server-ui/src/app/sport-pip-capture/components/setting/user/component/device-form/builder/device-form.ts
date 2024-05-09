import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { DeviceFormView } from "../view/device-form";


export class DeviceFormBuilder implements AbstractBuilder<Data.Device, DeviceFormView> {
    compose(m: Data.Device, v: DeviceFormView) {
    }
    decompose(v: DeviceFormView): Data.Device {
        return {
            id: v.id,
            type: v.type.SelectedItem,
            name: v.deviceName,
            code: v.deviceCode,
            pin: v.pin
        };
    }
    view(): DeviceFormView {
        return new DeviceFormView();
    }

}