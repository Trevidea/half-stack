import { EventEmitter, Type } from "@angular/core";


export namespace Data {
  export interface Base {
    id: number;
    _path?: number;
  }
  export interface DropdownFilter {
    year?: string;
    program?: string;
    level?: string;
    sport?: string;
    title?: string
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
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: string;
    address: string;
    dob: number;
    gender: string;
    notifications: Notifications;
  }
  export interface Notifications extends Base {

    relatedToEvents: string;
    reminders: string;
    pushNotifications: string;
    vibrations: string;
  }


  export interface Coach extends Base {
    id: number;
    sport: string;
    title: string;
    program: string;
    year: string;
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    social_links: SocialLinks;
    picture: string;
    bio: string;
    stats: string;
  }
  export interface SocialLinks {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
  }


  export interface Event extends Base {
    id: number;
    sport: string;
    level: string;
    program: string;
    year: number;
    dt_event: string;
    tm_event: number;
    venue: Venue;
    detail: Detail;
    title: string;
    status: string;
    type: string;
    assets: Assets;
    sharing: Sharing;
  }

  export interface Detail extends Base { 

  }
  export interface Assets extends Base {

   }
  export interface Sharing extends Base {

   }

  export interface Venue extends Base {
    type: string;
    streetAdress: string;
    cityAddress: string;
  }

  export interface Team extends Base {
    id: number;
    name: string;
    logo: string;
    sport: string;
    level: string;
    program: string;
    year: string;
    social_links: SocialLinks;
    stats: TeamStats;
  }

  export interface TeamSocialLink extends Base { }

  export interface TeamStats extends Base { }

  export interface Player extends Base {
    id: number;
    sport: string;
    level: string;
    program: string;
    year: string;
    first_name: string;
    last_name: string;
    hometown: string;
    height: number;
    weight: number;
    high_school: string;
    prev_school: string;
    majors: string;
    mobile: string;
    email: string;
    city: string;
    social_links: SocialLinks;
    picture: string;
    bio: string;
    stats: string;
    media: Media;
  }

  export interface PlayerSocialLink extends Base { }

  export interface Media extends Base { }

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
