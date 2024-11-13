import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OffCanvasService {
    private overlayRef!: OverlayRef | null;
    private closeSubject = new Subject<void>();
    private isOpenSubject = new BehaviorSubject<boolean>(false);
    isOpen$ = this.isOpenSubject.asObservable();

    constructor(private overlay: Overlay) { }

    setOverlayRef(overlayRef: OverlayRef) {
        this.overlayRef = overlayRef;
    }


    // Method to open the overlay
    open(portal: CdkPortal) {
        if (this.overlayRef) {
            this.overlayRef.dispose();  // Dispose any existing overlay
        }
        const positionStrategy = this.overlay.position().global();
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            positionStrategy: positionStrategy
        });

        this.overlayRef.attach(portal);
        this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
    }



    // Notify subscribers that the overlay is closed ///
    closeOverlay() {
        if (this.overlayRef) {
            this.isOpenSubject.next(false);
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.closeSubject.next();
        }
    }
    // Notify subscribers that the overlay is closed ///


    onClose(): Observable<void> {

        return this.closeSubject.asObservable(); // Expose an observable for close events
    }
}
