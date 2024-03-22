import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TabStateService {
  activeTab: string ;

  constructor() {}

  setActiveTab(activeTab: string) {
    this.activeTab = activeTab;
  }

  getActiveTab(): string {
    return this.activeTab;
  }
}
