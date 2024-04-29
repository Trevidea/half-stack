import { AbstractBuilder } from "app/blocks/strategies"
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { AddDeviceView } from "../view/add-device";

export class AddDeviceBuilder extends AbstractBuilder<Data.Device, AddDeviceView> {
    compose(m: Data.Device, v: AddDeviceView) {
        throw new Error("Method not implemented.");
    }
    decompose(v: AddDeviceView): Data.Device {
        return {
            id: v.id,
            userName: v.userName,
            deviceName: v.deviceName.SelectedItem,
            pin: v.pin,
            location: v.location.SelectedItem
        }
    }
    view(): AddDeviceView {
        throw new Error("Method not implemented.");
    }

}