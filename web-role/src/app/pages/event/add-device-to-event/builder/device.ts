
import { AbstractBuilder } from "src/app/blocks/strategies";
import { AddDeviceView } from "../view/add-device";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";


export class DevicesBuilder implements AbstractBuilder<Data.Device, AddDeviceView> {
    compose(m: Data.Device, v: AddDeviceView) {
        v.pin = m.pin;
    }
    decompose(v: AddDeviceView): Data.Device {
        throw new Error('Not Implemented')
    }
    view(): AddDeviceView {
        return new AddDeviceView();
    }


}