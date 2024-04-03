import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class PreferenceData extends DataBase<Data.Preference>{

    public get display(): Data.DisplaySettings {
        return this._model.display;
    }
    public set display(v: Data.DisplaySettings) {
        this._model.display = v;
    }

    public get customization(): Data.CustomizationSettings {
        return this._model.customization;
    }
    public set customization(v: Data.CustomizationSettings) {
        this._model.customization = v;
    }


    public get notification() : Data.NotificationSettings {
        return this._model.notification;
    }
    public set notification(v : Data.NotificationSettings) {
        this._model.notification = v;
    }
    
    public get videoResolution() : Data.VideoResolutionSettings {
        return this._model.videoResolution;
    }
    public set videoResolution(v : Data.VideoResolutionSettings) {
        this._model.videoResolution = v;
    }
    
}