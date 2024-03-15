import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class EventData extends DataBase<Data.Event>{
   
    public get sport(): string {
        return this._model.sport;
    }
    public set sport(v: string) {
        this._model.sport = v;
    }


    public get level(): string {
        return this._model.level;
    }
    public set level(v: string) {
        this._model.level = v;
    }

    public get program(): string {
        return this._model.program;
    }
    public set program(v: string) {
        this._model.program = v;
    }

    public get year(): number {
        return this._model.year;
    }
    public set year(v: number) {
        this._model.year = v;
    }

    public get dttEvent(): string {
        return this._model.dttEvent;
    }
    public set dttEvent(v: string) {
        this._model.dttEvent = v;
    }
    
    public get venue() : Data.Venue[] {
        return this._model.venue;
    }
    public set venue(v : Data.Venue[]) {
        this._model.venue = v;
    }
    
   public get onPremise() : boolean {
    return this._model.onPremise;
   }
   public set onPremise(v : boolean) {
    this._model.onPremise = v;
   }
   
   public get detail() : Data.EventDetail[] {
    return this._model.detail;
   }
   public set detail(v : Data.EventDetail[]) {
    this._model.detail = v;
   }
     
   public get title() : string {
    return this._model.title;
   }
   public set title(v : string) {
    this._model.title = v;
   }
   
   public get status() : string {
    return this._model.status;
   }
   public set status(v : string) {
    this._model.status = v;
   }
  
//    public get status() : Data.Status {
//     return this._model.status;
//    }
//    public set status(v : Data.Status) {
//     this._model.status = v;
//    }
   
   
   private _event : Data.Event[];
   public get event() : Data.Event[] {

    return this._model.event;
   }
   public set event(v : Data.Event[]) {
    this._model.event = v;
   }
   /*
   meridiem, time
   */
  
  private _dayHalve : string;
  public get dayHalve() : string {
    return this._model.dayHalve;
  }
  public set dayHalve(v : string) {
    this._model.dayHalve = v;
  }
  
  
  private _time : string;
  public get time() : string {
    return this._model.time;
  }
  public set time(v : string) {
    this._model.time = v;
  }
  
}