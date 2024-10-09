export namespace UI {
    export interface DropDownMenuItem {
        action: () => void;
        icon: string;
        label: string;
        type?: 'mat-icon' | 'tebler-icon' | 'svg';
        color?: string;
    }
}