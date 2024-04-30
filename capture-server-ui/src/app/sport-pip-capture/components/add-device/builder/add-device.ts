import { AbstractBuilder } from "app/blocks/strategies"
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { AddDeviceView } from "../view/add-device";

export class AddDeviceBuilder extends AbstractBuilder<Data.EventDevice, AddDeviceView> {
    compose(m: Data.EventDevice, v: AddDeviceView) {

    }
    decompose(v: AddDeviceView): Data.EventDevice {
        console.log("::::view of add dive ",v)
        return {
            id: v.id,
            user_id: v.userName.SelectedItem.key,
            device_id: v.deviceName.SelectedItem.key,
            pin: v.pin,
            event_id: v.eventId,
            location: v.location.SelectedItem
        }
    }
    view(): AddDeviceView {
        throw new Error("Method not implemented.");
    }

}