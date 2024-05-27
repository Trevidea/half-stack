import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabStateService {
  private activeTabSubject = new BehaviorSubject<string>('ongoing'); // Initial value 'ongoing'
  private selectPageSize = new BehaviorSubject<number>(10)

  activeTab$ = this.activeTabSubject.asObservable();
  selectedpageSize$ = this.selectPageSize.asObservable();
  constructor() { }

  setActiveTab(activeTab: string) {
    this.activeTabSubject.next(activeTab);
  }

  getActiveTab(): string {
    return this.activeTabSubject.value;
  }

  changePageSize(pagesize: number) {
    return this.selectPageSize.next(pagesize);
  }

  getPageSize(): number {
    return this.selectPageSize.value;
  }

}
