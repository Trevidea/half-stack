import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { AddDeviceView } from "../view/add-device";


export class DevicesBuilder implements AbstractBuilder<Data.Device, AddDeviceView> {
    compose(m: Data.Device, v: AddDeviceView) {
        v.pin = m.pin;
    }
    decompose(v: AddDeviceView): Data.Device {
        return;
    }
    view(): AddDeviceView {
        return new AddDeviceView();
    }


}