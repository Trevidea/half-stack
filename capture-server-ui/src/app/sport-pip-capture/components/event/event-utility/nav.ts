import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TabStateService {
  private activeTabSubject = new BehaviorSubject<string>('ongoing'); // Initial value 'ongoing'
  activeTab$ = this.activeTabSubject.asObservable();

  constructor() {}

  setActiveTab(activeTab: string) {
    this.activeTabSubject.next(activeTab);
  }

  getActiveTab(): string {
    return this.activeTabSubject.value;
  }
}
