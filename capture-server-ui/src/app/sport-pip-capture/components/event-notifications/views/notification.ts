import { Views } from "app/sport-pip-capture/models/capture-interface";

export class NotificationView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
     
     private _title : string;
     public get title() : string {
        return this._title;
     }
     public set title(v : string) {
        this._title = v;
     }
          
     private _type : string;
     public get type() : string {
        return this._type;
     }
     public set type(v : string) {
        this._type = v;
     }
     
       
}