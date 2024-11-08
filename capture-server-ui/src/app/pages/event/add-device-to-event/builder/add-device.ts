
import { AbstractBuilder } from "src/app/blocks/strategies";
import { AddDeviceView } from "../view/add-device";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";

export class AddDeviceBuilder extends AbstractBuilder<Data.AddDeviceToEvent, AddDeviceView> {
    compose(m: Data.AddDeviceToEvent, v: AddDeviceView) {

    }
    decompose(v: AddDeviceView): Data.AddDeviceToEvent {
        console.log('TagPanel' , v.tagPanels.SelectedItem);
        
        let _direction: number;
        if (v.type.SelectedItem === 'Streaming') {
            _direction = 1
        } else if (v.type.SelectedItem === 'Player') {
            _direction = 0
        }
        return {
            id: v.id,
            user_id: v.userName.SelectedItem?.key,
            device_id: v.deviceName.SelectedItem?.key,
            pin: v.pin,
            event_id: v.eventId,
            location: v.location.SelectedItem,
            stream_name: v.streamName,
            stream_id: v.streamId,
            app_name: v.appNamesCollection.SelectedItem,
            direction: _direction,
            ip_address: v.ipAddress,
            tagging_panel: v.tagPanels.SelectedItem?.value,

        }
    }
    view(): AddDeviceView {
        return new AddDeviceView();
    }

}