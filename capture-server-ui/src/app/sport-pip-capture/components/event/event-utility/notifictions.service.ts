
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventStartNotificationsComponent } from '../../event-start-notifications/event-start-notifications.component';
@Injectable({
    providedIn: 'root'
})
export class TabStateService {
    activeTab: string = 'ongoing';

    constructor(private modalService: NgbModal) { }

    setActiveTab(activeTab: string) {
        this.activeTab = activeTab;
    }

    getActiveTab(): string {
        return this.activeTab;
    }


    openModalAfterDelay(): void {
        setTimeout(() => {
            this.openNotificationModal();
        }, 5 * 60 * 1000); 
    }

    openNotificationModal() {
        this.modalService.open(EventStartNotificationsComponent, {
            centered: true,
            size: 'sm'
        });
    }

}
