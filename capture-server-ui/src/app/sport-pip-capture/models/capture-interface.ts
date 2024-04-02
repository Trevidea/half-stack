import { EventEmitter, Type } from "@angular/core";
import { extend } from "angular";

export namespace Data {

    export interface Base {
        id: number;
        _path?: number;
    }

    export interface Distribution extends Base {
        id: number,
        name: string,
        emails: Emails[],
    }
    export interface Emails {
        name: string,
        email: string,
    }
    export interface Event extends Base {
        sport: string;
        level: string;
        program: string;
        year: number;
        dt_event: Date;
        tm_event: number;
        venue: Venue;
        detail: Detail;
        title: string;
        status: string;
        dayHalve: string;
        type:string;
        owner_id?: number;  //this is user ID
    }

    export interface OnDemandEvent extends Base {
        event_id: number;
        owner_id: number;
    }

    export interface ScheduledEvent extends Base {
        event_id: number;
        on_premise: boolean;
        pin: string;

    }


    export interface Venue {
        location: string;
    }

    export interface Detail {
        cityAddress: string;
        streetAdress: string;
        type: string;
    }

    export interface EventNetWork extends Base {
        id: number,
        eventId: number,
        network: string,

    }

    export interface EventStream extends Base {
        id: number,
        eventId: number,
        url: string,
        name: string,
        key: string,
    }

    export interface EventTeam extends Base {
        id: number,
        eventId: number,
        teamId: number,
        contact: string,
        phone: string,
        email: string,
    }

    export interface EventUser extends Base {
        id: number,
        eventId: number,
        userId: number,
        location: string,
        deviceId: number,
        pin: string,
    }

    export interface EventSharing extends Base {
        id: number,
        eventId: number,
        userId: number,
        dtShared: string,
    }

    export interface Device extends Base {
        id: number,
        type: string,
        name: string,
        code: string,
    }

    export interface Connection extends Base {
        id: number,
        userId: number,
        networkQuality: NetWorkQuality,
        ipAdd: string,
        isDisabled: boolean,
        type: Type,
        dttConnected: string,
        priority: Priority,
        location: string,
    }

    export enum NetWorkQuality {

    }
    export enum Type {

    }

    export enum Priority {

    }

    export enum DataType {
        Type1 = 'type1',
        Type2 = 'type2',
        Type3 = 'type3',
    }

    export enum DataStatus {
        Status1 = 'status1',
        Status2 = 'status2',
        Status3 = 'status3',
    }
    export interface FileIndex extends Base {
        id: number;
        dtCreated: string;
        size: number;
        hash: number;
        name: string;
        type: DataType;
        eventId: number;
        userId: number;
        status: DataStatus;
        dttReceived: string;
        deviceId: number;
    }


    export interface FileSharing extends Base {
        id: number,
        fileId: number,
        distributionId: number[],
        dtShared: string,
        sharingLink: string,
    }


    export interface License extends Base {
        id: number,
        code: string,
        dtStart: string,
        dtExpiry: string,
        cost: number,
    }

    export interface UserProfile extends Base {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        role: Role,
        address: string,
    }
    export interface Role {

    }
    export interface Preference extends Base {
        id: number,
        display: DisplaySettings,
        customization: CustomizationSettings,
        notification: NotificationSettings,
        videoResolution: VideoResolutionSettings,
    }

    export interface DisplaySettings {

    }

    export interface CustomizationSettings {

    }

    export interface NotificationSettings {

    }

    export interface VideoResolutionSettings {

    }


    export interface Team extends Base {
        id: number,
        name: string,
        logo: string,
    }
    export interface PastConnection extends Base {
        connection: PreviousEventsConnection[]
    }
    export interface MetaType extends Base {
        name: string,
        key: string,
        values: string[]
    }
    export interface MetaTypeEgress extends Base {
        newItem: string,
        values: string[]
    }
    export interface PreviousEventsConnection extends Base {

        "userId": number,
        "Network Quality": string,
        "IP Address": string,
        // "Is Disabled": boolean,
        // "Type": string,
        "Connection Date": string,
        // "Priority": string,
        // "Location": string,
        // "First Name": string,
        // "Last Name": string,
        // "Email": string,
        // "Phone": string,
        // "Role": string,
        // "Address": string,
        // "eventId": number,
        // "Shared Date": string,
        // "Team Name": string,
        // "detail": [
        //     {
        //         "cityAddress": string,
        //         "streetAdress": string,
        //         "type": string
        //     }
        // ],
        // "Event Date": string,
        // "Level": string,
        // "Day Halve": string,
        // "onPremise": boolean,
        // "Program": string,
        // "Sport": string,
        "Time": string,
        // "Year": number,
        // "venue": [
        //     {
        //         "location": string
        //     }
        // ],
        // "Status": string
    }

    export interface FilterParams {
        year: number
        program: string;
        level: string;
        sport: string;
        status?: string;
    }


}

export namespace Views {
    export interface Datasource {
        id: number;
    }
    export interface FormState {
        error: boolean,
        data: any
    }
    export interface FormActions {
        onSave(): void;
        onCancel(): void
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