import { EventEmitter, Type } from "@angular/core";


export namespace Data {
  export interface Base {
    id: number;
    _path?: number;
  }
  export interface DropdownFilter {
    title?: string | null;
    program?: string | null;
    sport?: string | null;
    year?: any;
    level?: string | null;
    status?: string | null;
    type?: string;
  }
  export interface MetaType extends Base {
    id: number;
    name: string;
    key: string;
    values: string[];
  }

  export interface MetaTypeEgress extends Base {
    newItem: string,
    values: string[]
  }
  export interface UserProfile extends Base {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    address: string;
  }


  export interface Event extends Base {
    sport?: string;
    level?: string;
    program?: string;
    year?: number;
    dt_event?: string;
    tm_event?: number;
    venue?: Venue;
    detail?: Detail;
    title?: string;
    status?: string;
    type: string;
  }
  export interface Detail { }

  export interface Assets {

  }
  export interface Sharing {

  }
  export interface Venue {
    location: string;
    street_address: string;
    city_address: string;
  }

  export interface PastEvent extends Base {
    id: number;
    title: string;
    sport: string;
    level: string;
    program: string;
    year: number;
    dt_event: string;
    tm_event: number;
    venue: Venue;
    detail: Detail;
    status: string;
    type: string;
    video_duration: string;
    shared_with: string;
    connected_streaming_devices: ConnectedStreamingDevices[];
  }
  export interface ConnectedStreamingDevices {
    id: number;
    stream_name: string
    direction: number
  }
  export interface Log extends Base {
    category: string;
    subject: string;
    user: string;
    action: string;
    timestamp: string;
    details: any[];
    lapse: string;
    level: string;
    message: string;
    tid: string;
  }

  export interface PreviousEventsConnection extends Base {
    eventName: string;
    date: string;
    total_connections: string;
    duration: string;
    most_connected_device: string;
  }

  export interface Connection extends Base {
    id: number;
    userId: number;
    networkQuality: NetWorkQuality;
    ipAdd: string;
    isDisabled: boolean;
    type: Type;
    dttConnected: string;
    priority: Priority;
    location: string;
  }

  export enum NetWorkQuality { }

  export enum Priority { }

  export enum Type { }


  export interface Preview extends Base {
    dtEvent: string;
    level: string;
    program: string;
    sport: string;
    status: string;
    title: string;
    detail: Detail;
    year: number;
    venue: Venue;
    time: number;
    type: string;
    activeDevice: ActiveDevice[];
  }

  export interface ActiveDevice {
    name: string;
    location: string;
    deviceId: string;
    deviceType: string;
    status: string;
    network: string;
  }

  export interface AddDeviceToEvent extends Base {
    id: number;
    user_id: number;
    device_id: number;
    pin: string;
    event_id: number;
    location: string;
    stream_name: string;
    stream_id: string;
    app_name: string;
    direction: number;
  }

  export interface Device extends Base {
    id: number;
    type: string;
    name: string;
    code: string;
    pin: string;
  }

  export interface Application extends Base {
    app_name: string;
  }

  export interface LoggedInUser extends Base {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: string;
  }
}



export namespace Views {
  export interface Datasource {
    id: number;
  }
  export interface FormState {
    error: boolean;
    data: any;
  }
  export interface alerAction {
    onCancel(): void;
    onYes(): void;
    onComplete: EventEmitter<boolean>;
    data?: EventEmitter<any>;
  }
  export interface FormActions {
    onSave(): void;
    onCancel(): void;
    onComplete: EventEmitter<boolean>;
    data?: EventEmitter<any>;
  }
  export interface FormModal {
    actions: FormActions;
    setModalActions(onClose: EventEmitter<any>): void;
  }
  export interface ModalHost {
    properties: { [key: string]: any };
    component: Type<Views.FormModal>;
    open(): Promise<any>;
    close(data: any): void;
    dismiss(): void;
  }
}
