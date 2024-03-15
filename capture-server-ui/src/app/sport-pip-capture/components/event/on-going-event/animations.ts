


import { trigger, transition, style, animate } from '@angular/animations';

export const slideInFromLeft = trigger('slideInFromLeft', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('700ms ease-out', style({ transform: 'translateX(0)' })),
    ]),
]);

export const slideInFromTop = trigger('slideInFromTop', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('700ms ease-out', style({ transform: 'translateY(0)' })),
    ]),
]);

export const slideInFromRight = trigger('slideInFromRight', [
    transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('700ms ease-out', style({ transform: 'translateX(0)' })),
    ]),
]);

export const slideIn =
    trigger('slideIn', [
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('700ms ease-out', style({ transform: 'translateY(0)' })),
        ]),
        transition(':leave', [
            animate('700ms ease-in', style({ transform: 'translateY(100%)' })),
        ]),
    ])