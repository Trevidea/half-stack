export namespace UI {
    export interface DropDownMenuItem {
        action: () => void;
        icon: string;
        label: string;
        type?: 'feather' | 'bootstrap' | 'svg';
    }
}