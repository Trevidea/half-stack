import { AbstractBuilder } from "app/blocks/strategies"
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { AddDeviceView } from "../view/add-device";

export class AddDeviceBuilder extends AbstractBuilder<Data.EventDevice, AddDeviceView> {
    compose(m: Data.EventDevice, v: AddDeviceView) {

    }
    decompose(v: AddDeviceView): Data.EventDevice {
        let _direction: number;
        if (v.type.SelectedItem === 'Streaming') {
            _direction = 1
        } else if (v.type.SelectedItem === 'Player') {
            _direction = 0
        }
        return {
            id: v.id,
            user_id: v.userName.SelectedItem.key,
            device_id: v.deviceName.SelectedItem.key,
            pin: v.pin,
            event_id: v.eventId,
            location: v.location.SelectedItem,
            stream_name: v.streamName,
            stream_id: v.streamId,
            app_name: v.appNamesCollection.SelectedItem,
            direction: _direction
        }
    }
    view(): AddDeviceView {
        return new AddDeviceView();
    }

}